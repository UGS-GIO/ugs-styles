import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geothermal_wellsandsprings',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Geothermal Wells & Springs',
    field: 'type',
    legend: [
        { label: 'Well', value: 'Well', color: '#e67e22' },
        { label: 'Spring', value: 'Spring', color: '#2980b9' },
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
                'well', '#e67e22',
                'spring', '#2980b9',
                '#95a5a6',
            ],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 3, 10, 4.5, 14, 7],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1,
        },
    },
];

export default layers;
