// Seeded from GeoServer SLD: hazards_surfacefaultrupture_style.sld (geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_surfacefaultrupture',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Surface_Fault_Rupture_Hazard_Special_Study_Zone",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "hazards_surfacefaultrupture-0",
        "type": "fill",
        "paint": {
            "fill-color": "#efe4be"
        }
    },
    {
        "id": "hazards_surfacefaultrupture-1",
        "type": "fill"
    },
    {
        "id": "hazards_surfacefaultrupture-2",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#b2b2b2",
            "line-width": 0.5333333333333333
        }
    }
];
export default layers;
