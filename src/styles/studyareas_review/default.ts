/**
 * hazards:studyareas_review
 * Hand-translated from SLD: hazards_studyareas_style (review variant — duplicate ruleset)
 *
 * Identical to studyareas_current. Outline + NA-filtered grey fill.
 */

import type { StyleLayer } from '../../types';

export const layers: StyleLayer[] = [
    {
        id: 'studyareas-review-na-fill',
        type: 'fill',
        filter: ['==', ['get', 'mapped_hazards'], 'NA'],
        paint: {
            'fill-color': '#969696',
            'fill-outline-color': '#969696',
        },
    },
    {
        id: 'studyareas-review-outline',
        type: 'line',
        layout: {
            'line-join': 'bevel',
        },
        paint: {
            'line-color': '#a80000',
            'line-width': 3,
        },
    },
];

export default layers;
