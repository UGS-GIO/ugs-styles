/**
 * Archetypes — the only render logic. `generate(spec)` turns a declarative spec into a MapLibre
 * GL fragment (StyleLayer[]). Add an archetype only when a real layer doesn't fit one of these.
 * See DESIGN.md §3.
 *
 *   simple       single-symbol, geometry-agnostic
 *   categorical  `match` a string field -> palette color (fill | line | circle)
 *   point        circle; categorical by field when palette+field given, else single color
 */
import type { StyleLayer, StyleSpec } from '../types';
import { PALETTES, type Palette } from '../palettes';
import { matchByField } from '../expressions/categorical';

export function generate(spec: StyleSpec): StyleLayer[] {
    switch (spec.archetype) {
        case 'categorical': return categorical(spec);
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
