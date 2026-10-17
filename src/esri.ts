/**
 * GL fragment -> Esri renderer, for clients that only read ArcGIS FeatureServer drawingInfo
 * (ArcGIS Online Map Viewer, Experience Builder, StoryMaps).
 *
 * Nothing here re-implements GL semantics. The fragment is evaluated with MapLibre's own
 * expression engine for each distinct attribute tuple the data actually holds, and each result is
 * written as the Esri symbol that draws the same thing. So every authoring shape (archetype specs,
 * filtered layers, `match`, `case`, lookups, casings) converts the same way.
 *
 *   uniqueValue  the class fields hold a manageable number of distinct tuples
 *   classBreaks  one numeric class field with many values, split at the style's own thresholds
 *   simple       the style reads no attributes
 *
 * Units: GL paints in px, Esri in pt (x0.75). GL dashes are in line widths, CIM dashes in pt.
 */
import {
    createExpression, featureFilter, latest, normalizePropertyExpression,
    type Feature, type FilterSpecification, type PropertyValueSpecification, type StylePropertySpecification,
} from '@maplibre/maplibre-gl-style-spec';
import type { GLLayer } from './layers';

export type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
type Props = Record<string, string | number | boolean | null>;
type Rgba = [number, number, number, number];
export type Legend = readonly { label: string; color: string; values?: readonly { value: string }[] }[];

const PT = 0.75;
const SIZE_ZOOM = 10;          // zoom at which zoom-driven paint is read when no scale ramp fits
const MAX_TUPLES = 2000;       // beyond this a uniqueValue legend is useless
const FILL_TYPES = new Set(['fill', 'line', 'circle']);
const isIcon = (l: GLLayer) => l.type === 'symbol' && l.layout?.['icon-image'] != null;
const isLabel = (l: GLLayer) => l.type === 'symbol' && l.layout?.['text-field'] != null;

/** A sprite icon as an Esri picture marker; build-esri crops it out of the sprite sheet. */
export type IconLookup = (name: string) => { imageData: string; width: number; height: number; color: string | null } | null;

const geomCode = { polygon: 3, line: 2, point: 1 } as const;
export type Geometry = keyof typeof geomCode;

// ── narrowing: GL layers are loose JSON, so read them through guards, never casts ─

const isList = (x: unknown): x is unknown[] => Array.isArray(x);
const isNum = (x: unknown): x is number => typeof x === 'number';
const field = (x: unknown, key: string): unknown =>
    typeof x === 'object' && x !== null && key in x ? Reflect.get(x, key) : undefined;
const isPropSpec = (x: unknown): x is StylePropertySpecification =>
    typeof field(x, 'type') === 'string';
// Any defined value is a candidate; MapLibre's normalizer validates it.
const isPropertyValue = (x: unknown): x is PropertyValueSpecification<unknown> => x !== undefined;
const isFilter = (x: unknown): x is FilterSpecification => isList(x) || typeof x === 'boolean';
const isRgb = (x: unknown): x is { rgb: Rgba } => {
    const rgb = field(x, 'rgb');
    return isList(rgb) && rgb.length === 4 && rgb.every(isNum);
};

export const drawLayers = (layers: GLLayer[]): GLLayer[] =>
    layers.filter((l) => FILL_TYPES.has(l.type ?? '') || isIcon(l));

/** Every attribute a layer reads: `["get", f]` in expressions and legacy `[op, f, v]` filters. */
const LEGACY = new Set(['==', '!=', 'in', '!in', 'has', '!has', '<', '<=', '>', '>=']);

export function fieldsOf(layers: GLLayer[]): string[] {
    const out = new Set<string>();
    const walk = (n: unknown): void => {
        if (!isList(n)) return;
        const [op, arg] = n;
        if (op === 'get' && typeof arg === 'string' && n.length === 2) out.add(arg);
        // Legacy filters are flat (["in", "field", "a", "b"]); expression `in` nests (["in", "a", [...]]).
        const flat = n.slice(1).every((x) => !isList(x));
        if (typeof op === 'string' && LEGACY.has(op) && flat && typeof arg === 'string' && !arg.startsWith('$')) out.add(arg);
        n.forEach(walk);
    };
    for (const l of layers) {
        walk(l.filter);
        Object.values(l.paint ?? {}).forEach(walk);
        walk(l.layout?.['icon-image']);
        walk(l.layout?.['icon-size']);
    }
    return [...out];
}

/** Numeric literals compared against `name`: the style's own class thresholds. */
export function thresholdsOf(layers: GLLayer[], name: string): number[] {
    const out = new Set<number>();
    const reads = (n: unknown): boolean => isList(n)
        && ((n[0] === 'get' && n[1] === name) || n.slice(1).some(reads));
    const walk = (n: unknown): void => {
        if (!isList(n)) return;
        const [op, lhs, rhs] = n;
        if (typeof op === 'string' && ['<', '<=', '>', '>=', '=='].includes(op) && reads(lhs) && isNum(rhs)) out.add(rhs);
        if (op === 'step' && reads(lhs)) n.slice(3).filter((_, i) => i % 2 === 0).filter(isNum).forEach((v) => out.add(v));
        n.forEach(walk);
    };
    for (const l of layers) {
        walk(l.filter);
        Object.values(l.paint ?? {}).forEach(walk);
    }
    return [...out].sort((a, b) => a - b);
}

