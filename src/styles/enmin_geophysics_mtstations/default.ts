// Seeded from live GeoServer: energy_mineral:enmin_geophysics_mtstations_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geophysics_mtstations',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "enmin_mtstations",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_geophysics_mtstations-0",
        "type": "circle",
        "paint": {
            "circle-radius": 4,
            "circle-color": "#64B5F6",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#1565C0"
        }
    }
];
export default layers;
