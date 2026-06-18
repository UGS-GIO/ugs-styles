// Seeded from GeoServer SLD: energy_minerals_transmission_lines_style.sld (geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_transmissionlines',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Transmission Lines",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_transmissionlines-0",
        "type": "line",
        "paint": {
            "line-width": 4
        },
        "layout": {
            "line-join": "round"
        }
    },
    {
        "id": "enmin_transmissionlines-1",
        "type": "line",
        "paint": {
            "line-color": "#ffdd00",
            "line-width": 3
        },
        "layout": {
            "line-join": "round"
        }
    }
];
export default layers;
