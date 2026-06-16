/**
 * hazards:karstfeatures_current
 * Hand-translated from SLD: hazards_karstfeatures_style
 * Symbolizer(s): PointSymbolizer | rules: 2
 *
 * SLD uses ESRI Transportation & Civic glyph 0x72 (proprietary, license-restricted)
 * with two colors. Approximated as an SDF icon `karst-marker` tinted via icon-color.
 *
 * The consumer must register an icon image named `karst-marker` (SDF) before this
 * layer loads. QA tool wires this in qa/qa.mjs. Production consumers (geohaz-v2)
 * must register an equivalent icon before adding the layer.
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
        id: 'karstfeatures-current-symbol',
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
