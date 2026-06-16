/**
 * hazards:studyareas_current
 * Hand-translated from SLD: hazards_studyareas_style
 *
 * Two-layer composition:
 *   1. line outline (red, 3px) on every polygon — "Mapped Areas"
 *   2. grey fill where mapped_hazards = 'NA' — "Areas Not Mapped within Project Areas"
 */

import type { StyleLayer } from '../../types';

export const layers: StyleLayer[] = [
    {
        id: 'studyareas-current-na-fill',
        type: 'fill',
        filter: ['==', ['get', 'mapped_hazards'], 'NA'],
        paint: {
            'fill-color': '#969696',
            'fill-outline-color': '#969696',
        },
    },
    {
        id: 'studyareas-current-outline',
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
