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
const layers: StyleLayer[] = [
    {
        "id": "enmin_plss_townshiprange-0",
        "minzoom": 10.126916814491269,
        "type": "fill",
        "paint": {
            "fill-outline-color": "#FF0000"
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