// ── evaluation ──────────────────────────────────────────────────────────────

// A property lives in either the paint or the layout block; the spec says which.
function specFor(layer: GLLayer, prop: string): { spec: StylePropertySpecification; raw: unknown } | undefined {
    for (const block of ['paint', 'layout'] as const) {
        const spec = field(field(latest, `${block}_${layer.type ?? ''}`), prop);
        if (isPropSpec(spec)) return { spec, raw: layer[block]?.[prop] ?? field(spec, 'default') };
    }
    return undefined;
}

function evaluate(layer: GLLayer, prop: string, props: Props, geometry: Geometry, zoom: number): unknown {
    const found = specFor(layer, prop);
    if (!found || !isPropertyValue(found.raw)) return undefined;
    const feature: Feature = { type: geomCode[geometry], properties: props };
    const value: unknown = normalizePropertyExpression(found.raw, found.spec).evaluate({ zoom }, feature);
    return value;
}

function passes(layer: GLLayer, props: Props, geometry: Geometry, zoom: number): boolean {
    if (zoom < (layer.minzoom ?? 0) || zoom >= (layer.maxzoom ?? Infinity)) return false;
    if (!isFilter(layer.filter)) return true;
    const feature: Feature = { type: geomCode[geometry], properties: props };
    return featureFilter(layer.filter).filter({ zoom }, feature);
}

const rgba = (c: unknown, opacity = 1): Rgba | null => {
    if (!isRgb(c)) return null;
    const [r, g, b, a] = c.rgb;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), Math.round(a * opacity * 255)];
};
const num = (v: unknown, d: number): number => (isNum(v) ? v : d);
const hex = (c: Rgba): string => `#${c.slice(0, 3).map((v) => v.toString(16).padStart(2, '0')).join('')}`;

// ── symbols (CIM: exact dashes, casings, offsets; Map Viewer renders it) ─────

const CAPS = new Map([['round', 'Round'], ['square', 'Square']]);
const JOINS = new Map([['round', 'Round'], ['bevel', 'Bevel']]);

/** An Esri symbol plus the color a legend swatch for it would show. */
type Symbol = { json: Json; color: string | null };

function stroke(layer: GLLayer, props: Props, geometry: Geometry, zoom: number): { json: Json; color: Rgba } | null {
    const p = (k: string) => evaluate(layer, k, props, geometry, zoom);
    const color = rgba(p('line-color'), num(p('line-opacity'), 1));
    if (!color || color[3] === 0) return null;
    const width = num(p('line-width'), 1) * PT;
    const effects: Json[] = [];
    // Cross-faded properties evaluate to { from, to }; either end is the authored dash.
    const dash = layer.paint?.['line-dasharray'] == null ? undefined : p('line-dasharray');
    const dashes = isList(dash) ? dash : field(dash, 'from');
    if (isList(dashes) && dashes.length && dashes.every(isNum)) {
        effects.push({ type: 'CIMGeometricEffectDashes', lineDashEnding: 'NoConstraint',
            dashTemplate: dashes.map((d) => Math.max(d * width, 0.1)) });
    }
    const offset = num(p('line-offset'), 0);
    if (offset) effects.push({ type: 'CIMGeometricEffectOffset', method: 'Square', offset: -offset * PT });
    const cap = CAPS.get(String(layer.layout?.['line-cap'])) ?? 'Butt';
    const join = JOINS.get(String(layer.layout?.['line-join'])) ?? 'Miter';
    return { color, json: { type: 'CIMSolidStroke', enable: true, capStyle: cap, joinStyle: join, miterLimit: 10, width, color, effects } };
}

function fillLayers(layer: GLLayer, props: Props, zoom: number): { json: Json[]; color: Rgba | null } {
    const p = (k: string) => evaluate(layer, k, props, 'polygon', zoom);
    const json: Json[] = [];
    const opacity = num(p('fill-opacity'), 1);
    const outline = layer.paint?.['fill-outline-color'] == null ? null : rgba(p('fill-outline-color'), opacity);
    if (outline) json.push({ type: 'CIMSolidStroke', enable: true, capStyle: 'Round', joinStyle: 'Round', miterLimit: 10, width: PT, color: outline });
    const color = rgba(p('fill-color'), opacity);
    if (color && color[3] > 0) json.push({ type: 'CIMSolidFill', enable: true, color });
    return { json, color: color && color[3] > 0 ? color : null };
}

