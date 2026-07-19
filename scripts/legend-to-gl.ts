/**
 * Seed a per-style GL module from GeoServer's WMS GetLegendGraphic (JSON).
 *
 * Why not `sld-to-gl.ts` (WMS GetStyles)? GetStyles returns the LAYER's full style document and ignores
 * the `styles=` parameter, so a layer with several named styles yields the same merged rule set for every
 * one of them. `merged_displacement_contours_test_all` is exactly that case: GetStyles returns all 47
 * rules (cumulative 15 + yearly 13 + velocity 18 + a catch-all), which is how the three displacement
 * renders ended up byte-identical and unusable for per-type bins/legends.
 *
 * GetLegendGraphic DOES honour `style=`, returning only that style's rules — so it's the faithful source
 * for a named style. Rules carry the CQL filter + polygon symbolizer, which is all a GL fragment needs.
 *
 * Attribute mapping: SLD rules reference GeoServer's column names, but these fragments style the
 * warehouse's PMTiles, which don't always match (displacement: SLD `value_inch` vs tile `value_inches`).
 * A filter naming a field the tile lacks evaluates to null, MapLibre errors per layer, and NOTHING draws
 * — so pass `--map=<sldAttr>:<tileAttr>` (repeatable) to translate.
 *
 * Usage:
 *   tsx scripts/legend-to-gl.ts <workspace:layer> <styleName> <itemId> <render> [--map=a:b ...]
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const GEOSERVER = (process.env.GEOSERVER_BASE
    ?? 'https://ugs-geoserver-prod-flbcoqv7oa-uc.a.run.app/geoserver').replace(/\/$/, '');

interface LegendRule {
    name?: string;
    title?: string;
    filter?: string;
    symbolizers?: Array<{ Polygon?: Record<string, string> }>;
}

type GLExpr = unknown[];

/**
 * CQL filter -> MapLibre expression, for the constrained grammar GeoServer emits for class breaks:
 *   [value_inch >= '-12' AND value_inch < '-8' AND NOT (value_inch >= '-1.2' AND value_inch <= '1.2')]
 * i.e. numeric comparisons on one attribute, ANDed, with at most one negated AND-group (the deadband).
 * Anything outside that shape throws rather than silently emitting a filter that matches the wrong
 * features — a wrong filter here becomes wrong colors AND wrong chart bins downstream.
 */
export function cqlToGl(cql: string, attrMap: Record<string, string> = {}): GLExpr {
    const body = cql.trim().replace(/^\[/, '').replace(/\]$/, '').trim();

    const cmp = (chunk: string): GLExpr[] => {
        const out: GLExpr[] = [];
        const re = /([A-Za-z_]\w*)\s*(>=|<=|<>|!=|=|>|<)\s*'?(-?\d+(?:\.\d+)?)'?/g;
        let m: RegExpExecArray | null;
        while ((m = re.exec(chunk)) !== null) {
            const field = m[1]!, rawOp = m[2]!, rawVal = m[3]!;
            const op = rawOp === '=' ? '==' : rawOp === '<>' ? '!=' : rawOp;
            out.push([op, ['get', attrMap[field] ?? field], Number(rawVal)]);
        }
        return out;
    };

    const notMatch = /NOT\s*\(([^)]*)\)/i.exec(body);
    const positivePart = notMatch ? body.slice(0, notMatch.index) : body;

    const clauses: GLExpr[] = cmp(positivePart);
    if (notMatch) {
        const inner = cmp(notMatch[1] ?? '');
        if (inner.length === 0) throw new Error(`unparsed NOT group: ${cql}`);
        clauses.push(['!', ['all', ...inner]]);
    }
    if (clauses.length === 0) throw new Error(`unparsed CQL filter: ${cql}`);
    return ['all', ...clauses];
}

