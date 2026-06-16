/**
 * hazards:earthfissure_current
 * Hand-translated from SLD: hazards_earthfissure_style
 * Symbolizer(s): LineSymbolizer | rules: 3
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const lineColor: ExpressionSpecification = ['match',
        ['get', 'efhhazardunit'],
        "WLFefh", "#e60000",
        "SFefh", "#a87000",
        "Lefh", "#70a800",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'earthfissure-current-line',
        type: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': lineColor,
            'line-width': 2.67,
        },
    },
];

export default layers;
