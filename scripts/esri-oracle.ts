/**
 * Differential oracle: does the derived Esri renderer draw each feature the way the GL style does?
 *
 * For every vector render with a renderer in dist-json/esri, reads the styled columns of the live
 * GeoParquet and compares, per distinct attribute tuple and per zoom:
 *   GL    MapLibre's evaluator, with layer zoom ranges, filters, every paint prop, `{field}` tokens.
 *   Esri  the published JSON resolved the way Map Viewer does: uniqueValue (fields + delimiter, or an
 *         Arcade valueExpression), defaultSymbol, classBreaks, min/maxScale, sizeInfo, labelingInfo.
 * Probes values the build never saw (case variants, blanks, nulls, new codes, thresholds), and runs
 * a synthetic edge-case suite through toRenderer. Exits 1 on any live mismatch, or on a probe or
 * edge-case result that differs from the KNOWN lists below.
 *
 *   npm run oracle                     # after build:json, gen:sprites, build:esri
 *   npm run oracle -- hazards_qfaults  # only item ids containing this
 */
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { asyncBufferFromFile, asyncBufferFromUrl, parquetMetadataAsync, parquetReadObjects } from 'hyparquet';
import { compressors } from 'hyparquet-compressors';
import { loadImage, createCanvas } from '@napi-rs/canvas';
import {
    featureFilter, latest, normalizePropertyExpression,
    type Feature, type FilterSpecification, type PropertyValueSpecification, type StylePropertySpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { toRenderer, type Geometry, type Legend } from '../src/esri';
import type { GLLayer } from '../src/layers';
import { withRetries } from './geoparquet';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist-json');
const BASE = (process.env.GEOPARQUET_BASE ?? 'https://maps-assets.geology.utah.gov/warehouse').replace(/\/+$/, '');
const ZOOMS = [4, 6, 8, 10, 11.5, 12, 14, 16];
const PT = 0.75;
const zoomToScale = (z: number) => 295828763.7957775 / 2 ** z;

type V = string | number | boolean | null;
type Props = Record<string, V>;
type Rgba = number[];
type Obj = Record<string, unknown>;

// Probe/edge mismatches the converter cannot fix yet; anything else fails the run.
const KNOWN_PROBES: Record<string, string[]> = {
    // Case-folded lookup with a raw fallback: needs the whole GL expression as Arcade.
    'enmin_ucrc_basins/default': ['stroke color', 'label'],
    // An unseen hgm_class draws by landform in GL; Esri has one default symbol.
    'wetlands_llww_descriptions/default': ['fill color'],
};
const KNOWN_EDGE: Record<string, string> = {
    'two circles stacked (halo)': 'points draw only the top circle or icon',
    'circle + circle stacked': 'points draw only the top circle or icon',
    'fill-pattern only': 'no fill-pattern support',
    'line-gap-width casing': 'no line-gap-width support',
    'interpolate color ramp on field (>50 values)': 'classBreaks finds no cuts in interpolate',
    'match on numeric codes (>50 values)': 'classBreaks finds no cuts in match',
    '== threshold inside class break': 'classBreaks has no single-value class',
    'label with number-format (untranslatable)': 'no Arcade form for number-format',
};

// ── narrowing ───────────────────────────────────────────────────────────────
const isList = (x: unknown): x is unknown[] => Array.isArray(x);
const isObj = (x: unknown): x is Obj => typeof x === 'object' && x !== null && !Array.isArray(x);
const isNum = (x: unknown): x is number => typeof x === 'number';
const nums = (x: unknown): number[] | null => (isList(x) && x.every(isNum) ? x : null);
const get = (x: unknown, k: string): unknown => (isObj(x) ? x[k] : undefined);
const numOr = (x: unknown, d: number) => (isNum(x) ? x : d);
const objs = (x: unknown): Obj[] => (isList(x) ? x.filter(isObj) : []);
const isSpec = (x: unknown): x is StylePropertySpecification => typeof get(x, 'type') === 'string';
const isValue = (x: unknown): x is PropertyValueSpecification<unknown> => x !== undefined;
const isFilter = (x: unknown): x is FilterSpecification => isList(x) || typeof x === 'boolean';
const cell = (v: unknown): V => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' ? v
    : typeof v === 'bigint' ? Number(v) : v == null ? null : JSON.stringify(v);

// ── GL side ─────────────────────────────────────────────────────────────────
const code = { point: 1, line: 2, polygon: 3 } as const;
const feature = (props: Props, g: Geometry): Feature => ({ type: code[g], properties: props });

function ev(l: GLLayer, prop: string, props: Props, g: Geometry, z: number): unknown {
    for (const b of ['paint', 'layout'] as const) {
        const spec = get(get(latest, `${b}_${l.type ?? ''}`), prop);
        if (!isSpec(spec)) continue;
        const raw = l[b]?.[prop] ?? get(spec, 'default');
        if (!isValue(raw)) return undefined;
        const out: unknown = normalizePropertyExpression(raw, spec).evaluate({ zoom: z }, feature(props, g));
        return out;
    }
    return undefined;
}
const rgba = (c: unknown, op: unknown = 1): Rgba | null => {
    const r = nums(get(c, 'rgb'));
    if (!r || r.length !== 4) return null;
    return [...r.slice(0, 3).map((v) => Math.round(v * 255)), Math.round((r[3] ?? 1) * numOr(op, 1) * 255)];
};
const visible = (c: Rgba | null): c is Rgba => !!c && (c[3] ?? 0) > 0;

type Draw = { kind: 'fill' | 'stroke' | 'circle' | 'icon'; color?: Rgba; width?: number; dash?: number[] | null;
    offset?: number; radius?: number; sw?: number; sc?: Rgba; icon?: string };

function inRange(l: GLLayer, props: Props, g: Geometry, z: number): boolean {
    if (l.minzoom !== undefined && z < l.minzoom) return false;
    if (l.maxzoom !== undefined && z >= l.maxzoom) return false;
    return !isFilter(l.filter) || featureFilter(l.filter).filter({ zoom: z }, feature(props, g));
}

function glDraw(layers: GLLayer[], props: Props, g: Geometry, z: number): Draw[] {
    const out: Draw[] = [];
    for (const l of [...layers].reverse()) {   // topmost first
        if (!inRange(l, props, g, z)) continue;
        const p = (k: string) => ev(l, k, props, g, z);
        if (l.type === 'fill' && g === 'polygon') {
            if (l.paint?.['fill-pattern'] != null) out.push({ kind: 'fill', icon: 'pattern' });
            const op = p('fill-opacity');
            const o = l.paint?.['fill-outline-color'] == null ? null : rgba(p('fill-outline-color'), op);
            if (visible(o)) out.push({ kind: 'stroke', color: o, width: 1, dash: null, offset: 0 });
            const c = rgba(p('fill-color'), op);
            if (visible(c) && l.paint?.['fill-pattern'] == null) out.push({ kind: 'fill', color: c });
        } else if (l.type === 'line' && g !== 'point') {
            const c = rgba(p('line-color'), p('line-opacity'));
            const w = numOr(p('line-width'), 1);
            if (!visible(c) || w <= 0) continue;
            const d = l.paint?.['line-dasharray'] == null ? null : p('line-dasharray');
            const dash = nums(d) ?? nums(get(d, 'from'));
            out.push({ kind: 'stroke', color: c, width: w, dash: dash ? dash.map((x) => x * w) : null, offset: numOr(p('line-offset'), 0) });
            if (numOr(p('line-gap-width'), 0) > 0) out.push({ kind: 'stroke', icon: 'gap' });
        } else if (l.type === 'circle' && g === 'point') {
            const c = rgba(p('circle-color'), p('circle-opacity'));
            const sw = numOr(p('circle-stroke-width'), 0);
            const sc = rgba(p('circle-stroke-color'), p('circle-stroke-opacity'));
            const stroked = sw > 0 && visible(sc);
            if (!visible(c) && !stroked) continue;
            out.push({ kind: 'circle', color: visible(c) ? c : [0, 0, 0, 0], radius: numOr(p('circle-radius'), 5),
                sw: stroked ? sw : 0, sc: stroked ? sc : [0, 0, 0, 0] });
        } else if (l.type === 'symbol' && l.layout?.['icon-image'] != null && g === 'point') {
            const im = p('icon-image');
            const name = typeof im === 'string' ? im : get(im, 'name');
            if (typeof name === 'string' && name) out.push({ kind: 'icon', icon: name, radius: numOr(p('icon-size'), 1) });
        }
    }
    return out;
}

function glLabels(layers: GLLayer[], props: Props, g: Geometry, z: number): string[] {
    const out: string[] = [];
    for (const l of layers) {
        if (l.type !== 'symbol' || l.layout?.['text-field'] == null || !inRange(l, props, g, z)) continue;
        const t = ev(l, 'text-field', props, g, z);
        // maplibre-gl resolves legacy "{field}" tokens at render time, after the spec evaluator.
        const sections = objs(get(t, 'sections')).map((x) => (typeof x.text === 'string' ? x.text : ''));
        const text = (typeof t === 'string' || isNum(t) ? String(t) : sections.join('')).replace(/{([^{}]+)}/g, (_, k: string) => String(props[k] ?? ''));
        if (text.trim()) out.push(`${text}${JSON.stringify(rgba(ev(l, 'text-color', props, g, z), ev(l, 'text-opacity', props, g, z)))}`);
    }
    return out.sort();
}

// ── Arcade: the subset the converter writes ─────────────────────────────────
type Ctx = { props: Props; scale: number };
type Ast = { k: 'lit'; v: V } | { k: 'feat'; f: string } | { k: 'scale' }
    | { k: 'call'; f: string; a: Ast[] } | { k: 'bin'; op: string; l: Ast; r: Ast } | { k: 'not'; e: Ast };

function parseArcade(src: string): Ast {
    const toks = src.match(/"(?:\\.|[^"\\])*"|'(?:[^'])*'|\$feature\.\w+|\$feature\[("(?:\\.|[^"\\])*")\]|\$view\.scale|-?\d+(?:\.\d+)?(?:e[-+]?\d+)?|&&|\|\||==|!=|>=|<=|[A-Za-z_]\w*|[(),+<>!]/g) ?? [];
    let i = 0;
    const peek = () => toks[i];
    const take = (t?: string) => {
        const x = toks[i++];
        if (x === undefined || (t !== undefined && x !== t)) throw new Error(`arcade: expected ${t ?? 'token'} at ${String(x)} in ${src}`);
        return x;
    };
    const prim = (): Ast => {
        const t = take();
        if (t === '(') { const e = expr(0); take(')'); return e; }
        if (t === '!') return { k: 'not', e: prim() };
        if (t.startsWith('"')) return { k: 'lit', v: String(JSON.parse(t)) };
        if (t.startsWith("'")) return { k: 'lit', v: t.slice(1, -1) };
        if (t === '$view.scale') return { k: 'scale' };
        if (t.startsWith('$feature.')) return { k: 'feat', f: t.slice(9) };
        if (t.startsWith('$feature[')) return { k: 'feat', f: String(JSON.parse(t.slice(9, -1))) };
        if (t === 'null') return { k: 'lit', v: null };
        if (t === 'true' || t === 'false') return { k: 'lit', v: t === 'true' };
        if (/^-?\d/.test(t)) return { k: 'lit', v: Number(t) };
        take('(');
        const a: Ast[] = [];
        while (peek() !== ')') { a.push(expr(0)); if (peek() === ',') take(','); }
        take(')');
        return { k: 'call', f: t, a };
    };
    const PREC: Record<string, number> = { '||': 1, '&&': 2, '==': 3, '!=': 3, '>': 4, '<': 4, '>=': 4, '<=': 4, '+': 5 };
    const expr = (min: number): Ast => {
        let l = prim();
        for (let op = peek(); op !== undefined && (PREC[op] ?? 0) > min; op = peek()) {
            take();
            l = { k: 'bin', op, l, r: expr(PREC[op] ?? 0) };
        }
        return l;
    };
    const out = expr(0);
    if (i !== toks.length) throw new Error(`arcade: trailing ${toks.slice(i).join(' ')} in ${src}`);
    return out;
}

