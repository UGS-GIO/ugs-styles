/**
 * CCUS Past and Ongoing Projects — Site-Specific layer.
 *
 * Polygons are styled as borders with no fill using a blue scale ramp.
 * Each site-specific project has a distinct color border keyed by `namealias`.
 * The legend displays only site-specific project values.
 */
import type { FilterSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';
import { CCUS_SITESPECIFIC_PROJECTS_FILL } from '../../palettes';

const FIELD = 'namealias';
const FALLBACK = 'rgba(0,0,0,0)';

export const spec = {
    itemId: 'enmin_ccs_pastprojects',
    render: 'site-specific',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Past and Ongoing Projects - Site-Specific',
    field: FIELD,
    legend: Object.entries(CCUS_SITESPECIFIC_PROJECTS_FILL).map(([label, color]) => ({
        label,
        color,
    })),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const filter: FilterSpecification = ['==', ['downcase', ['to-string', ['get', 'projectscale']]], 'site specific'];

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_pastprojects-site-specific-line',
        type: 'line',
        filter,
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': matchByField(FIELD, CCUS_SITESPECIFIC_PROJECTS_FILL, FALLBACK),
            'line-width': 2,
        },
    },
];

export default layers;
