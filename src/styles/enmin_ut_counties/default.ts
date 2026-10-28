// Seeded from live GeoServer: energy_mineral:enmin_ut_counties_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ut_counties',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "energy_minerals_counties_style",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_ut_counties-0",
        "type": "fill"
    },
    {
        "id": "enmin_ut_counties-1",
        "type": "line",
        "paint": {
            "line-color": "#808080",
            "line-width": 1.5
        }
    },
    {
        "id": "enmin_ut_counties-2",
        "type": "symbol",
        "paint": {
            "text-opacity": 1,
            "text-color": "#37474f",
            // Matches enmin_ccus_cbcounty; without a halo the names vanish on satellite
            "text-halo-color": "#ffffff",
            "text-halo-width": 1.2
        },
        "layout": {
            "text-field": "{name}",
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 11,
            "symbol-placement": "point"
        }
    }
];
export default layers;