// Assumed Arcade semantics (verify in Map Viewer): Text(null) = '', null + 'x' = 'x', '' == null is false.
function runArcade(e: Ast, c: Ctx): V {
    const empty = (v: V) => v === null || v === '';
    switch (e.k) {
        case 'lit': return e.v;
        case 'feat': return c.props[e.f] ?? null;
        case 'scale': return c.scale;
        case 'not': return !runArcade(e.e, c);
        case 'bin': {
            const [a, b] = [runArcade(e.l, c), runArcade(e.r, c)];
            switch (e.op) {
                case '+': return typeof a === 'string' || typeof b === 'string' ? `${a ?? ''}${b ?? ''}` : Number(a) + Number(b);
                case '==': return a === b;
                case '!=': return a !== b;
                case '>': return Number(a) > Number(b);
                case '<': return Number(a) < Number(b);
                case '>=': return Number(a) >= Number(b);
                case '<=': return Number(a) <= Number(b);
                case '&&': return Boolean(a) && Boolean(b);
                default: return Boolean(a) || Boolean(b);
            }
        }
        case 'call': {
            const a = e.a.map((x) => runArcade(x, c));
            const [x, y] = a;
            switch (e.f) {
                case 'DefaultValue': return empty(x ?? null) ? y ?? null : x ?? null;
                case 'IsEmpty': return empty(x ?? null);
                case 'Text': return x == null ? '' : String(x);
                case 'Lower': return x == null ? '' : String(x).toLowerCase();
                case 'Upper': return x == null ? '' : String(x).toUpperCase();
                case 'IIf': return x ? y ?? null : a[2] ?? null;
                case 'When': {
                    for (let k = 0; k + 1 < a.length; k += 2) if (a[k]) return a[k + 1] ?? null;
                    return a.at(-1) ?? null;
                }
                case 'Decode': {
                    for (let k = 1; k + 1 < a.length; k += 2) if (a[k] === x) return a[k + 1] ?? null;
                    return a.length % 2 === 0 ? a.at(-1) ?? null : null;
                }
                default: throw new Error(`arcade: no function ${e.f}`);
            }
        }
    }
}
const arcadeCache = new Map<string, Ast>();
const arcade = (src: string, c: Ctx): V => {
    const ast = arcadeCache.get(src) ?? parseArcade(src);
    arcadeCache.set(src, ast);
    return runArcade(ast, c);
};

