/**
 * hazards:collapsiblesoil_review
 * Hand-translated from SLD: hazards_collapsiblesoil_style
 * Symbolizer(s): PolygonSymbolizer | rules: 6
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'csshazardunit'],
        "Hcss", "#e60000",
        "SU1css", "#f2730e",
        "SU2css", "#ffcc32",
        "SU3css", "#a83800",
        "SU4css", "#ffe68c",
        "Bedrock", "#b2b2b2",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'collapsiblesoil-review-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'collapsiblesoil-review-outline',
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
