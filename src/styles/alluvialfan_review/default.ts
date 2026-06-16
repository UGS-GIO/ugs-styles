/**
 * hazards:alluvialfan_review
 * Hand-translated from SLD: hazards_alluvialfan_style
 * Symbolizer(s): PolygonSymbolizer | rules: 3
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'aafhazardunit'],
        "Haaf", "#ff0000",
        "Maaf", "#0070ff",
        "Oaaf", "#ffffbe",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'alluvialfan-review-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'alluvialfan-review-outline',
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
