import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_wsa',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wilderness Study Areas',
    legend: [
        { label: 'Wilderness Study Areas', color: '#fdff00' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_wsa-fill',
        type: 'fill',
        paint: {
            'fill-color': '#fdff00',
            'fill-opacity': 0.4,
            'fill-outline-color': '#232323',
        },
    },
    {
        id: 'enmin_ccs_wsa-outline',
        type: 'line',
        paint: {
            'line-color': '#232323',
            'line-width': 1.2,
        },
    },
];

export default layers;