// Where clauses: the forms whereFor writes.
function splitTop(s: string, sep: string): string[] {
    const out: string[] = [];
    let [depth, q, last] = [0, false, 0];
    for (let k = 0; k < s.length; k++) {
        const ch = s[k];
        if (ch === "'") q = !q;
        else if (!q && ch === '(') depth++;
        else if (!q && ch === ')') depth--;
        else if (!q && depth === 0 && s.startsWith(sep, k)) { out.push(s.slice(last, k)); last = k + sep.length; }
    }
    out.push(s.slice(last));
    return out.map((x) => x.trim());
}
const sqlLit = (l: string): V => (l.startsWith("'") ? l.slice(1, -1).replace(/''/g, "'") : Number(l));
function sqlMatch(where: string, props: Props): boolean {
    return splitTop(where, ' OR ').some((clause) => {
        const c = clause.startsWith('(') && clause.endsWith(')') ? clause.slice(1, -1) : clause;
        const inm = /^(\w+) IN \((.*)\)$/.exec(c);
        if (inm) return (inm[2]?.match(/'(?:[^']|'')*'|[-\d.e]+/g) ?? []).some((l) => sqlLit(l) === props[inm[1] ?? '']);
        return splitTop(c, ' AND ').every((t) => {
            const nul = /^(\w+) IS NULL$/.exec(t);
            if (nul) return props[nul[1] ?? ''] == null;
            const eq = /^(\w+) = (.*)$/.exec(t);
            if (!eq) throw new Error(`sql: ${t}`);
            return sqlLit(eq[2] ?? '') === props[eq[1] ?? ''];
        });
    });
}

