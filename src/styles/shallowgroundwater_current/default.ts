/**
 * hazards:shallowgroundwater_current
 * Hand-translated from SLD: hazards_shallowgroundwater_style
 * Symbolizer(s): PolygonSymbolizer | rules: 3
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'sgshazardunit'],
        "S1sgs", "#002673",
        "S2sgs", "#0070ff",
        "S3sgs", "#73b2ff",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'shallowgroundwater-current-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'shallowgroundwater-current-outline',
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
