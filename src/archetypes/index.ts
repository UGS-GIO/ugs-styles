/**
 * Archetypes — the only render logic. `generate(spec)` turns a declarative spec into a MapLibre
 * GL fragment (StyleLayer[]). Add an archetype only when a real layer doesn't fit one of these.
 * See DESIGN.md §3.
 *
 *   simple       single-symbol, geometry-agnostic
 *   categorical  `match` a string field -> palette color (fill | line | circle)
 *   graduated    ordered numeric classes -> sequential ramp, one filtered layer per class
 *   point        circle; categorical by field when palette+field given, else single color
 */
import type { ExpressionSpecification, FilterSpecification } from 'maplibre-gl';
import type { StyleLayer, StyleSpec } from '../types';
import { PALETTES, RAMPS, type Palette, type Ramp } from '../palettes';
import { matchByField } from '../expressions/categorical';

export function generate(spec: StyleSpec): StyleLayer[] {
    switch (spec.archetype) {
        case 'categorical': return categorical(spec);
        case 'graduated': return graduated(spec);
        case 'point': return point(spec);
        case 'simple': return simple(spec);
        default: {
            const bad: never = spec.archetype;
            throw new Error(`${spec.itemId}/${spec.render}: unknown archetype '${String(bad)}'`);
        }
    }
}

const palette = (spec: StyleSpec): Palette => {
    const p = spec.palette ? PALETTES[spec.palette] : undefined;
    if (!p) throw new Error(`${spec.itemId}/${spec.render}: unknown palette '${spec.palette}'`);
    return p;
};
const rampOf = (spec: StyleSpec): Ramp => {
    const r = spec.palette ? RAMPS[spec.palette] : undefined;
    if (!r?.length) throw new Error(`${spec.itemId}/${spec.render}: unknown ramp '${spec.palette}'`);
    return r;
};
const need = (spec: StyleSpec, k: 'field'): string => {
    const v = spec[k];
    if (!v) throw new Error(`${spec.itemId}/${spec.render}: archetype '${spec.archetype}' needs '${k}'`);
    return v;
};

function categorical(spec: StyleSpec): StyleLayer[] {
    const p = palette(spec);
    const field = need(spec, 'field');
    const color = matchByField(field, p.fill, p.other ?? '#BDBDBD');
    const geom = spec.geom ?? 'fill';
    if (geom === 'line') {
        return [{ id: `${spec.itemId}-line`, type: 'line', paint: { 'line-color': color, 'line-width': 1.2 } }];
    }
    if (geom === 'circle') {
        const stroke = matchByField(field, p.stroke ?? p.fill, p.other ?? '#858585');
        return [{ id: `${spec.itemId}-circle`, type: 'circle', paint: { 'circle-color': color, 'circle-radius': 4, 'circle-stroke-color': stroke, 'circle-stroke-width': 0.5 } }];
    }
    return [{ id: `${spec.itemId}-fill`, type: 'fill', paint: { 'fill-color': color, 'fill-opacity': 0.6, 'fill-outline-color': '#333333' } }];
}

/**
 * `graduated` — a numeric field's ordered classes painted from a sequential ramp.
 *
 * Emits **one filtered layer per class, ascending**, rather than a single layer carrying a `step`
 * color expression. Two reasons, both load-bearing:
 *
 *  1. Draw order. Quantitative hazard classes are routinely *nested* — a debris-flow runout
 *     extent at DSI > 0 wholly contains the DSI > 0.6 core. Inside one layer, MapLibre paints
 *     features in tile order, which we don't control, so the outer class can bury the inner one
 *     and the map silently loses its hot spot. Separate layers fix the order: low class first,
 *     high class on top.
 *  2. Legend. The warehouse derives `classification:classes` from this exact shape — one flat
 *     color plus a `filter` per class (warehouse core/styles.py, docs/STYLING.md).
 *
 * The class domain comes from whichever of these the field actually is:
 *   `values` — enumerated (the field holds a fixed set of numbers) -> `==` per class.
 *   `breaks` — continuous (ascending lower bounds) -> half-open `[b[i], b[i+1])` bins, last open.
 * Either way, one entry per ramp stop. Nested fills blend where they overlap, so `opacity`
 * defaults conservatively; pass 1 when classes are known to be mutually exclusive.
 */
function graduated(spec: StyleSpec): StyleLayer[] {
    const field = need(spec, 'field');
    const ramp = rampOf(spec);
    const { values, breaks } = spec;
    if ((values && breaks) || (!values && !breaks))
        throw new Error(`${spec.itemId}/${spec.render}: 'graduated' needs exactly one of 'values' | 'breaks'`);

    const domain = [...(values ?? breaks ?? [])].sort((a, b) => a - b);
    if (domain.length !== ramp.length)
        throw new Error(
            `${spec.itemId}/${spec.render}: ${values ? 'values' : 'breaks'} has ${domain.length} ` +
            `entr${domain.length === 1 ? 'y' : 'ies'} but ramp '${spec.palette}' has ${ramp.length} stops`,
        );

    const opacity = spec.opacity ?? 0.7;
    const geom = spec.geom ?? 'fill';
    // `has` guards the comparison: a feature missing the field yields null, and comparing null to
    // a number is an evaluation error rather than a quiet false.
    const at = (value: number, i: number): FilterSpecification => {
        const has: ExpressionSpecification = ['has', field];
        if (values) return ['all', has, ['==', ['get', field], value]];
        const lower: ExpressionSpecification = ['>=', ['get', field], value];
        const upper = domain[i + 1];   // undefined on the last class -> open-ended
        return upper === undefined
            ? ['all', has, lower]
            : ['all', has, lower, ['<', ['get', field], upper]];
    };

    return domain.map((value, i) => (geom === 'line'
        ? {
            id: `${spec.itemId}-c${i}`, type: 'line', filter: at(value, i),
            paint: { 'line-color': ramp[i], 'line-width': 1.2, 'line-opacity': opacity },
        }
        : {
            id: `${spec.itemId}-c${i}`, type: 'fill', filter: at(value, i),
            paint: { 'fill-color': ramp[i], 'fill-opacity': opacity },
        }));
}

function point(spec: StyleSpec): StyleLayer[] {
    const p = spec.palette ? palette(spec) : undefined;
    const color = p && spec.field ? matchByField(spec.field, p.fill, p.other ?? '#BDBDBD') : (spec.color ?? '#D1491C');
    const stroke = p && spec.field ? matchByField(spec.field, p.stroke ?? p.fill, p.other ?? '#858585') : '#444444';
    return [{ id: `${spec.itemId}-circle`, type: 'circle', paint: { 'circle-radius': 4, 'circle-color': color, 'circle-stroke-color': stroke, 'circle-stroke-width': 0.5 } }];
}

function simple(spec: StyleSpec): StyleLayer[] {
    const c = spec.color ?? '#888888';
    const geom = spec.geom ?? 'fill';
    if (geom === 'line') return [{ id: `${spec.itemId}-line`, type: 'line', paint: { 'line-color': c, 'line-width': 1.2 } }];
    if (geom === 'circle') return [{ id: `${spec.itemId}-circle`, type: 'circle', paint: { 'circle-color': c, 'circle-radius': 3 } }];
    return [{ id: `${spec.itemId}-fill`, type: 'fill', paint: { 'fill-color': c, 'fill-opacity': 0.4 } }];
}
