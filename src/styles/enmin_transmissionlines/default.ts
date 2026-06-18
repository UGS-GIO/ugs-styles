import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_transmissionlines',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Transmission Lines by Voltage",
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        "id": "enmin_transmissionlines-0",
        "type": "line",
        "paint": {
            "line-color": [
                "step",
                ["to-number", ["get", "voltage_kv"], 0],
                "#4DAF4A",
                100, "#1F78B4",
                200, "#FF7F00",
                300, "#E31A1C"
            ],
            "line-width": [
                "step",
                ["to-number", ["get", "voltage_kv"], 0],
                1.5,
                100, 2.2,
                200, 3.2,
                300, 4.2
            ],
            "line-opacity": 0.85
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        }
    }
];
export default layers;