// Seeded from GeoServer SLD: energy_minerals_geophysics_tem_style.sld (geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geophysics_tem',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Default Styler",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_geophysics_tem-0",
        "type": "circle",
        "paint": {
            "circle-radius": 4,
            "circle-color": "#0D1B4C"
        }
    }
];
export default layers;
