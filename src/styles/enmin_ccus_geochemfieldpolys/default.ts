import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccus_geochemfieldpolys',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Geochemical Field Boundaries",
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        "id": "enmin_ccus_geochemfieldpolys-line",
        "type": "line",
        "paint": {
            "line-color": "#33A02C",
            "line-width": 2,
            "line-dasharray": [3, 2]
        }
    }
];
export default layers;