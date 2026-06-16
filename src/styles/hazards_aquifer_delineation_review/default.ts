/**
 * hazards:hazards_aquifer_delineation_review
 * Hand-translated from SLD: generic
 * Symbolizer(s): LineSymbolizer, PointSymbolizer, PolygonSymbolizer, RasterSymbolizer | rules: 4
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';

export const layers: StyleLayer[] = [
    {
        id: 'hazards-aquifer-delineation-review-fill',
        type: 'fill',
        paint: {
            'fill-color': '#AAAAAA',
            'fill-opacity': 0.4,
        },
    },
    {
        id: 'hazards-aquifer-delineation-review-outline',
        type: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': "#444444",
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.5, 10, 1.25, 14, 2, 18, 3.5],
        },
    },
];

export default layers;
