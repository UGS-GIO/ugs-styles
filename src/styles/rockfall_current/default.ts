/**
 * hazards:rockfall_current
 * Hand-translated from SLD: hazards_rockfall_style
 * Symbolizer(s): PolygonSymbolizer | rules: 5
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'rfhhazardunit'],
        "VHrfh", "#e600a9",
        "Hrfh", "#e60000",
        "Mrfh", "#ffaa00",
        "Lrfh", "#38a800",
        "LHrfh", "#bf9470",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'rockfall-current-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'rockfall-current-outline',
        type: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': "#4e4e4e",
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.5, 10, 1.25, 14, 2, 18, 3.5],
        },
    },
];

export default layers;
