import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_majorroads',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Major Roads',
    legend: [
        { label: 'Major Roads', color: '#000000' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_majorroads-line',
        type: 'line',
        paint: {
            'line-color': '#000000',
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 10, 1.8, 14, 3],
        },
        layout: {
            'line-join': 'bevel',
            'line-cap': 'butt',
        },
    },
];

export default layers;
