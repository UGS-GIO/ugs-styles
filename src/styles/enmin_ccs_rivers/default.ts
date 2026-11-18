import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_rivers',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Major Rivers',
    legend: [
        { label: 'Major Rivers', color: '#2980b9' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_rivers-line',
        type: 'line',
        paint: {
            'line-color': '#2980b9',
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 10, 1.8, 14, 3],
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
    },
];

export default layers;
