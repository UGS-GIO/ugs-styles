import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geothermal_wellsandsprings',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Geothermal Wells & Springs',
    field: 'type',
    legend: [
        { label: 'Mine', value: 'M', color: '#989898', stroke: '#232323' },
        { label: 'Spring', value: 'S', color: '#32df36', stroke: '#232323' },
        { label: 'Well', value: 'W', color: '#1f78b4', stroke: '#232323' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_geothermal_wellsandsprings-circle',
        type: 'circle',
        paint: {
            'circle-color': [
                'match',
                ['downcase', ['to-string', ['get', 'type']]],
                'm', '#989898',
                ['s', 's?'], '#32df36',
                ['w', 'w?'], '#1f78b4',
                '#95a5a6',
            ],
            'circle-radius': 3.5,
            'circle-stroke-color': '#232323',
            'circle-stroke-width': 0.5,
        },
    },
];

export default layers;
