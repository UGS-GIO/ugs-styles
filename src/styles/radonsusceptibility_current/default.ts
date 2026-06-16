/**
 * hazards:radonsusceptibility_current
 * Hand-translated from SLD: hazards_radonsusceptibility_style
 * Symbolizer(s): PolygonSymbolizer | rules: 3
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'grshazardunit'],
        "Hgrs", "#ff0000",
        "Mgrs", "#ffaa00",
        "Lgrs", "#38a800",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'radonsusceptibility-current-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'radonsusceptibility-current-outline',
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
