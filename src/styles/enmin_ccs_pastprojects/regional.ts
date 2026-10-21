/**
 * CCUS Past and Ongoing Projects — Regional layer.
 *
 * Polygons are styled as borders with no fill using distinct greens.
 * Handwritten: no archetype pairs an outline with an invisible fill that makes the inside clickable.
 * Each regional project has a distinct color border keyed by `namealias`.
 * The legend displays only regional project values.
 */
import type { FilterSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';
import { CCUS_REGIONAL_PROJECTS_FILL } from '../../palettes';

const FIELD = 'namealias';
const FALLBACK = 'rgba(0,0,0,0)';

export const spec = {
    itemId: 'enmin_ccs_pastprojects',
    render: 'regional',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Past and Ongoing Projects - Regional',
    field: FIELD,
    legend: Object.entries(CCUS_REGIONAL_PROJECTS_FILL).map(([label, color]) => ({
        label,
        color,
    })),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const filter: FilterSpecification = ['==', ['downcase', ['to-string', ['get', 'projectscale']]], 'regional'];

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_pastprojects-regional-line',
        type: 'line',
        filter,
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': matchByField(FIELD, CCUS_REGIONAL_PROJECTS_FILL, FALLBACK),
            'line-width': 2,
        },
    },
    // Hit target only; after the line so consumers reading the first layer still see an outline.
    {
        id: 'enmin_ccs_pastprojects-regional-hit',
        type: 'fill',
        filter,
        paint: { 'fill-color': FALLBACK },
    },
];

export default layers;
