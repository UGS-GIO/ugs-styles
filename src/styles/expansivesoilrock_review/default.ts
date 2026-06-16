/**
 * hazards:expansivesoilrock_review
 * Hand-translated from SLD: hazards_expansivesoilrock_style
 * Symbolizer(s): PolygonSymbolizer | rules: 8
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'exshazardunit'],
        "HSexs", "#ff0000",
        "HRexs", "#ff7f7f",
        "MSexs", "#ffaa00",
        "MRexs", "#ffd37f",
        "LSexs", "#38a800",
        "LRexs", "#55ff00",
        "HCexs", "#73c4e0",
        "Uexs", "#cccccc",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'expansivesoilrock-review-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'expansivesoilrock-review-outline',
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
