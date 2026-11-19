import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_natcarb_location',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'NATCARB Atlas (2015)',
    legend: [
        { label: 'NATCARB Grid Cell', color: '#d2b48c', stroke: '#8b6d47' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_natcarb_location-fill',
        type: 'fill',
        paint: {
            'fill-color': '#d2b48c',
            'fill-opacity': 0.3,
        },
    },
    {
        id: 'enmin_ccs_natcarb_location-line',
        type: 'line',
        paint: {
            'line-color': '#8b6d47',
            'line-width': 1.5,
        },
    },
];

export default layers;