// ── Esri side ───────────────────────────────────────────────────────────────
function esriDraw(sym: unknown, iconNames: Map<string, string>): Draw[] {
    if (get(sym, 'type') === 'esriSMS') {
        const sc = nums(get(get(sym, 'outline'), 'color')) ?? [0, 0, 0, 0];
        const sw = numOr(get(get(sym, 'outline'), 'width'), 0) / PT;
        const off = sc[3] === 0 || !sw;
        return [{ kind: 'circle', color: nums(get(sym, 'color')) ?? [0, 0, 0, 0], radius: numOr(get(sym, 'size'), 0) / 2 / PT,
            sw: off ? 0 : sw, sc: off ? [0, 0, 0, 0] : sc }];
    }
    if (get(sym, 'type') === 'esriPMS') {
        const data = get(sym, 'imageData');
        return [{ kind: 'icon', icon: iconNames.get(typeof data === 'string' ? data : '') ?? '?' }];
    }
    if (get(sym, 'type') !== 'CIMSymbolReference') return [];
    return objs(get(get(sym, 'symbol'), 'symbolLayers')).map((L): Draw => {
        if (L.type === 'CIMSolidFill') return { kind: 'fill', color: nums(L.color) ?? [] };
        const fx = objs(L.effects);
        const dash = nums(fx.find((e) => e.type === 'CIMGeometricEffectDashes')?.dashTemplate);
        const off = numOr(fx.find((e) => e.type === 'CIMGeometricEffectOffset')?.offset, 0);
        return { kind: 'stroke', color: nums(L.color) ?? [], width: numOr(L.width, 0) / PT,
            dash: dash ? dash.map((d) => d / PT) : null, offset: off ? -off / PT : 0 };
    });
}

const outOfScale = (o: unknown, scale: number) => {
    const [min, max] = [numOr(get(o, 'minScale'), 0), numOr(get(o, 'maxScale'), 0)];
    return (min > 0 && scale > min * (1 + 1e-9)) || (max > 0 && scale <= max * (1 + 1e-9));
};

function esriSymbol(doc: Obj, props: Props, z: number): unknown {
    const scale = zoomToScale(z);
    if (outOfScale(doc, scale)) return null;
    const r = doc.renderer;
    const type = get(r, 'type');
    if (type === 'simple') return get(r, 'symbol');
    if (type === 'uniqueValue') {
        const ve = get(r, 'valueExpression');
        let key: string;
        if (typeof ve === 'string') {
            const v = arcade(ve, { props, scale });
            key = v === null ? '<Null>' : String(v);
        } else {
            const fs = [get(r, 'field1'), get(r, 'field2'), get(r, 'field3')].filter((f): f is string => typeof f === 'string');
            const delim = get(r, 'fieldDelimiter');
            key = fs.map((f) => { const v = props[f] ?? null; return v === null ? '<Null>' : String(v); })
                .join(typeof delim === 'string' ? delim : ',');
        }
        const hit = objs(get(r, 'uniqueValueInfos')).find((i) => i.value === key);
        return hit ? hit.symbol : get(r, 'defaultSymbol');
    }
    if (type === 'classBreaks') {
        const f = get(r, 'field');
        const v = typeof f === 'string' ? props[f] : null;
        if (!isNum(v)) return get(r, 'defaultSymbol');
        const hit = objs(get(r, 'classBreakInfos')).find((c, i) => (i === 0 ? v >= numOr(get(r, 'minValue'), -Infinity)
            : v > numOr(c.classMinValue, -Infinity)) && v <= numOr(c.classMaxValue, Infinity));
        return hit ? hit.symbol : get(r, 'defaultSymbol');
    }
    throw new Error(`renderer type ${String(type)} not resolvable`);
}

// Esri interpolates size stops linearly in scale and clamps outside them.
function sizeAt(stops: Obj[], x: number): number | null {
    const s = stops.map((o) => ({ v: numOr(o.value, NaN), size: numOr(o.size, NaN) }));
    const [first, last] = [s[0], s.at(-1)];
    if (!first || !last || Number.isNaN(x)) return null;
    if (x <= first.v) return first.size;
    if (x >= last.v) return last.size;
    for (let i = 0; i + 1 < s.length; i++) {
        const [a, b] = [s[i], s[i + 1]];
        if (a && b && x >= a.v && x <= b.v) return a.size + (b.size - a.size) * (x - a.v) / (b.v - a.v);
    }
    return null;
}

function esriResolve(doc: Obj, props: Props, z: number, iconNames: Map<string, string>): Draw[] {
    const d = esriDraw(esriSymbol(doc, props, z), iconNames);
    for (const vv of objs(get(doc.renderer, 'visualVariables')).filter((v) => v.type === 'sizeInfo')) {
        const f = vv.field;
        const x = vv.valueExpression === '$view.scale' ? zoomToScale(z) : typeof f === 'string' ? Number(props[f]) : NaN;
        const size = sizeAt(objs(vv.stops), x);
        if (size === null) continue;
        for (const it of d) if (it.kind === 'circle') it.radius = size / 2 / PT;
    }
    return d;
}

function esriLabels(doc: Obj, props: Props, z: number): string[] {
    const scale = zoomToScale(z);
    if (outOfScale(doc, scale)) return [];
    const out: string[] = [];
    for (const li of objs(doc.labelingInfo)) {
        if (outOfScale(li, scale)) continue;
        if (typeof li.where === 'string' && !sqlMatch(li.where, props)) continue;
        const src = get(li.labelExpressionInfo, 'expression');
        const v = typeof src === 'string' ? arcade(src, { props, scale }) : null;
        const text = v === null ? '' : String(v);
        if (text.trim()) out.push(`${text}${JSON.stringify(nums(get(li.symbol, 'color')))}`);
    }
    return out.sort();
}

