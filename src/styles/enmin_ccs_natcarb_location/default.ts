import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_natcarb_location',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'NATCARB Atlas (2015)',
    legend: [
        { label: 'NATCARB Location', color: '#8e44ad' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_natcarb_location-circle',
        type: 'circle',
        paint: {
            'circle-color': '#8e44ad',
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 3, 10, 4.5, 14, 7],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1,
        },
    },
];

export default layers;
