import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geothermal_ingenious_wellfeatures',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Groundwater Wells',
    field: 'thermalclass',
    legend: [
        { label: 'Thermal Well', value: 'Thermal', color: '#e67e22' },
        { label: 'Non-Thermal Well', value: 'Non-Thermal', color: '#3498db' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_geothermal_ingenious_wellfeatures-circle',
        type: 'circle',
        paint: {
            'circle-color': [
                'match',
                ['downcase', ['to-string', ['get', 'thermalclass']]],
                'thermal', '#e67e22',
                '#3498db',
            ],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 3, 10, 4.5, 14, 7],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1,
        },
    },
];

export default layers;
