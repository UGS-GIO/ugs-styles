import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_sco2_points',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Statewide Storage Resource Estimates (Formation Details)',
    field: 'storage_cost_doll_per_tco2',
    legend: [
        { label: 'Storage Cost (6.3 - 11.8 $/tCO₂)', color: '#00FF00' },
        { label: 'Storage Cost (11.80 - 21.64 $/tCO₂)', color: '#FFFF00' },
        { label: 'Storage Cost (21.64 - 35.45 $/tCO₂)', color: '#FFA500' },
        { label: 'Storage Cost (35.45 - 52.52 $/tCO₂)', color: '#FF0000' },
        { label: 'Storage Cost (52.52 - 101.24 $/tCO₂)', color: '#8B0000' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_sco2_points-circle',
        type: 'circle',
        paint: {
            'circle-color': [
                'step',
                ['to-number', ['coalesce', ['get', 'storage_cost_doll_per_tco2'], 0]],
                '#00FF00',
                11.795, '#FFFF00',
                21.64, '#FFA500',
                35.451, '#FF0000',
                52.522, '#8B0000',
            ],
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['to-number', ['coalesce', ['get', 'capacity_mtco2'], 4.72]],
                4.72, 5,
                5764.04, 30,
            ],
            'circle-stroke-color': '#232323',
            'circle-stroke-width': 0.5,
        },
    },
];

export default layers;
