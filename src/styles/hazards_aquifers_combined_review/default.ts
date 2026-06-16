/**
 * hazards:hazards_aquifers_combined_review
 * Hand-translated from SLD: energy_minerals_insar_aquifers_combined_review
 * Symbolizer(s): PolygonSymbolizer | rules: 1
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';

export const layers: StyleLayer[] = [
    {
        id: 'hazards-aquifers-combined-review-fill',
        type: 'fill',
        paint: {
            'fill-color': "#FFB6C1",
        },
    },
    {
        id: 'hazards-aquifers-combined-review-outline',
        type: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': "#CC8899",
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.5, 10, 1.25, 14, 2, 18, 3.5],
        },
    },
];

export default layers;
