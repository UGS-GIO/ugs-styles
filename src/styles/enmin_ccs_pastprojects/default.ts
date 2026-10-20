/**
 * CCUS Past and Ongoing Projects — Default style.
 *
 * Polygons are styled as borders with no fill.
 * Regional projects use an orange scale ramp; site-specific projects use a blue scale ramp.
 * Each polygon has a distinct color border keyed by `namealias`.
 * The legend displays the `namealias` values in title case.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';
import {
    CCUS_REGIONAL_PROJECTS_FILL,
    CCUS_SITESPECIFIC_PROJECTS_FILL,
    CCUS_ALL_PROJECTS_FILL,
} from '../../palettes';

const FIELD = 'namealias';
const FALLBACK = '#999999';

export const spec = {
    itemId: 'enmin_ccs_pastprojects',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Past and Ongoing Projects',
    field: FIELD,
    legend: [
        ...Object.entries(CCUS_REGIONAL_PROJECTS_FILL).map(([label, color]) => ({
            label,
            color,
        })),
        ...Object.entries(CCUS_SITESPECIFIC_PROJECTS_FILL).map(([label, color]) => ({
            label,
            color,
        })),
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_pastprojects-line',
        type: 'line',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': matchByField(FIELD, CCUS_ALL_PROJECTS_FILL, FALLBACK),
            'line-width': 2,
        },
    },
];

export default layers;
