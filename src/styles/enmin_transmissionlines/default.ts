import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_transmissionlines',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Transmission Lines",
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        "id": "enmin_transmissionlines-casing",
        "type": "line",
        "paint": {
            "line-color": "#000000",
            "line-width": 4,
            "line-opacity": 0.85
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        }
    },
    {
        "id": "enmin_transmissionlines-center",
        "type": "line",
        "paint": {
            "line-color": "#ffdd00",
            "line-width": 3,
            "line-opacity": 0.95
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        }
    }
];
export default layers;