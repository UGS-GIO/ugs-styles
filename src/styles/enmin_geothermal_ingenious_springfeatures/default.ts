import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geothermal_ingenious_springfeatures',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Springs',
    legend: [
        { label: 'Ingenious Spring', color: '#8aed8c', stroke: '#232323' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_geothermal_ingenious_springfeatures-circle',
        type: 'circle',
        paint: {
            'circle-color': '#8aed8c',
            'circle-radius': 3.5,
            'circle-stroke-color': '#232323',
            'circle-stroke-width': 0.5,
        },
    },
];

export default layers;