function circleMarker(layer: GLLayer, props: Props, zoom: number, sizeZoom: number): Symbol | null {
    const p = (k: string) => evaluate(layer, k, props, 'point', zoom);
    const color = rgba(p('circle-color'), num(p('circle-opacity'), 1));
    const sw = num(p('circle-stroke-width'), 0);
    const strokeColor = rgba(p('circle-stroke-color'), num(p('circle-stroke-opacity'), 1));
    if (!color && !sw) return null;
    const transparent: Rgba = [0, 0, 0, 0];
    return {
        color: color ? hex(color) : null,
        json: { type: 'esriSMS', style: 'esriSMSCircle', size: 2 * num(evaluate(layer, 'circle-radius', props, 'point', sizeZoom), 5) * PT,
            color: color ?? transparent, outline: { color: sw && strokeColor ? strokeColor : transparent, width: sw * PT } },
    };
}

function iconMarker(layer: GLLayer, props: Props, zoom: number, sizeZoom: number, icon?: IconLookup): Symbol | null {
    const resolved = evaluate(layer, 'icon-image', props, 'point', zoom);
    const name = field(resolved, 'name') ?? resolved;   // a ResolvedImage carries its name
    const img = typeof name === 'string' ? icon?.(name) : null;
    if (!img) return null;
    const scale = num(evaluate(layer, 'icon-size', props, 'point', sizeZoom), 1) * PT;
    return { color: img.color, json: { type: 'esriPMS', contentType: 'image/png', imageData: img.imageData,
        width: img.width * scale, height: img.height * scale } };
}

/** The symbol one feature gets: every drawing layer that passes its filter, topmost first. A size a
 * scale sizeInfo carries is read at `sizeZoom`. */
export function symbolFor(
    layers: GLLayer[], props: Props, geometry: Geometry, zoom: number, icon?: IconLookup, sizeZoom = zoom,
): Symbol | null {
    const drawing = layers.filter((l) => passes(l, props, geometry, zoom));
    if (!drawing.length) return null;
    const topDown = [...drawing].reverse();
    if (geometry === 'point') {
        const top = topDown.find((l) => l.type === 'circle' || isIcon(l));
        if (!top) return null;
        return top.type === 'circle' ? circleMarker(top, props, zoom, sizeZoom) : iconMarker(top, props, zoom, sizeZoom, icon);
    }
    const symbolLayers: Json[] = [];
    let fill: Rgba | null = null;
    let line: Rgba | null = null;
    for (const l of topDown) {
        if (l.type === 'line') {
            const s = stroke(l, props, geometry, zoom);
            if (s) { symbolLayers.push(s.json); line ??= s.color; }
        } else if (l.type === 'fill' && geometry === 'polygon') {
            const f = fillLayers(l, props, zoom);
            symbolLayers.push(...f.json);
            fill ??= f.color;
        }
    }
    if (!symbolLayers.length) return null;
    const type = geometry === 'polygon' ? 'CIMPolygonSymbol' : 'CIMLineSymbol';
    const swatch = fill ?? line;
    return { color: swatch ? hex(swatch) : null, json: { type: 'CIMSymbolReference', symbol: { type, symbolLayers } } };
}

// ── labels ──────────────────────────────────────────────────────────────────

const arcadeString = (s: string) => JSON.stringify(s);

/** The GL text expressions styles actually use, as Arcade. null = no faithful translation. */
export function toArcade(e: unknown): string | null {
    if (typeof e === 'string') {
        // Legacy token strings: "{name}" or "Sec {num}".
        const parts = e.split(/(\{[^}]+\})/).filter(Boolean)
            .map((p) => (p.startsWith('{') ? `DefaultValue($feature.${p.slice(1, -1)}, '')` : arcadeString(p)));
        return parts.length ? parts.join(' + ') : "''";
    }
    if (isNum(e)) return String(e);
    if (!isList(e)) return null;
    const [op, ...args] = e;
    const sub = args.map(toArcade);
    const all = (xs: (string | null)[]): xs is string[] => xs.every((x) => x !== null);
    switch (op) {
        case 'get': {
            const [key, obj] = args;
            if (typeof key === 'string' && args.length === 1) return `$feature.${key}`;
            const lit = isList(obj) && obj[0] === 'literal' ? obj[1] : undefined;
            const k = toArcade(key);
            if (k === null || typeof lit !== 'object' || lit === null) return null;
            const pairs = Object.entries(lit).flatMap(([from, to]) => [arcadeString(from), arcadeString(String(to))]);
            return `Decode(${k}, ${pairs.join(', ')}, null)`;
        }
        case 'to-string': return all(sub) ? `Text(DefaultValue(${sub.join('')}, ''))` : null;
        case 'downcase': return all(sub) ? `Lower(${sub.join('')})` : null;
        case 'upcase': return all(sub) ? `Upper(${sub.join('')})` : null;
        case 'concat': return all(sub) ? sub.join(' + ') : null;
        // DefaultValue also replaces '', which GL keeps; that only agrees when the fallback is ''.
        case 'coalesce': return all(sub)
            ? sub.reduceRight((acc, s) => (acc === "''" ? `DefaultValue(${s}, '')` : `IIf(${s} == null, ${acc}, ${s})`))
            : null;
        case 'literal': return typeof args[0] === 'string' ? arcadeString(args[0]) : null;
        default: return null;
    }
}

