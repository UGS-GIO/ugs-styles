/**
 * ONE-TIME SEED: translate an authoritative GeoServer SLD → a bound MapLibre GL style module.
 *
 * GeoServer is being retired, so this captures the live cartography into this repo while it's
 * still around. geostyler is a *dev-only* dependency used here at authoring time — it is NOT in
 * the build/publish path. Output is a normal committed style module (the bespoke escape hatch:
 * `export const spec` binding + a `default` StyleLayer[]), hand-editable from then on. Re-run to
 * re-seed from an updated SLD; otherwise the committed module is the source of truth.
 *
 *   tsx scripts/sld-to-gl.ts <sld-file> <itemId> [render]
 *   tsx scripts/sld-to-gl.ts ../sldStyleFiles/styles/hazards/hazards_qFaults_style.sld hazards_qfaults
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import SldStyleParser from 'geostyler-sld-parser';
import MapboxStyleParser from 'geostyler-mapbox-parser';

const ROOT = process.cwd();  // run from the repo root (npm run seed:sld)
const GEOSERVER = (process.env.GEOSERVER_BASE
  ?? 'https://ugs-geoserver-prod-flbcoqv7oa-uc.a.run.app/geoserver').replace(/\/+$/, '');

// Source-of-truth is LIVE GeoServer (the committed SLD snapshots elsewhere are stale). `src` is
// a GeoServer layer `workspace:layer` (fetched via WMS GetStyles), an http(s) SLD URL, or a
// local .sld file. GetStyles returns the layer's actual current default style.
async function fetchSld(src: string): Promise<string> {
    if (/^https?:\/\//.test(src)) {
        const r = await fetch(src);
        if (!r.ok) throw new Error(`fetch ${r.status} ${src}`);
        return r.text();
    }
    if (/^[\w-]+:[\w-]+$/.test(src)) {                       // workspace:layer → live GetStyles
        const ws = src.split(':')[0];
        const url = `${GEOSERVER}/${ws}/wms?service=WMS&version=1.1.1&request=GetStyles&layers=${encodeURIComponent(src)}`;
        const r = await fetch(url);
        if (!r.ok) throw new Error(`GetStyles ${r.status} ${url}`);
        return r.text();
    }
    return readFile(resolve(process.cwd(), src), 'utf8');
}

// Rewrite a (possibly legacy) GL filter into an expression filter with case-insensitive string
// equality. Whole filter must be one syntax, so every leaf is converted (combiners all/any/!
// are valid expressions; legacy `none`/`in` are rebuilt). $type/$id map to their expression form.
function ci(f: any): any {
    if (!Array.isArray(f)) return f;
    const [op, ...rest] = f;
    if (op === 'all' || op === 'any') return [op, ...rest.map(ci)];
    if (op === 'none') return ['!', ['any', ...rest.map(ci)]];
    if (op === '!') return ['!', ci(rest[0])];
    const getter = (key: any) =>
        key === '$type' ? ['geometry-type'] : key === '$id' ? ['id'] : ['get', key];
    if (op === '*=' || op === 'like') {            // SLD PropertyIsLike → substring match (ci)
        const [key, val] = rest;
        const needle = String(val).replace(/[%*]/g, '').toLowerCase();
        return ['in', needle, ['downcase', ['to-string', getter(rest.length === 2 ? key : rest[0])]]];
    }
    if (['==', '!=', '<', '>', '<=', '>='].includes(op)) {
        const [key, val] = rest;
        if ((op === '==' || op === '!=') && typeof val === 'string' && key !== '$type') {
            return [op, ['downcase', ['to-string', getter(key)]], val.toLowerCase()];
        }
        return [op, getter(key), val];
    }
    if (op === 'in' || op === '!in') {
        const [key, ...vals] = rest;
        const anyEq = ['any', ...vals.map((v) => typeof v === 'string'
            ? ['==', ['downcase', ['to-string', getter(key)]], v.toLowerCase()]
            : ['==', getter(key), v])];
        return op === 'in' ? anyEq : ['!', anyEq];
    }
    return f;  // already an expression / unknown — leave as-is
}

async function main() {
    const [sldPath, itemId, render = 'default'] = process.argv.slice(2);
    if (!sldPath || !itemId) {
        console.error('usage: tsx scripts/sld-to-gl.ts <sld-file> <itemId> [render]');
        process.exit(2);
    }

    const sld = await fetchSld(sldPath);

    // SLD → GeoStyler intermediate → MapLibre/Mapbox GL.
    const sldParser = new SldStyleParser();
    const { output: gs, errors: e1, warnings: w1 } = await sldParser.readStyle(sld);
    if (e1?.length) throw new Error(`SLD parse: ${e1.map(String).join('; ')}`);
    if (!gs) throw new Error('SLD parse produced no GeoStyler style');
    (w1 ?? []).forEach((w) => console.warn(`  ! sld: ${w}`));

    const mbParser = new MapboxStyleParser({ pretty: true });
    const { output: mb, errors: e2, warnings: w2 } = await mbParser.writeStyle(gs);
    if (e2?.length) throw new Error(`GL write: ${e2.map(String).join('; ')}`);
    (w2 ?? []).forEach((w) => console.warn(`  ! gl: ${w}`));

    const style = typeof mb === 'string' ? JSON.parse(mb) : mb;
    const rawLayers: any[] = style?.layers ?? [];
    if (!rawLayers.length) throw new Error('translation produced no layers');

    // Strip source/source-layer (the warehouse viewer injects them per item), re-id by item,
    // and rewrite filters case-insensitively. SLD literals drift in case vs the live PMTiles
    // attribute values (e.g. SLD 'well constrained' vs data 'Well Constrained'), which silently
    // matches nothing in MapLibre. Lowercasing both sides preserves the SLD's intent.
    const layers = rawLayers.map((l, i) => {
        const { source, 'source-layer': _sl, id, filter, ...rest } = l;
        const out: any = { id: `${itemId}-${i}`, ...rest };
        if (filter) out.filter = ci(filter);
        return out;
    });

    const dir = resolve(ROOT, 'src', 'styles', itemId);
    await mkdir(dir, { recursive: true });
    const out = resolve(dir, `${render}.ts`);
    const title = String(gs.name || itemId);
    const body = `// Seeded from live GeoServer: ${sldPath} (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: '${itemId}',
    render: '${render}',
    kind: 'vector',
    assets: ['pmtiles'],
    title: ${JSON.stringify(title)},
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = ${JSON.stringify(layers, null, 4)};
export default layers;
`;
    await writeFile(out, body);
    console.log(`+ ${out}  (${layers.length} layer(s) from ${rawLayers.length} SLD rule(s))`);
}

main().catch((err) => { console.error(err); process.exit(1); });
