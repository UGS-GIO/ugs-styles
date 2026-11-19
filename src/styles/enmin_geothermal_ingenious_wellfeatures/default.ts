import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geothermal_ingenious_wellfeatures',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Groundwater Wells',
    legend: [
        { label: 'Ingenious Well', color: '#7ab8d9', stroke: '#232323' },
    ],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_geothermal_ingenious_wellfeatures-circle',
        type: 'circle',
        paint: {
            'circle-color': '#7ab8d9',
            'circle-radius': 3.5,
            'circle-stroke-color': '#232323',
            'circle-stroke-width': 0.5,
        },
    },
];

export default layers;
