/**
 * hazards:liquefaction_review
 * Hand-translated from SLD: hazards_liquefaction_style
 * Symbolizer(s): PolygonSymbolizer | rules: 5
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'lqshazardunit'],
        "VHlqs", "#e60000",
        "Hlqs", "#d2897a",
        "Mlqs", "#dadca4",
        "Llqs", "#1fb75e",
        "VLlqs", "#7fe2e4",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'liquefaction-review-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'liquefaction-review-outline',
        type: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': "#6e6e6e",
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.5, 10, 1.25, 14, 2, 18, 3.5],
        },
    },
];

export default layers;