const PLACEMENT: Record<Geometry, string> = {
    point: 'esriServerPointLabelPlacementAboveRight',
    line: 'esriServerLinePlacementCenterAlong',
    polygon: 'esriServerPolygonPlacementAlwaysHorizontal',
};

const sqlValue = (v: string | number | boolean | null) =>
    v === null ? null : isNum(v) ? String(v) : `'${String(v).replace(/'/g, "''")}'`;

/** SQL matching exactly these attribute tuples: what a labelingInfo `where` can carry. */
function whereFor(fields: string[], tuples: Props[]): string {
    const [only] = fields;
    if (fields.length === 1 && only !== undefined) {
        const vals = tuples.map((t) => sqlValue(t[only] ?? null));
        const listed = vals.filter((v) => v !== null);
        const parts = [
            ...(listed.length ? [`${only} IN (${listed.join(', ')})`] : []),
            ...(vals.includes(null) ? [`${only} IS NULL`] : []),
        ];
        return parts.join(' OR ');
    }
    return tuples.map((t) => `(${fields.map((f) => {
        const v = sqlValue(t[f] ?? null);
        return v === null ? `${f} IS NULL` : `${f} = ${v}`;
    }).join(' AND ')})`).join(' OR ');
}

/**
 * Label layers as Esri labelingInfo. A label whose filter or paint reads attributes becomes one
 * class per distinct symbol, each with a `where` naming the values it applies to.
 */
export function toLabels(layers: GLLayer[], geometry: Geometry, rows: Props[], warnings: string[]): Json[] {
    const out: Json[] = [];
    for (const l of layers.filter(isLabel)) {
        const expression = toArcade(l.layout?.['text-field']);
        if (expression === null) { warnings.push(`label ${l.id ?? ''}: text-field has no Arcade form`); continue; }
        const fonts = l.layout?.['text-font'];
        const font = isList(fonts) && typeof fonts[0] === 'string' ? fonts[0] : 'Noto Sans Regular';
        const black: Rgba = [0, 0, 0, 255];
        const zoom = Math.min(Math.max(SIZE_ZOOM, l.minzoom ?? 0), (l.maxzoom ?? Infinity) - 0.5);
        const symbol = (props: Props): Json => {
            const p = (k: string) => evaluate(l, k, props, geometry, zoom);
            const halo = num(p('text-halo-width'), 0);
            const haloColor = rgba(p('text-halo-color'));
            return {
                type: 'esriTS',
                color: rgba(p('text-color'), num(p('text-opacity'), 1)) ?? black,
                font: { family: font.replace(/ (Regular|Medium|Bold|Italic)$/, ''),
                    weight: /Bold/.test(font) ? 'bold' : 'normal', size: num(p('text-size'), 16) * PT },
                ...(halo && haloColor ? { haloColor, haloSize: halo * PT } : {}),
            };
        };
        const base = {
            labelExpressionInfo: { expression },
            labelPlacement: PLACEMENT[geometry],
            ...(l.minzoom ? { minScale: zoomToScale(l.minzoom) } : {}),
            ...(l.maxzoom === undefined ? {} : { maxScale: zoomToScale(l.maxzoom) }),
        };
        const fields = fieldsOf([l]);
        if (!fields.length) {
            if (passes(l, {}, geometry, zoom)) out.push({ ...base, symbol: symbol({}) });
            continue;
        }

        const tuples = new Map<string, Props>();
        for (const row of rows) {
            const t: Props = Object.fromEntries(fields.map((f) => [f, row[f] ?? null]));
            tuples.set(JSON.stringify(fields.map((f) => t[f])), t);
        }
        const groups = new Map<string, { symbol: Json; tuples: Props[] }>();
        for (const t of tuples.values()) {
            if (!passes(l, t, geometry, zoom)) continue;
            const sym = symbol(t);
            const key = JSON.stringify(sym);
            const g = groups.get(key) ?? { symbol: sym, tuples: [] };
            g.tuples.push(t);
            groups.set(key, g);
        }
        for (const g of groups.values()) out.push({ ...base, where: whereFor(fields, g.tuples), symbol: g.symbol });
    }
    return out;
}

// ── class keys ──────────────────────────────────────────────────────────────

const NULL = '<Null>';
const NORMALIZERS = new Set(['to-string', 'string', 'coalesce', 'downcase', 'upcase']);
const text = (v: unknown): string =>
    (typeof v === 'string' || isNum(v) || typeof v === 'boolean' ? String(v) : NULL);
const featureRef = (f: string) => (/^\w+$/.test(f) ? `$feature.${f}` : `$feature[${arcadeString(f)}]`);

