import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_railroads',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Railroads',
    legend: [
        { label: 'Railroads', color: '#9f4b00' },
    ],
} satisfies Binding & { render: string };

// Handwritten layers for dark casing + dashed inner railroad line; step widths keep dash lengths exact across scale buckets.
const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_railroads-casing',
        type: 'line',
        paint: {
            'line-color': '#000000',
            'line-width': ['step', ['zoom'], 1.5, 10, 2.5, 14, 4],
        },
        layout: {
            'line-join': 'bevel',
            'line-cap': 'butt',
        },
    },
    {
        id: 'enmin_ccs_railroads-inner',
        type: 'line',
        paint: {
            'line-color': '#9f4b00',
            'line-width': ['step', ['zoom'], 0.8, 10, 1.2, 14, 2],
            'line-dasharray': [2, 2],
        },
        layout: {
            'line-join': 'bevel',
            'line-cap': 'butt',
        },
    },
];

export default layers;