// ── compare ─────────────────────────────────────────────────────────────────
const near = (a = 0, b = 0, t = 0.02) => Math.abs(a - b) <= t;
const sameColor = (a: Rgba = [], b: Rgba = []) => a.length === b.length && a.every((x, k) => Math.abs(x - (b[k] ?? NaN)) <= 1);
const round = (xs: number[] | null | undefined, min = 0) => JSON.stringify(xs?.map((n) => +Math.max(n, min).toFixed(1)) ?? null);
const fmt = (d: Draw[]) => d.map((x) => {
    if (x.kind === 'fill') return x.icon ? 'fill-pattern' : `fill${JSON.stringify(x.color)}`;
    if (x.kind === 'stroke') return x.icon ? 'gap-width' : `stroke${JSON.stringify(x.color)}w${+(x.width ?? 0).toFixed(2)}${x.dash ? ` dash${round(x.dash)}` : ''}${x.offset ? ` off${x.offset}` : ''}`;
    if (x.kind === 'circle') return `circle${JSON.stringify(x.color)}r${+(x.radius ?? 0).toFixed(2)} stroke${x.sw ?? 0}${JSON.stringify(x.sc)}`;
    return `icon:${x.icon ?? ''}`;
}).join(' | ') || 'nothing';

function diff(gl: Draw[], es: Draw[]): string | null {
    if (!gl.length && !es.length) return null;
    if (!es.length) return 'hidden in Esri';
    if (!gl.length) return 'drawn in Esri, not GL';
    if (gl.length !== es.length) return 'symbol layer count';
    for (const [k, a] of gl.entries()) {
        const b = es[k];
        if (!b || a.kind !== b.kind || a.icon !== b.icon && a.kind !== 'icon') return 'symbol kind';
        if (a.kind === 'icon') { if (a.icon !== b.icon) return 'icon'; continue; }
        if (!sameColor(a.color, b.color)) return `${a.kind} color`;
        // A zoom ramp is drawn at its bucket's middle (half zooms): up to a quarter zoom of slope off.
        if (a.kind === 'stroke' && !near(a.width, b.width, 0.15)) return 'stroke width';
        if (a.kind === 'stroke' && round(a.dash) !== round(b.dash, 0.1 / PT)) return 'dash';
        if (a.kind === 'stroke' && !near(a.offset, b.offset)) return 'offset';
        if (a.kind === 'circle' && (!near(a.radius, b.radius, 0.05) || !near(a.sw, b.sw) || !sameColor(a.sc, b.sc))) return 'circle size/stroke';
    }
    return null;
}

type Tally = Map<string, { n: number; ex: string[] }>;
function record(t: Tally, cat: string, n: number, ex: string) {
    const m = t.get(cat) ?? { n: 0, ex: [] };
    m.n += n;
    if (m.ex.length < 2) m.ex.push(ex);
    t.set(cat, m);
}
function compare(t: Tally, layers: GLLayer[], doc: Obj, g: Geometry, props: Props, n: number, icons: Map<string, string>, tag = '') {
    const seen = new Set<string>();
    for (const z of ZOOMS) {
        const [gl, es] = [glDraw(layers, props, g, z), esriResolve(doc, props, z, icons)];
        const d = diff(gl, es);
        const cat = d && `${tag}${d}`;
        if (cat && !seen.has(cat)) {
            seen.add(cat);
            record(t, cat, n, `z${z} ${JSON.stringify(props)}\n        GL:   ${fmt(gl)}\n        Esri: ${fmt(es)}`);
        }
        const [gll, esl] = [glLabels(layers, props, g, z).join(' / '), esriLabels(doc, props, z).join(' / ')];
        if (gll !== esl && !seen.has(`${tag}label`)) {
            seen.add(`${tag}label`);
            record(t, `${tag}label`, n, `z${z} ${JSON.stringify(props)} GL=${JSON.stringify(gll)} Esri=${JSON.stringify(esl)}`);
        }
    }
}

// ── live data ───────────────────────────────────────────────────────────────
function refs(layers: GLLayer[]): string[] {
    const out = new Set<string>();
    const LEGACY = ['==', '!=', 'in', '!in', '<', '<=', '>', '>=', 'has', '!has'];
    const walk = (n: unknown): void => {
        if (typeof n === 'string') { for (const m of n.matchAll(/\{([^}]+)\}/g)) if (m[1]) out.add(m[1]); return; }
        if (isObj(n)) { Object.values(n).forEach(walk); return; }
        if (!isList(n)) return;
        const [op, arg] = n;
        if ((op === 'get' || op === 'has') && typeof arg === 'string') out.add(arg);
        if (typeof op === 'string' && LEGACY.includes(op) && typeof arg === 'string' && !arg.startsWith('$') && n.slice(1).every((x) => !isList(x))) out.add(arg);
        n.forEach(walk);
    };
    for (const l of layers) { walk(l.filter); walk(l.paint); walk(l.layout); }
    return [...out];
}

// Values the build never saw: case variants, blanks, null, a new code, numbers on every literal.
function probes(layers: GLLayer[], fields: string[], tuples: Props[]): Props[] {
    const out: Props[] = [];
    const base = tuples[0] ?? {};
    const lits = new Set<number>();
    const walk = (n: unknown): void => { if (isList(n)) n.forEach((x) => (isNum(x) ? lits.add(x) : walk(x))); };
    for (const l of layers) { walk(l.filter); walk(l.paint); }
    for (const f of fields) {
        const vals = [...new Set(tuples.map((t) => t[f] ?? null))];
        const strs = vals.filter((v): v is string => typeof v === 'string').slice(0, 30);
        const cand: V[] = vals.some(isNum) ? [null, ...[...lits].flatMap((x) => [x, x - 1e-9, x + 1e-9])]
            : [null, '', 'zz-new-value', ...strs.flatMap((s) => [s.toUpperCase(), s.toLowerCase()])];
        for (const c of new Set(cand)) if (!vals.includes(c)) out.push({ ...base, [f]: c });
    }
    return out;
}