/** The wrapper GL puts around every read of `name` (to-string, coalesce to text, case), else null. */
function normalizerOf(layers: GLLayer[], name: string): unknown[] | null {
    const seen = new Set<string>();
    const walk = (n: unknown, up: unknown[][]): void => {
        if (!isList(n)) return;
        const [op, arg] = n;
        if (typeof op === 'string' && LEGACY.has(op) && arg === name && n.slice(1).every((x) => !isList(x))) seen.add('raw');
        if (op === 'get' && arg === name && n.length === 2) {
            let top: unknown[] = n;
            for (const p of [...up].reverse()) {
                const pop = p[0];
                if (typeof pop !== 'string' || !NORMALIZERS.has(pop) || p[1] !== top) break;
                if (pop === 'coalesce' && !p.slice(2).every((x) => typeof x === 'string')) break;
                top = p;
            }
            seen.add(JSON.stringify(top));
        }
        n.forEach((c) => walk(c, [...up, n]));
    };
    for (const l of layers) {
        [l.filter, ...Object.values(l.paint ?? {}), l.layout?.['icon-image'], l.layout?.['icon-size']].forEach((x) => walk(x, []));
    }
    const [only, ...rest] = seen;
    const parsed: unknown = only === undefined || rest.length || only === 'raw' ? null : JSON.parse(only);
    return isList(parsed) && parsed[0] !== 'get' ? parsed : null;
}

type Part = { field: string; key: (v: Props[string]) => string; arcade: string; folds: boolean };

/** One class field as Esri reads it: raw, or through the style's own normalization. */
function partFor(layers: GLLayer[], field: string): Part {
    const raw: Part = { field, key: (v) => (v === null ? NULL : text(v)), folds: false,
        arcade: `IIf(${featureRef(field)} == null, '${NULL}', Text(${featureRef(field)}))` };
    const norm = normalizerOf(layers, field);
    const parsed = norm && createExpression(norm);
    const arcade = norm && toArcade(norm);
    if (parsed?.result !== 'success' || !arcade) return raw;
    const expr = parsed.value;
    const key = (v: Props[string]) => {
        const out: unknown = expr.evaluate({ zoom: SIZE_ZOOM }, { type: 1, properties: { [field]: v } });
        return out == null ? NULL : text(out);
    };
    const folds = /"(downcase|upcase)"/.test(JSON.stringify(norm));
    return { field, key, folds, arcade: key(null) === NULL ? `DefaultValue(${arcade}, '${NULL}')` : arcade };
}

// ── renderers ───────────────────────────────────────────────────────────────

export type Renderer = { renderer: Json; labelingInfo: Json[]; minScale?: number; maxScale?: number; warnings: string[] };

// GL zooms run one level below Esri LODs at the same scale (512px vs 256px tiles).
const zoomToScale = (z: number) => 295828763.7957775 / 2 ** z;

type Stop = { value: number; size: number };

/** A size by map scale. Esri requires its stops in ascending scale, the reverse of zoom order. */
export const scaleSizeInfo = (stops: Stop[]): Json =>
    ({ type: 'sizeInfo', valueExpression: '$view.scale', stops: [...stops].sort((a, b) => a.value - b.value) });

/** A circle radius or icon size set by zoom alone, sampled densely: Esri interpolates in scale, GL in zoom. */
function sizeByScale(layers: GLLayer[], iconPx: number): Json | null {
    const top = [...layers].reverse().find((l) => l.type === 'circle' || isIcon(l));
    const prop = top?.type === 'circle' ? 'circle-radius' : 'icon-size';
    const found = top && specFor(top, prop);
    if (!top || !found || !isPropertyValue(found.raw)) return null;
    if (normalizePropertyExpression(found.raw, found.spec).kind !== 'camera') return null;
    const size = (z: number) => {
        const v = num(evaluate(top, prop, {}, 'point', z), 0);
        return (top.type === 'circle' ? 2 * v : v * iconPx) * PT;
    };
    // Quarter zooms, plus just below each zoom literal so a step stays a step.
    const lits = JSON.stringify(found.raw).match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
    const zooms = [...new Set([...Array.from({ length: 97 }, (_, i) => i / 4), ...lits.map((z) => z - 1e-3)])]
        .filter((z) => z >= 0 && z <= 24).sort((a, b) => a - b);
    const pts = zooms.map((z) => ({ value: zoomToScale(z), size: size(z) }));
    // Drop each point the line from the last kept point to the next one still passes through.
    const off = (a: Stop, b: Stop, p: Stop) => Math.abs(a.size + (b.size - a.size) * (p.value - a.value) / (b.value - a.value) - p.size);
    let last = 0;
    const kept = pts.filter((p, i) => {
        const [a, b] = [pts[last], pts[i + 1]];
        if (i === 0 || !a || !b || pts.slice(last + 1, i + 1).some((q) => off(a, b, q) > 0.05)) last = i;
        return last === i;
    });
    return scaleSizeInfo(kept);
}

/** A circle radius that interpolates on a numeric field becomes a field-driven size. */
function sizeByField(layers: GLLayer[]): { info: Json; field: string } | null {
    const r = layers.find((l) => l.type === 'circle')?.paint?.['circle-radius'];
    if (!isList(r) || r[0] !== 'interpolate') return null;
    const input = JSON.stringify(r[2]);
    const name = /\["get","([^"]+)"\]/.exec(input)?.[1];
    if (!name || input.includes('zoom')) return null;
    const stops = r.slice(3);
    const out: Json[] = [];
    for (let i = 0; i + 1 < stops.length; i += 2) {
        const [value, radius] = [stops[i], stops[i + 1]];
        if (!isNum(value) || !isNum(radius)) return null;
        out.push({ value, size: 2 * radius * PT });
    }
    return { field: name, info: { type: 'sizeInfo', field: name, stops: out } };
}

