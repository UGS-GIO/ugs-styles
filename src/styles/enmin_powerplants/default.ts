// Seeded from GeoServer SLD: energy_minerals_geothermal_powerplants_style.sld (geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_powerplants',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "geothermalpowerplants",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_powerplants-0",
        "type": "symbol",
        "layout": {
            "icon-size": 30
        }
    }
];
export default layers;
