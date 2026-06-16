/**
 * hazards:erosionhazardzone_current
 * Hand-translated from SLD: hazards_erosionhazardzone_style
 * Symbolizer(s): PolygonSymbolizer | rules: 1
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';

export const layers: StyleLayer[] = [
    {
        id: 'erosionhazardzone-current-fill',
        type: 'fill',
        paint: {
            'fill-color': "#ffaa00",
        },
    },
    {
        id: 'erosionhazardzone-current-outline',
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