/** The largest double below `x`. */
const below = (x: number): number => {
    if (x === 0) return -Number.MIN_VALUE;
    const bits = new BigInt64Array(new Float64Array([x]).buffer);
    bits[0] = (bits[0] ?? 0n) + (x > 0 ? -1n : 1n);
    return new Float64Array(bits.buffer)[0] ?? x;
};

const OTHER = '\u0000unseen';  // a value no column holds: what GL draws for values added later
const DELIMITERS = [',', '|', ';', '~', '^'];

const emptySymbol = (geometry: Geometry): Json => ({ type: 'CIMSymbolReference', symbol: {
    type: { polygon: 'CIMPolygonSymbol', line: 'CIMLineSymbol', point: 'CIMPointSymbol' }[geometry], symbolLayers: [] } });

type Bucket = { from: number; to: number; z: number };
const COMPARE = new Set(['<', '<=', '>', '>=', '==', '!=']);

/** Zoom ranges a style draws alike, cut where a layer range, zoom step, zoom filter or zoom ramp
 * may change it; neighbours `sig` cannot tell apart merge. `z` is the zoom each one is read at. */
function zoomBuckets(layers: GLLayer[], lo: number, hi: number, sig: (z: number) => string): Bucket[] {
    const cuts = new Set<number>();
    const isZoom = (x: unknown) => isList(x) && x.length === 1 && x[0] === 'zoom';
    const walk = (n: unknown): void => {
        if (!isList(n)) return;
        const [op, a, b] = n;
        const stops = n.slice(3).filter((_, i) => i % 2 === 0).filter(isNum);
        if (op === 'step' && isZoom(a)) stops.forEach((z) => cuts.add(z));
        // Half zooms across a ramp: Esri draws each bucket at one value.
        if (op === 'interpolate' && isZoom(b)) for (let z = Math.min(...stops); z < Math.max(...stops); z += 0.5) cuts.add(z);
        if (typeof op === 'string' && COMPARE.has(op) && isZoom(a) && isNum(b)) cuts.add(b);
        n.forEach(walk);
    };
    for (const l of layers) {
        cuts.add(l.minzoom ?? lo);
        cuts.add(l.maxzoom ?? hi);
        [l.filter, ...Object.values(l.paint ?? {}), ...Object.values(l.layout ?? {})].forEach(walk);
    }
    const edges = [lo, ...[...cuts].filter((z) => z > lo && z < hi).sort((x, y) => x - y), hi];
    const out: Bucket[] = [];
    for (const [i, from] of edges.entries()) {
        const to = edges[i + 1];
        if (to === undefined) break;
        const z = from <= SIZE_ZOOM && SIZE_ZOOM < to ? SIZE_ZOOM : (from + Math.min(to, 24)) / 2;
        const prev = out.at(-1);
        if (!prev || sig(prev.z) !== sig(z)) out.push({ from, to, z });
        else [prev.to, prev.z] = [to, z === SIZE_ZOOM ? z : prev.z];
    }
    return out;
}

