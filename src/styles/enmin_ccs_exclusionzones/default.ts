import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_exclusionzones',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CCS Exclusion Areas',
    field: 'grade',
    legend: [
        { label: 'Exclusion Zones - Land Management', value: 'No-CCUS-Zone', color: '#ff0000', stroke: '#000000' },
        { label: 'Exclusion Zones - Geology', value: 'No-CCUS-Zone-Geo', color: '#000000', stroke: '#000000' },
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
                'No-CCUS-Zone', '#ff0000',
                'No-CCUS-Zone-Geo', '#000000',
                '#95a5a6',
            ],
            'fill-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0.15, 10, 0.25, 14, 0.35],
        },
    },
    {
        id: 'enmin_ccs_exclusionzones-outline',
        type: 'line',
        paint: {
            'line-color': '#000000',
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.8, 10, 1.5, 14, 2.2],
        },
        layout: {
            'line-cap': 'square',
            'line-join': 'bevel',
        },
    },
];

export default layers;
