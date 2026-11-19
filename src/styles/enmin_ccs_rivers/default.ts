import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_rivers',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Major Rivers',
    legend: [
        { label: 'Major River', color: '#6498d2' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_rivers-casing',
        type: 'line',
        paint: {
            'line-color': '#000000',
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1.5, 10, 2.5, 14, 3.5],
        },
        layout: {
            'line-join': 'bevel',
            'line-cap': 'butt',
        },
    },
    {
        id: 'enmin_ccs_rivers-line',
        type: 'line',
        paint: {
            'line-color': '#6498d2',
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.8, 10, 1.5, 14, 2.5],
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
    },
];

export default layers;
