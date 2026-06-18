// Seeded from live GeoServer: energy_mineral:enmin_powerplants_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_powerplants',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Power Plants",
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        "id": "enmin_powerplants-0",
        "type": "circle",
        "paint": {
            "circle-radius": 5,
            "circle-color": [
                "match",
                ["downcase", ["to-string", ["get", "primsource"]]],
                "coal", "#333333",
                "natural gas", "#1F78B4",
                "petroleum", "#8B4513",
                "hydroelectric", "#41B6C4",
                "wind", "#A6D854",
                "solar", "#FFD700",
                "geothermal", "#E31A1C",
                "biomass", "#2CA02C",
                "#999999"
            ],
            "circle-opacity": 0.9,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#FFFFFF"
        }
    }
];
export default layers;