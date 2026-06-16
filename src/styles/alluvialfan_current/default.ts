/**
 * hazards:alluvialfan_current
 * Hand-translated from SLD: hazards_alluvialfan_style
 * Symbolizer(s): PolygonSymbolizer | rules: 3
 *
 * Two-layer composition. PMTiles for this layer are dissolved by `aafhazardunit`
 * at build time (one feature per category) so the line outline only paints exterior
 * boundaries — no within-category bleed-through.
 *
 * No source declared (consumer attaches PMTiles via STAC).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = [
    'match',
    ['get', 'aafhazardunit'],
    'Haaf', '#ff0000',
    'Maaf', '#0070ff',
    'Oaaf', '#ffffbe',
    'transparent',
];

export const layers: StyleLayer[] = [
    {
        id: 'alluvialfan-current-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'alluvialfan-current-outline',
        type: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': '#6e6e6e',
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.5, 10, 1.25, 14, 2, 18, 3.5],
        },
    },
];

export default layers;