const GEOM: Record<string, Geometry> = { Point: 'point', MultiPoint: 'point', LineString: 'line', MultiLineString: 'line', Polygon: 'polygon', MultiPolygon: 'polygon' };

async function iconNamesFor(sprite: string | undefined): Promise<Map<string, string>> {
    const out = new Map<string, string>();
    if (!sprite) return out;
    const index: unknown = JSON.parse(await readFile(resolve(OUT, `${sprite}.json`), 'utf8'));
    const sheet = await loadImage(await readFile(resolve(OUT, `${sprite}.png`)));
    for (const [name, i] of Object.entries(isObj(index) ? index : {})) {
        const [x, y, w, h] = ['x', 'y', 'width', 'height'].map((k) => numOr(get(i, k), 0));
        const c = createCanvas(w ?? 0, h ?? 0);
        c.getContext('2d').drawImage(sheet, x ?? 0, y ?? 0, w ?? 0, h ?? 0, 0, 0, w ?? 0, h ?? 0);
        out.set(c.toBuffer('image/png').toString('base64'), name);
    }
    return out;
}

async function live(filter: string): Promise<{ live: number; failures: string[] }> {
    type Entry = { itemId: string; render: string; kind: string; path: string; esri?: string; sprite?: string; esriSource?: string };
    const idx: Entry[] = JSON.parse(await readFile(resolve(OUT, 'index.json'), 'utf8'));
    const failures: string[] = [];
    let mismatches = 0;
    for (const e of idx) {
        if (e.kind !== 'vector' || !e.esri || !e.itemId.includes(filter)) continue;
        const name = `${e.itemId}/${e.render}`;
        if (e.esriSource === 'module') { console.log(`=== ${name}: hand-written renderer, skipped`); continue; }
        const layers: GLLayer[] = JSON.parse(await readFile(resolve(OUT, e.path), 'utf8')).layers;
        const doc: unknown = JSON.parse(await readFile(resolve(OUT, e.esri), 'utf8'));
        if (!isObj(doc)) continue;
        const fields = refs(layers);
        const src = `${BASE}/geoparquet/${e.itemId}/${e.itemId}.parquet`;
        const file = await withRetries(() => src.startsWith('http') ? asyncBufferFromUrl({ url: src }) : asyncBufferFromFile(src));
        const meta = await parquetMetadataAsync(file);
        const geo: unknown = JSON.parse(meta.key_value_metadata?.find((m) => m.key === 'geo')?.value ?? '{}');
        const primary = get(geo, 'primary_column');
        const types = get(get(get(geo, 'columns'), typeof primary === 'string' ? primary : ''), 'geometry_types');
        const gt = isList(types) && typeof types[0] === 'string' ? types[0].replace(/ Z$/, '') : '';
        const g: Geometry = GEOM[gt] ?? (layers.some((l) => l.type === 'fill') ? 'polygon' : layers.some((l) => l.type === 'circle') ? 'point' : 'line');
        const cols = new Set(meta.schema.map((s) => s.name));
        const present = fields.filter((f) => cols.has(f));
        const raw: Obj[] = present.length ? await parquetReadObjects({ file, columns: present, compressors }) : [{}];
        const weight = present.length ? 1 : Number(meta.num_rows);
        const counts = new Map<string, { t: Props; n: number }>();
        for (const r of raw) {
            const t: Props = Object.fromEntries(fields.map((f) => [f, cell(r[f])]));
            const k = JSON.stringify(t);
            const c = counts.get(k) ?? { t, n: 0 };
            c.n += weight;
            counts.set(k, c);
        }
        const icons = await iconNamesFor(e.sprite);
        const t: Tally = new Map();
        let features = 0;
        for (const { t: props, n } of counts.values()) { features += n; compare(t, layers, doc, g, props, n, icons); }
        for (const p of probes(layers, fields, [...counts.values()].map((c) => c.t))) compare(t, layers, doc, g, p, 1, icons, 'probe: ');
        const bad = [...t.entries()];
        const liveBad = bad.filter(([k]) => !k.startsWith('probe'));
        mismatches += liveBad.reduce((a, [, m]) => a + m.n, 0);
        const missing = fields.filter((f) => !cols.has(f));
        console.log(`=== ${name} [${g}, ${String(get(doc.renderer, 'type'))}] features=${features} tuples=${counts.size}${missing.length ? ` missing-columns=${missing.join(',')}` : ''}`);
        for (const [cat, m] of bad) {
            console.log(`  [${cat}] ${m.n}\n      ${m.ex.join('\n      ')}`);
            const known = KNOWN_PROBES[name]?.includes(cat.replace(/^probe: /, ''));
            if (!cat.startsWith('probe') || !known) failures.push(`${name}: ${cat} (${m.n})`);
        }
    }
    return { live: mismatches, failures };
}

// ── synthetic edge cases ────────────────────────────────────────────────────
type Case = { name: string; g: Geometry; layers: GLLayer[]; rows: Props[]; probes?: Props[]; legend?: Legend };
const fill = (paint: Obj, extra: GLLayer = {}): GLLayer => ({ id: 'f', type: 'fill', paint, ...extra });
const dot: GLLayer = { id: 'c', type: 'circle', paint: { 'circle-color': '#f00' } };
const label = (field: unknown, extra: GLLayer = {}): GLLayer => ({ id: 't', type: 'symbol', layout: { 'text-field': field }, ...extra });
const range = (n: number, f: (i: number) => Props) => Array.from({ length: n }, (_, i) => f(i));
const downcased = ['downcase', ['coalesce', ['to-string', ['get', 'k']], '']];

