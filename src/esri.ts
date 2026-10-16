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
    featureFilter, latest, normalizePropertyExpression,
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
export function fieldsOf(layers: GLLayer[]): string[] {
    const out = new Set<string>();
    const legacy = new Set(['==', '!=', 'in', '!in', 'has', '!has', '<', '<=', '>', '>=']);
    const walk = (n: unknown): void => {
        if (!isList(n)) return;
        const [op, arg] = n;
        if (op === 'get' && typeof arg === 'string' && n.length === 2) out.add(arg);
        // Legacy filters are flat (["in", "field", "a", "b"]); expression `in` nests (["in", "a", [...]]).
        const flat = n.slice(1).every((x) => !isList(x));
        if (typeof op === 'string' && legacy.has(op) && flat && typeof arg === 'string' && !arg.startsWith('$')) out.add(arg);
        n.forEach(walk);
    };
    for (const l of layers) {
        walk(l.filter);
        Object.values(l.paint ?? {}).forEach(walk);
        walk(l.layout?.['icon-image']);
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

function circleMarker(layer: GLLayer, props: Props, zoom: number): Symbol | null {
    const p = (k: string) => evaluate(layer, k, props, 'point', zoom);
    const color = rgba(p('circle-color'), num(p('circle-opacity'), 1));
    const sw = num(p('circle-stroke-width'), 0);
    const strokeColor = rgba(p('circle-stroke-color'), num(p('circle-stroke-opacity'), 1));
    if (!color && !sw) return null;
    const transparent: Rgba = [0, 0, 0, 0];
    return {
        color: color ? hex(color) : null,
        json: { type: 'esriSMS', style: 'esriSMSCircle', size: 2 * num(p('circle-radius'), 5) * PT,
            color: color ?? transparent, outline: { color: sw && strokeColor ? strokeColor : transparent, width: sw * PT } },
    };
}

function iconMarker(layer: GLLayer, props: Props, zoom: number, icon?: IconLookup): Symbol | null {
    const resolved = evaluate(layer, 'icon-image', props, 'point', zoom);
    const name = field(resolved, 'name') ?? resolved;   // a ResolvedImage carries its name
    const img = typeof name === 'string' ? icon?.(name) : null;
    if (!img) return null;
    const scale = num(evaluate(layer, 'icon-size', props, 'point', zoom), 1) * PT;
    return { color: img.color, json: { type: 'esriPMS', contentType: 'image/png', imageData: img.imageData,
        width: img.width * scale, height: img.height * scale } };
}

/** The symbol one feature gets: every drawing layer that passes its filter, topmost first. */
export function symbolFor(layers: GLLayer[], props: Props, geometry: Geometry, zoom: number, icon?: IconLookup): Symbol | null {
    const drawing = layers.filter((l) => passes(l, props, geometry, zoom));
    if (!drawing.length) return null;
    const topDown = [...drawing].reverse();
    if (geometry === 'point') {
        const top = topDown.find((l) => l.type === 'circle' || isIcon(l));
        if (!top) return null;
        return top.type === 'circle' ? circleMarker(top, props, zoom) : iconMarker(top, props, zoom, icon);
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
        case 'coalesce': return all(sub) ? sub.reduceRight((acc, s) => `DefaultValue(${s}, ${acc})`) : null;
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
        const symbol = (props: Props): Json => {
            const p = (k: string) => evaluate(l, k, props, geometry, SIZE_ZOOM);
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
        };
        const fields = fieldsOf([l]);
        if (!fields.length) { out.push({ ...base, symbol: symbol({}) }); continue; }

        const tuples = new Map<string, Props>();
        for (const row of rows) {
            const t: Props = Object.fromEntries(fields.map((f) => [f, row[f] ?? null]));
            tuples.set(JSON.stringify(fields.map((f) => t[f])), t);
        }
        const groups = new Map<string, { symbol: Json; tuples: Props[] }>();
        for (const t of tuples.values()) {
            if (!passes(l, t, geometry, SIZE_ZOOM)) continue;
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

// ── renderers ───────────────────────────────────────────────────────────────

export type Renderer = { renderer: Json; labelingInfo: Json[]; minScale?: number; warnings: string[] };

// GL zooms run one level below Esri LODs at the same scale (512px vs 256px tiles).
const zoomToScale = (z: number) => 295828763.7957775 / 2 ** z;

/** A circle radius or icon size that interpolates on zoom becomes a scale-driven size. */
function sizeByScale(layers: GLLayer[], iconPx: number): Json | null {
    const top = layers.find((l) => l.type === 'circle' || isIcon(l));
    const r = top?.type === 'circle' ? top.paint?.['circle-radius'] : top?.layout?.['icon-size'];
    if (!isList(r) || r[0] !== 'interpolate' || JSON.stringify(r[2]) !== '["zoom"]') return null;
    const stops = r.slice(3);
    if (!stops.every(isNum)) return null;
    const px = (v: number) => (top?.type === 'circle' ? 2 * v : v * iconPx);
    const out: Json[] = [];
    for (let i = 0; i + 1 < stops.length; i += 2) {
        const [z, v] = [stops[i], stops[i + 1]];
        if (isNum(z) && isNum(v)) out.push({ value: zoomToScale(z), size: px(v) * PT });
    }
    return { type: 'sizeInfo', valueExpression: '$view.scale', stops: out };
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

const OTHER = '\u0000unseen';  // a value no column holds: what GL draws for values added later

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
    const done = (renderer: Json): Renderer => ({ renderer, labelingInfo, minScale, warnings });

    const [first, second, third] = fields;
    if (first === undefined) {
        const symbol = symbolFor(layers, {}, geometry, SIZE_ZOOM, icon);
        // Esri shows the layer name beside an unlabelled symbol, which beats an internal title.
        const [only] = legend ?? [];
        return done({ type: 'simple', symbol: symbol?.json ?? null, label: only?.label ?? '', ...vv });
    }

    const tuples = new Map<string, Props>();
    for (const row of rows) {
        const t: Props = {};
        for (const f of fields) t[f] = row[f] ?? null;
        tuples.set(JSON.stringify(fields.map((f) => t[f])), t);
    }

    // One numeric field with many values: class breaks at the style's own thresholds.
    const values = [...tuples.values()].map((t) => t[first]);
    if (fields.length === 1 && tuples.size > 50 && values.every((v) => isNum(v) || v === null)) {
        const nums = values.filter(isNum);
        const cuts = thresholdsOf(layers, first);
        const bounds = [Math.min(...nums, ...cuts) - 1, ...cuts, Math.max(...nums, ...cuts) + 1];
        const classBreakInfos: Json[] = [];
        for (let i = 0; i + 1 < bounds.length; i++) {
            const [lo, hi] = [bounds[i], bounds[i + 1]];
            if (lo === undefined || hi === undefined) continue;
            const symbol = symbolFor(layers, { [first]: (lo + hi) / 2 }, geometry, SIZE_ZOOM);
            if (!symbol) continue;
            const label = legendLabel(legend, symbol, []) ?? (i === 0 ? `< ${hi}` : `${lo} to ${hi}`);
            classBreakInfos.push({ classMinValue: lo, classMaxValue: hi, label, symbol: symbol.json });
        }
        return done({ type: 'classBreaks', field: first, minValue: bounds[0] ?? 0, classBreakInfos, ...vv });
    }

    if (tuples.size > MAX_TUPLES) warnings.push(`${tuples.size} distinct values; legend capped at ${MAX_TUPLES}`);
    if (fields.length > 3) warnings.push(`classes on ${fields.length} fields; Esri keys on 3 at most`);
    const keyFields = [first, second, third].filter((f) => f !== undefined);

    // Group tuples by the symbol they evaluate to: one legend class per distinct symbol.
    // Legends written one entry per filtered layer (qfaults: color and dash per class) align by index.
    const filtered = layers.filter((l) => l.filter != null);
    const aligned = (t: Props): number | undefined => {
        if (legend?.length !== filtered.length) return undefined;
        const i = filtered.findIndex((l) => passes(l, t, geometry, SIZE_ZOOM));
        return i < 0 ? undefined : i;
    };
    const groups = new Map<string, { symbol: Symbol; values: string[][]; idx: number; at?: number }>();
    for (const t of [...tuples.values()].slice(0, MAX_TUPLES)) {
        const symbol = symbolFor(layers, t, geometry, SIZE_ZOOM, icon);
        if (!symbol) continue;   // GL draws nothing for it either
        const key = JSON.stringify(symbol.json);
        const g = groups.get(key) ?? { symbol, values: [], idx: groups.size, at: aligned(t) };
        g.values.push(keyFields.map((f) => String(t[f] ?? '<Null>')));
        groups.set(key, g);
    }
    const other = symbolFor(layers, Object.fromEntries(fields.map((f) => [f, OTHER])), geometry, SIZE_ZOOM, icon);

    const classes = [...groups.values()].map((g) => {
        const firsts = g.values.map(([v]) => v ?? '');
        const shown = (v: string) => (v === '' ? '(blank)' : v === '<Null>' ? '(no value)' : v);
        const listed = [...new Set(g.values.map((v) => v.map((x) => shown(x.trim())).join(', ')))];
        return {
            label: (g.at === undefined ? undefined : legend?.[g.at]?.label)
                ?? legendLabel(legend, g.symbol, firsts)
                ?? listed.slice(0, 4).join('; ') + (listed.length > 4 ? '…' : ''),
            symbol: g.symbol.json,
            values: g.values,
            order: g.at ?? legendIndex(legend, g.symbol, firsts) ?? 1000 + g.idx,
        };
    }).sort((a, b) => a.order - b.order);

    return done({
        type: 'uniqueValue',
        field1: first,
        ...(second === undefined ? {} : { field2: second }),
        ...(third === undefined ? {} : { field3: third }),
        fieldDelimiter: ',',
        uniqueValueGroups: [{ classes: classes.map(({ label, symbol, values: v }) => ({ label, symbol, values: v })) }],
        uniqueValueInfos: classes.flatMap(({ label, symbol, values: v }) => v.map((x) => ({ value: x.join(','), label, symbol }))),
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
