/**
 * hazards:solublesoilandrock_current
 * Hand-translated from SLD: hazards_solublesoilandrock_style
 * Symbolizer(s): PolygonSymbolizer | rules: 10
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'slshazardunit'],
        "GSHsls", "#e60000",
        "GS1sls", "#ff7f7f",
        "GS2sls", "#6ba000",
        "GRHsls", "#a3c400",
        "GR1sls", "#deea00",
        "GR2sls", "#ffe900",
        "GR3sls", "#ffbb00",
        "GBRsls", "#ff9000",
        "LR1sls", "#ff6100",
        "LGRsls", "#732600",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'solublesoilandrock-current-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'solublesoilandrock-current-outline',
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