export function toRenderer(
    layersIn: GLLayer[], geometry: Geometry, rows: Props[], legend: Legend | undefined,
    icon?: IconLookup, iconPx = 0,
): Renderer {
    const layers = drawLayers(layersIn);
    const warnings: string[] = [];
    const labelingInfo = toLabels(layersIn, geometry, rows, warnings);
    const visualVariables: Json[] = [];
    const scaleSize = geometry === 'point' ? sizeByScale(layers, iconPx) : null;
    if (scaleSize) visualVariables.push(scaleSize);
    const fieldSize = geometry === 'point' ? sizeByField(layers) : null;
    if (fieldSize) visualVariables.push(fieldSize.info);
    const vv: Record<string, Json> = visualVariables.length ? { visualVariables } : {};

    // Fields that only size circles are carried by sizeInfo, not by class.
    const fields = fieldsOf(layers).filter((f) => f !== fieldSize?.field);
    const minzoom = Math.min(...layers.map((l) => l.minzoom ?? 0));
    const minScale = minzoom > 0 ? zoomToScale(minzoom) : undefined;
    const maxzoom = Math.max(...layers.map((l) => l.maxzoom ?? Infinity));
    const maxScale = Number.isFinite(maxzoom) ? zoomToScale(maxzoom) : undefined;
    const done = (renderer: Json): Renderer => ({ renderer, labelingInfo, minScale, maxScale, warnings });

    const sizeZoom = scaleSize ? SIZE_ZOOM : undefined;
    const draw = (t: Props, z: number) => symbolFor(layers, t, geometry, z, icon, sizeZoom);
    const tuples = new Map<string, Props>();
    for (const row of rows) {
        const t: Props = {};
        for (const f of fields) t[f] = row[f] ?? null;
        tuples.set(JSON.stringify(fields.map((f) => t[f])), t);
    }
    const data = [...tuples.values()].slice(0, MAX_TUPLES);
    const unseen: Props = Object.fromEntries(fields.map((f) => [f, OTHER]));
    const sample = fields.length ? [...data, unseen] : [{}];
    const buckets = zoomBuckets(layers, minzoom, Number.isFinite(maxzoom) ? maxzoom : 24,
        (z) => JSON.stringify(sample.map((t) => draw(t, z)?.json ?? null)));
    const scaled = buckets.length > 1;
    const zoom = buckets.find((b) => b.z === SIZE_ZOOM)?.z ?? buckets[0]?.z ?? SIZE_ZOOM;

    const [first] = fields;
    if (first === undefined && !scaled) {
        const symbol = draw({}, zoom);
        // Esri shows the layer name beside an unlabelled symbol, which beats an internal title.
        const [only] = legend ?? [];
        return done({ type: 'simple', symbol: symbol?.json ?? null, label: only?.label ?? '', ...vv });
    }

    // One numeric field with many values: class breaks at the style's own thresholds.
    const values = [...tuples.values()].map((t) => (first === undefined ? null : t[first]));
    if (first !== undefined && fields.length === 1 && tuples.size > 50 && values.every((v) => isNum(v) || v === null)) {
        if (scaled) warnings.push(`class breaks read at zoom ${zoom}; they change with zoom in GL`);
        const nums = values.filter(isNum);
        const cuts = thresholdsOf(layers, first);
        const bounds = [Math.min(...nums, ...cuts) - 1, ...cuts, Math.max(...nums, ...cuts) + 1];
        const at = (v: number) => JSON.stringify(draw({ [first]: v }, zoom)?.json ?? null);
        // Esri's classMaxValue is inclusive. A value exactly on a cut belongs to whichever side GL
        // draws it with (`>=` puts it above), so a cut GL draws above ends the class just below it.
        const top = bounds.map((b, i) => {
            const above = bounds[i + 1];
            return i > 0 && above !== undefined && at(b) === at((b + above) / 2) ? below(b) : b;
        });
        const classBreakInfos: Json[] = [];
        for (let i = 0; i + 1 < bounds.length; i++) {
            const [lo, hi] = [bounds[i], bounds[i + 1]];
            if (lo === undefined || hi === undefined) continue;
            const symbol = draw({ [first]: (lo + hi) / 2 }, zoom);
            if (!symbol) continue;
            const label = legendLabel(legend, symbol, []) ?? (i === 0 ? `< ${hi}` : `${lo} to ${hi}`);
            classBreakInfos.push({ classMinValue: top[i] ?? lo, classMaxValue: top[i + 1] ?? hi, label, symbol: symbol.json });
        }
        const none = draw({ [first]: null }, zoom);
        return done({ type: 'classBreaks', field: first, minValue: bounds[0] ?? 0, classBreakInfos,
            ...(none ? { defaultSymbol: none.json, defaultLabel: 'No value' } : {}), ...vv });
    }

    if (tuples.size > MAX_TUPLES) warnings.push(`${tuples.size} distinct values; legend capped at ${MAX_TUPLES}`);

    // Keys: plain fields when GL compares raw values, else Arcade applying GL's own normalization.
    const normalized = fields.map((f) => partFor(layers, f));
    const asExpression = scaled || fields.length > 3 || normalized.some((p) => p.folds);
    const parts = asExpression ? normalized : normalized.map((p) => partFor([], p.field));
    // Values the data lacks yet: legend codes, and '' for null and back. Kept where GL draws them
    // other than the default symbol does.
    const flip = (v: Props[string]) => (v === null ? '' : v === '' ? null : v);
    const extra: Props[] = [
        ...(first !== undefined && fields.length === 1 ? (legend ?? []).flatMap((e) => e.values ?? []).map((v) => ({ [first]: v.value })) : []),
        ...data.flatMap((t) => parts.filter((p) => p.key(null) !== p.key('')).map((p) => ({ ...t, [p.field]: flip(t[p.field] ?? null) }))),
    ];
    const other = fields.length ? draw(unseen, zoom) : null;
    const fallback = JSON.stringify(other?.json ?? null);
    const keysOf = (t: Props) => parts.map((p) => p.key(t[p.field] ?? null));
    const delimiter = DELIMITERS.find((d) => !data.concat(extra).some((t) => keysOf(t).some((k) => k.includes(d)))) ?? '\u001f';
    // Scale-dependent styles lead each key with the zoom bucket the view is in.
    const bucketArcade = buckets.slice(0, -1).map((b, i) => `$view.scale > ${zoomToScale(b.to)}, '${i}'`)
        .concat(`'${buckets.length - 1}'`).join(', ');
    const keyOf = (t: Props, i: number) => (scaled ? [String(i), ...keysOf(t)] : keysOf(t)).join(delimiter);

    // Group tuples by the symbol they evaluate to: one legend class per distinct symbol.
    // Legends written one entry per filtered layer (qfaults: color and dash per class) align by index.
    const filtered = layers.filter((l) => l.filter != null);
    const aligned = (t: Props, z: number): number | undefined => {
        if (legend?.length !== filtered.length) return undefined;
        const i = filtered.findIndex((l) => passes(l, t, geometry, z));
        return i < 0 ? undefined : i;
    };
    type Group = { symbol: Symbol | null; keys: Set<string>; raw: string[][]; idx: number; at?: number };
    const groups = new Map<string, Group>();
    const owner = new Map<string, string>();
    const all = [...data, ...extra];
    for (const [b, { z }] of (scaled ? buckets : [{ z: zoom }]).entries()) {
        for (const [i, t] of all.entries()) {
            const key = keyOf(t, b);
            const symbol = draw(t, z);
            const sym = JSON.stringify(symbol?.json ?? null);
            if (i >= data.length && sym === fallback) continue;
            if (owner.has(key)) {
                if (i < data.length && owner.get(key) !== sym) warnings.push(`key ${key} draws two ways; GL normalization not mirrored`);
                continue;
            }
            owner.set(key, sym);
            const g = groups.get(sym) ?? { symbol, keys: new Set(), raw: [], idx: groups.size, at: aligned(t, z) };
            g.keys.add(key);
            g.raw.push(fields.map((f) => String(t[f] ?? NULL)));
            groups.set(sym, g);
        }
    }

    const classes = [...groups.values()].flatMap((g) => {
        // Under a default symbol, values GL leaves undrawn need a class that draws nothing.
        if (!g.symbol) return other ? [{ label: 'Not drawn', symbol: emptySymbol(geometry), keys: g.keys, order: Infinity }] : [];
        const firsts = g.raw.map(([v]) => v ?? '');
        const shown = (v: string) => (v === '' ? '(blank)' : v === NULL ? '(no value)' : v);
        const listed = [...new Set(g.raw.map((v) => v.map((x) => shown(x.trim())).join(', ')))];
        return [{
            label: (g.at === undefined ? undefined : legend?.[g.at]?.label)
                ?? legendLabel(legend, g.symbol, firsts)
                ?? listed.slice(0, 4).join('; ') + (listed.length > 4 ? '…' : ''),
            symbol: g.symbol.json,
            keys: g.keys,
            order: g.at ?? legendIndex(legend, g.symbol, firsts) ?? 1000 + g.idx,
        }];
    }).sort((a, b) => a.order - b.order);
    const split = (k: string) => (asExpression ? [k] : k.split(delimiter));
    const [second, third] = fields.slice(1);
    const keying: Record<string, Json> = asExpression
        ? { valueExpression: [...(scaled ? [`When(${bucketArcade})`] : []), ...parts.map((p) => p.arcade)].join(` + ${arcadeString(delimiter)} + `),
            valueExpressionTitle: fields.join(', ') || 'Zoom' }
        : { ...(first === undefined ? {} : { field1: first }), ...(second === undefined ? {} : { field2: second }), ...(third === undefined ? {} : { field3: third }), fieldDelimiter: delimiter };

    return done({
        type: 'uniqueValue',
        ...keying,
        uniqueValueGroups: [{ classes: classes.map(({ label, symbol, keys }) => ({ label, symbol, values: [...keys].map(split) })) }],
        uniqueValueInfos: classes.flatMap(({ label, symbol, keys }) => [...keys].map((value) => ({ value, label, symbol }))),
        // What GL draws for a value added after this build.
        ...(other ? { defaultSymbol: other.json, defaultLabel: classes.some((c) => c.label === 'Other') ? 'Other values' : 'Other' } : {}),
        ...vv,
    });
}

