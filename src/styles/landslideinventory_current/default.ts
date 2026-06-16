/**
 * hazards:landslideinventory_current
 * Hand-translated from SLD: hazards_landslideinventory_style
 * Symbolizer(s): PolygonSymbolizer | rules: 14
 *
 * No source declared (consumer attaches PMTiles via STAC).
 * For overlap-correct rendering, build PMTiles with dissolve by the categorical
 * property (e.g. `bash scripts/build-pmtiles.sh hazards:rockfall_current rfhhazardunit`).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColor: ExpressionSpecification = ['match',
        ['get', 'lsfhazardunit'],
        "CBlsf", "#e60000",
        "CDFlsf", "#d2f49f",
        "DFSAlsf", "#64c3ef",
        "DFlsf", "#f9a7aa",
        "EFlsf", "#5eed71",
        "FPSTlsf", "#f4b164",
        "FPSlsf", "#bf96e8",
        "MSlsf", "#5e5b91",
        "Olsf", "#876543",
        "RSlsf", "#d8f259",
        "TBSlsf", "#5befdb",
        "TDSlsf", "#53875e",
        "TPSTlsf", "#4a4ad3",
        "Ulsf", "#8c3352",
        'transparent'];

export const layers: StyleLayer[] = [
    {
        id: 'landslideinventory-current-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColor,
        },
    },
    {
        id: 'landslideinventory-current-outline',
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
