import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geothermal_ingenious_springfeatures',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Springs',
    field: 'thermalclass',
    legend: [
        { label: 'Thermal Spring', value: 'Thermal', color: '#e74c3c' },
        { label: 'Non-Thermal Spring', value: 'Non-Thermal', color: '#1abc9c' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_geothermal_ingenious_springfeatures-circle',
        type: 'circle',
        paint: {
            'circle-color': [
                'match',
                ['downcase', ['to-string', ['get', 'thermalclass']]],
                'thermal', '#e74c3c',
                '#1abc9c',
            ],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 3, 10, 4.5, 14, 7],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1,
        },
    },
];

export default layers;