// A legend entry names this class when it lists one of its values, else when its color is unique.
function legendIndex(legend: Legend | undefined, symbol: Symbol, values: string[]): number | undefined {
    if (!legend?.length) return undefined;
    const lower = new Set(values.map((v) => v.toLowerCase()));
    const byValue = legend.findIndex((e) => e.values?.some((v) => lower.has(v.value.toLowerCase()))
        || lower.has(e.label.toLowerCase()));
    if (byValue >= 0) return byValue;
    const color = symbol.color?.toLowerCase();
    const byColor = legend.flatMap((e, i) => (e.color.toLowerCase() === color ? [i] : []));
    return byColor.length === 1 ? byColor[0] : undefined;
}

// Otherwise name it after the legend entries its list-valued codes mix ("Core + Cuttings").
function mixLabel(legend: Legend | undefined, values: string[]): string | undefined {
    const tokens = new Set(values.flatMap((v) => v.split(',')).map((t) => t.trim().toLowerCase()));
    const hits = (legend ?? []).filter((e) => e.values?.some((v) => tokens.has(v.value.toLowerCase())));
    return hits.length > 1 ? hits.map((e) => e.label).join(' + ') : undefined;
}

function legendLabel(legend: Legend | undefined, symbol: Symbol, values: string[]): string | undefined {
    const i = legendIndex(legend, symbol, values);
    return i === undefined ? mixLabel(legend, values) : legend?.[i]?.label;
}