async function edgeCases(): Promise<Case[]> {
    const cases: Case[] = [
        { name: 'filter != hides a value under a default symbol', g: 'polygon',
            layers: [fill({ 'fill-color': '#f00' }, { filter: ['!=', ['get', 'k'], 'X'] })], rows: [{ k: 'A' }, { k: 'B' }, { k: 'X' }] },
        { name: 'match to transparent for a listed value', g: 'polygon',
            layers: [fill({ 'fill-color': ['match', ['get', 'k'], 'X', 'rgba(0,0,0,0)', '#0f0'] })], rows: [{ k: 'A' }, { k: 'X' }] },
        { name: 'interpolate color ramp on field (>50 values)', g: 'polygon',
            layers: [fill({ 'fill-color': ['interpolate', ['linear'], ['get', 'v'], 0, '#000', 100, '#fff'] })], rows: range(101, (i) => ({ v: i })) },
        { name: 'match on numeric codes (>50 values)', g: 'polygon',
            layers: [fill({ 'fill-color': ['match', ['get', 'v'], [1, 3, 5], '#f00', '#00f'] })], rows: range(60, (i) => ({ v: i })) },
        { name: '== threshold inside class break', g: 'polygon',
            layers: [fill({ 'fill-color': ['case', ['==', ['get', 'v'], 5], '#f00', ['<', ['get', 'v'], 10], '#0f0', '#00f'] })],
            rows: range(60, (i) => ({ v: i * 0.5 })) },
        { name: 'class breaks with nulls', g: 'polygon',
            layers: [fill({ 'fill-color': ['case', ['<', ['coalesce', ['get', 'v'], -1], 0], '#888', ['<', ['get', 'v'], 10], '#0f0', '#00f'] })],
            rows: [...range(60, (i) => ({ v: i * 0.5 })), { v: null }] },
        { name: 'comma inside a value with 2 class fields', g: 'polygon',
            layers: [fill({ 'fill-color': ['case', ['all', ['==', ['get', 'a'], 'x,y'], ['==', ['get', 'b'], 'z']], '#f00',
                ['all', ['==', ['get', 'a'], 'x'], ['==', ['get', 'b'], 'y,z']], '#0f0', '#00f'] })],
            rows: [{ a: 'x,y', b: 'z' }, { a: 'x', b: 'y,z' }, { a: 'q', b: 'q' }] },
        { name: 'four class fields', g: 'polygon',
            layers: [fill({ 'fill-color': ['case', ['all', ['==', ['get', 'a'], 1], ['==', ['get', 'b'], 1], ['==', ['get', 'c'], 1], ['==', ['get', 'd'], 1]], '#f00', '#00f'] })],
            rows: [{ a: 1, b: 1, c: 1, d: 1 }, { a: 1, b: 1, c: 1, d: 2 }] },
        { name: 'case-insensitive match, unseen case variant', g: 'polygon',
            layers: [fill({ 'fill-color': ['match', downcased, 'a', '#f00', '#00f'] })],
            rows: [{ k: 'A' }, { k: 'b' }], probes: [{ k: 'a' }, { k: 'B' }, { k: null }, { k: 'new' }] },
        { name: 'null and blank drawn alike', g: 'polygon',
            layers: [fill({ 'fill-color': ['match', ['coalesce', ['get', 'k'], ''], '', '#888', 'a', '#f00', '#00f'] })],
            rows: [{ k: 'a' }, { k: null }], probes: [{ k: '' }] },
        { name: 'legend value missing from data', g: 'polygon',
            layers: [fill({ 'fill-color': ['match', ['get', 'k'], 'a', '#f00', 'b', '#0f0', '#00f'] })],
            rows: [{ k: 'a' }], probes: [{ k: 'b' }],
            legend: [{ label: 'A', color: '#ff0000', values: [{ value: 'a' }] }, { label: 'B', color: '#00ff00', values: [{ value: 'b' }] }] },
        { name: 'layer zoom ranges (outline from z12, fill below z14)', g: 'polygon',
            layers: [fill({ 'fill-color': '#f00' }, { maxzoom: 14 }), { id: 'l', type: 'line', minzoom: 12, paint: { 'line-color': '#000', 'line-width': 2 } }],
            rows: [{}] },
        { name: 'layer zoom ranges per class', g: 'polygon',
            layers: [fill({ 'fill-color': ['match', ['get', 'k'], 'a', '#f00', '#00f'] }), { id: 'l', type: 'line', minzoom: 12, filter: ['==', ['get', 'k'], 'a'], paint: { 'line-color': '#000' } }],
            rows: [{ k: 'a' }, { k: 'b' }] },
        { name: 'zoom-stepped color, zoom-interpolated width', g: 'line',
            layers: [{ id: 'l', type: 'line', paint: { 'line-color': ['step', ['zoom'], '#f00', 12, '#00f'], 'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 16, 6] } }],
            rows: [{}] },
        { name: 'zoom filter', g: 'line',
            layers: [{ id: 'l', type: 'line', filter: ['>=', ['zoom'], 12], paint: { 'line-color': '#f00' } }], rows: [{}] },
        { name: 'zoom filter, operands reversed', g: 'line',
            layers: [{ id: 'l', type: 'line', filter: ['<=', 12, ['zoom']], paint: { 'line-color': '#f00' } }], rows: [{}] },
        { name: 'whole style above a minzoom', g: 'polygon', layers: [fill({ 'fill-color': '#f00' }, { minzoom: 11 })], rows: [{}] },
        { name: 'whole style below a maxzoom', g: 'polygon', layers: [fill({ 'fill-color': '#f00' }, { maxzoom: 12 })], rows: [{}] },
        { name: 'circle-radius step on zoom', g: 'point',
            layers: [{ id: 'c', type: 'circle', paint: { 'circle-color': '#f00', 'circle-radius': ['step', ['zoom'], 2, 12, 6] } }], rows: [{}] },
        { name: 'circle-radius interpolate on zoom', g: 'point',
            layers: [{ id: 'c', type: 'circle', paint: { 'circle-color': ['match', ['get', 'k'], 'a', '#f00', '#00f'], 'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 3, 7, 5.5, 10, 8, 13, 11, 16, 14] } }],
            rows: [{ k: 'a' }, { k: 'b' }] },
        { name: 'two circles stacked (halo)', g: 'point',
            layers: [{ id: 'h', type: 'circle', paint: { 'circle-color': '#fff', 'circle-radius': 8 } }, { id: 'c', type: 'circle', paint: { 'circle-color': '#f00', 'circle-radius': 4 } }],
            rows: [{}] },
        { name: 'circle + circle stacked', g: 'point',
            layers: [{ id: 'c', type: 'circle', paint: { 'circle-color': '#fff', 'circle-radius': 10 } }, { id: 'c2', type: 'circle', filter: ['==', ['get', 'k'], 'b'], paint: { 'circle-color': '#f00', 'circle-radius': 3 } }],
            rows: [{ k: 'a' }, { k: 'b' }] },
        { name: 'fill-pattern only', g: 'polygon', layers: [fill({ 'fill-pattern': 'hatch' })], rows: [{}] },
        { name: 'line-gap-width casing', g: 'line',
            layers: [{ id: 'l', type: 'line', paint: { 'line-color': '#f00', 'line-width': 1, 'line-gap-width': 4 } }], rows: [{}] },
        { name: 'label with geometry-type filter', g: 'polygon',
            layers: [fill({ 'fill-color': '#f00' }), label(['get', 'name'], { filter: ['==', ['geometry-type'], 'Point'] })], rows: [{ name: 'n' }] },
        { name: 'label coalesce with a blank', g: 'point',
            layers: [dot, label(['coalesce', ['get', 'a'], ['get', 'b']])], rows: [{ a: '', b: 'B' }, { a: null, b: 'B' }, { a: 'A', b: 'B' }] },
        { name: 'label concat with null', g: 'point', layers: [dot, label(['concat', ['get', 'a'], ' - ', ['get', 'b']])], rows: [{ a: null, b: 'B' }] },
        { name: 'label with number-format (untranslatable)', g: 'point',
            layers: [dot, label(['number-format', ['get', 'v'], { 'max-fraction-digits': 1 }])], rows: [{ v: 1.234 }] },
        { name: 'label below a maxzoom', g: 'point', layers: [dot, label(['get', 'a'], { maxzoom: 12 })], rows: [{ a: 'A' }] },
        { name: 'numbers stored as strings, numeric compare', g: 'polygon',
            layers: [fill({ 'fill-color': ['case', ['<', ['to-number', ['get', 'v']], 5], '#f00', '#00f'] })], rows: range(60, (i) => ({ v: String(i) })) },
    ];
    // Published styles whose GeoParquet is not live yet: dense synthetic values and every literal.
    for (const r of ['cumulative', 'velocity', 'yearly']) {
        const path = resolve(OUT, `styles/hazards_displacement_contours/${r}.json`);
        const layers: GLLayer[] = JSON.parse(await readFile(path, 'utf8').catch(() => '{"layers":[]}')).layers;
        if (!layers.length) continue;
        const lits = [...JSON.stringify(layers).matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
        const vals: V[] = [...range(3000, (i) => ({ v: -20 + i * 0.0133 })).map((p) => p.v ?? null), ...lits.flatMap((x) => [x, x - 1e-9, x + 1e-9]), null];
        cases.push({ name: `displacement_contours/${r} (synthetic)`, g: 'polygon', layers, rows: vals.map((v) => ({ value_inches: v })) });
    }
    return cases;
}

async function edge(): Promise<string[]> {
    const failures: string[] = [];
    console.log('\n=== edge cases');
    for (const c of await edgeCases()) {
        const out = toRenderer(c.layers, c.g, c.rows, c.legend);
        const doc: Obj = { renderer: out.renderer, labelingInfo: out.labelingInfo, minScale: out.minScale, maxScale: out.maxScale };
        const t: Tally = new Map();
        for (const r of c.rows) compare(t, c.layers, doc, c.g, r, 1, new Map());
        for (const r of c.probes ?? []) compare(t, c.layers, doc, c.g, r, 1, new Map(), 'probe: ');
        const known = KNOWN_EDGE[c.name];
        const status = t.size ? (known ? `known: ${known}` : 'FAIL') : known ? 'FIXED (drop from KNOWN_EDGE)' : 'ok';
        console.log(`- ${c.name} [${String(get(out.renderer, 'type'))}] ${status}${out.warnings.length ? ` (warns: ${out.warnings.join('; ')})` : ''}`);
        for (const [cat, m] of t) console.log(`    [${cat}] ${m.ex[0] ?? ''}`);
        if (status === 'FAIL' || status.startsWith('FIXED')) failures.push(`edge: ${c.name}`);
    }
    return failures;
}

const quiet = console.warn;
console.warn = () => undefined;   // the GL evaluator logs every type error it recovers from
const filter = process.argv[2] ?? '';
const result = await live(filter);
const failures = [...result.failures, ...(filter ? [] : await edge())];
console.warn = quiet;
console.log(`\nlive mismatched features: ${result.live}; failures: ${failures.length}${failures.map((f) => `\n  ${f}`).join('')}`);
if (failures.length) process.exit(1);