function layersFromRules(itemId: string, rules: LegendRule[], attrMap: Record<string, string>) {
    const layers: Record<string, unknown>[] = [];
    let n = 0;
    for (const rule of rules) {
        const poly = rule.symbolizers?.[0]?.Polygon;
        if (!poly) continue;
        // A rule with no filter applies to everything; keep it unfiltered rather than inventing one.
        const filter = rule.filter ? cqlToGl(rule.filter, attrMap) : undefined;

        // Carry the SLD rule identity onto the layer. Consumers derive legend swatches + chart bins from
        // these fragments, and they need to know WHICH bin is the "within uncertainty" deadband. That is
        // not inferable from the bounds: velocity's deadband is the rule named `Zero` ([-0.001, 0.001]),
        // while its class_9 ([-0.075, 0.075]) also spans zero but is real data. Guessing picks the wrong
        // one. The title is authoritative too (units differ per style, e.g. "in/period").
        const metadata = {
            'ugs:rule': rule.name ?? `rule_${n}`,
            'ugs:title': rule.title ?? '',
            'ugs:zero': (rule.name ?? '').toLowerCase() === 'zero',
        };

        const fill: Record<string, unknown> = {
            id: `${itemId}-${n++}`,
            type: 'fill',
            metadata,
            paint: {
                'fill-color': (poly.fill ?? '#AAAAAA').toLowerCase(),
                ...(poly['fill-opacity'] != null && Number(poly['fill-opacity']) !== 1
                    ? { 'fill-opacity': Number(poly['fill-opacity']) }
                    : {}),
            },
        };
        if (filter) fill.filter = filter;
        layers.push(fill);

        if (poly.stroke) {
            const line: Record<string, unknown> = {
                id: `${itemId}-${n++}`,
                type: 'line',
                metadata,
                paint: {
                    'line-color': poly.stroke.toLowerCase(),
                    'line-width': Number(poly['stroke-width'] ?? 0.3),
                },
            };
            if (filter) line.filter = filter;
            layers.push(line);
        }
    }
    return layers;
}

async function main() {
    const argv = process.argv.slice(2);
    const attrMap: Record<string, string> = {};
    for (const a of argv.filter((x) => x.startsWith('--map='))) {
        const [from, to] = a.slice('--map='.length).split(':');
        if (from && to) attrMap[from] = to;
    }
    const [layerName, styleName, itemId, render] = argv.filter((x) => !x.startsWith('--'));
    if (!layerName || !styleName || !itemId || !render) {
        console.error('usage: tsx scripts/legend-to-gl.ts <workspace:layer> <styleName> <itemId> <render>');
        process.exit(1);
    }
    const ws = layerName.split(':')[0];
    const url = `${GEOSERVER}/${ws}/wms?service=WMS&version=1.1.1&request=GetLegendGraphic`
        + `&format=application/json&layer=${encodeURIComponent(layerName)}&style=${encodeURIComponent(styleName)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`GetLegendGraphic ${res.status} ${url}`);
    const json = await res.json();
    const rules: LegendRule[] = json?.Legend?.[0]?.rules ?? [];
    if (rules.length === 0) throw new Error(`no rules for style '${styleName}'`);

    const layers = layersFromRules(itemId, rules, attrMap);
    const outDir = resolve(ROOT, 'src', 'styles', itemId);
    await mkdir(outDir, { recursive: true });

    const module = `// Seeded from live GeoServer WMS GetLegendGraphic (style='${styleName}'), one-time capture.
// GetLegendGraphic is used rather than GetStyles because GetStyles ignores the style selector and returns
// the layer's whole merged rule set — which previously made all three displacement renders identical.
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: '${itemId}',
    render: '${render}',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = ${JSON.stringify(layers, null, 4)};
export default layers;
`;
    const outFile = resolve(outDir, `${render}.ts`);
    await writeFile(outFile, module);
    console.log(`+ ${itemId}/${render}: ${rules.length} rules -> ${layers.length} layers`);
}

main().catch((e) => { console.error(e); process.exit(1); });
