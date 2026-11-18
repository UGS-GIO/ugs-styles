import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_exclusionzones',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CCS Exclusion Areas',
    field: 'grade',
    legend: [
        { label: 'Exclusion Zones - Land Management', value: 'No-CCUS-Zone', color: '#e74c3c' },
        { label: 'Exclusion Zones - Geology', value: 'No-CCUS-Zone-Geo', color: '#2c3e50' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_exclusionzones-fill',
        type: 'fill',
        paint: {
            'fill-color': [
                'match',
                ['get', 'grade'],
                'No-CCUS-Zone', '#e74c3c',
                'No-CCUS-Zone-Geo', '#2c3e50',
                '#95a5a6',
            ],
            'fill-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0.15, 10, 0.25, 14, 0.35],
        },
    },
    {
        id: 'enmin_ccs_exclusionzones-outline',
        type: 'line',
        paint: {
            'line-color': [
                'match',
                ['get', 'grade'],
                'No-CCUS-Zone', '#c0392b',
                'No-CCUS-Zone-Geo', '#1a252f',
                '#7f8c8d',
            ],
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.8, 10, 1.5, 14, 2.5],
        },
    },
];

export default layers;
