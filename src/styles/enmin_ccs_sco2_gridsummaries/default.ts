import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_sco2_gridsummaries',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Statewide Storage Resource Estimates',
    field: 'avg_cost_per_tco2',
    legend: [
        { label: '< $11.8 / tCO₂', color: '#2ecc71' },
        { label: '$11.8 - $21.6 / tCO₂', color: '#f1c40f' },
        { label: '$21.6 - $35.5 / tCO₂', color: '#e67e22' },
        { label: '> $35.5 / tCO₂', color: '#e74c3c' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_sco2_gridsummaries-fill',
        type: 'fill',
        paint: {
            'fill-color': [
                'step',
                ['coalesce', ['to-number', ['get', 'avg_cost_per_tco2']], 0],
                '#2ecc71',
                11.8, '#f1c40f',
                21.6, '#e67e22',
                35.5, '#e74c3c',
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': '#34495e',
        },
    },
    {
        id: 'enmin_ccs_sco2_gridsummaries-outline',
        type: 'line',
        paint: {
            'line-color': '#34495e',
            'line-width': 0.8,
        },
    },
    {
        id: 'enmin_ccs_sco2_gridsummaries-label',
        type: 'symbol',
        layout: {
            'text-field': [
                'case',
                ['<=', ['coalesce', ['to-number', ['get', 'formation_count']], 0], 0],
                '',
                ['concat', ['to-string', ['get', 'formation_count']], ' Fms']
            ],
            'text-font': ['Noto Sans Bold'],
            'text-size': 11,
        },
        paint: {
            'text-color': '#2c3e50',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
        },
    },
];

export default layers;
