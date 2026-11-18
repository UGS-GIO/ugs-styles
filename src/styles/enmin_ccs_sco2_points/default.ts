import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_sco2_points',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Statewide Storage Resource Estimates (Formation Details)',
    field: 'storage_cost_doll_per_tco2',
    legend: [
        { label: '< $11.8 / tCO₂', color: '#2ecc71' },
        { label: '$11.8 - $21.6 / tCO₂', color: '#f1c40f' },
        { label: '$21.6 - $35.5 / tCO₂', color: '#e67e22' },
        { label: '> $35.5 / tCO₂', color: '#e74c3c' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_sco2_points-circle',
        type: 'circle',
        paint: {
            'circle-color': [
                'step',
                ['coalesce', ['to-number', ['get', 'storage_cost_doll_per_tco2']], 0],
                '#2ecc71',
                11.8, '#f1c40f',
                21.6, '#e67e22',
                35.5, '#e74c3c',
            ],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 3, 10, 5, 14, 8],
            'circle-stroke-color': '#2c3e50',
            'circle-stroke-width': 0.8,
        },
    },
];

export default layers;
