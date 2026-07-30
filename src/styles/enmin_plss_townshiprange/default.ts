// Seeded from live GeoServer: energy_mineral:enmin_plss_townshiprange_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_plss_townshiprange',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "energy_minerals_plss_townshiprange_style",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
//
// The township outline was lost in the seed: the SLD's PolygonSymbolizer is
// `<Fill fill-opacity="0"/><Stroke stroke="#FF0000"/>`, which came through as a fill with only
// `fill-outline-color` — paintless as far as the build was concerned, so it was dropped and the
// style published labels only (#34). Republished as the `line` it always was (stroke confirmed
// against prod GeoServer GetStyles, 2026-07-29). `minzoom` matches MaxScaleDenominator 500000.
const layers: StyleLayer[] = [
    {
        "id": "enmin_plss_townshiprange-0",
        "minzoom": 10.126916814491269,
        "type": "line",
        "paint": {
            "line-color": "#FF0000",
            "line-width": 1
        }
    },
    {
        "id": "enmin_plss_townshiprange-1",
        "minzoom": 10.126916814491269,
        "type": "symbol",
        "paint": {
            "text-opacity": 1,
            "text-color": "#E60000"
        },
        "layout": {
            "text-field": "{twnshplab}",
            "text-font": [
                "Arial"
            ],
            "text-size": 8,
            "symbol-placement": "point"
        }
    }
];
export default layers;
