/**
 * hazards:karstfeatures_review
 * Hand-translated from SLD: hazards_karstfeatures_style
 * Symbolizer(s): PointSymbolizer | rules: 2
 *
 * Same approximation as karstfeatures_current — SDF icon `karst-marker` tinted
 * by icon-color. Consumer must register the icon before this layer loads.
 *
 * No source declared (consumer attaches PMTiles via STAC).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const iconColor: ExpressionSpecification = [
    'match',
    ['get', 'mkfhazardunit'],
    'SHmkf', '#e60000',
    'BPmkf', '#a87000',
    '#888888',
];

export const layers: StyleLayer[] = [
    {
        id: 'karstfeatures-review-symbol',
        type: 'symbol',
        layout: {
            'icon-image': 'karst-marker',
            'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.55, 8, 0.75, 12, 1.05, 18, 1.7],
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
        },
        paint: {
            'icon-color': iconColor,
        },
    },
];

export default layers;
