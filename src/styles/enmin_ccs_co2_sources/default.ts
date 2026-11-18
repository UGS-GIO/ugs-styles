import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_co2_sources',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CO₂ Sources',
    field: 'description',
    legend: [
        { label: 'Agriculture', color: '#A52A2A' },
        { label: 'Cement/Lime Plant', color: '#008000' },
        { label: 'Coal Power Plant', color: '#800080' },
        { label: 'Landfill', color: '#FFFF00' },
        { label: 'Manufacturing', color: '#333333' },
        { label: 'Military', color: '#0000FF' },
        { label: 'Mining', color: '#808080' },
        { label: 'Natural Gas Power Plant', color: '#FFA500' },
        { label: 'Natural Gas System', color: '#00FFFF' },
        { label: 'Petroleum', color: '#FF0000' },
        { label: 'Other', color: '#808000' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_co2_sources-circle',
        type: 'circle',
        paint: {
            'circle-color': [
                'match',
                ['downcase', ['to-string', ['get', 'description']]],
                'agriculture', '#A52A2A',
                'cement/lime plant', '#008000',
                'coal power plant', '#800080',
                'landfill', '#FFFF00',
                'manufacturing', '#333333',
                'military', '#0000FF',
                'mining', '#808080',
                'natural gas power plant', '#FFA500',
                'natural gas system', '#00FFFF',
                'petroleum', '#FF0000',
                '#808000',
            ],
            'circle-radius': [
                'interpolate', ['linear'], ['zoom'],
                6, ['interpolate', ['linear'], ['coalesce', ['to-number', ['get', 'ghg_quantity__metric_tons_co2e_']], 50000], 50000, 3, 4000000, 10],
                12, ['interpolate', ['linear'], ['coalesce', ['to-number', ['get', 'ghg_quantity__metric_tons_co2e_']], 50000], 50000, 6, 4000000, 22],
            ],
            'circle-stroke-color': '#000000',
            'circle-stroke-width': 1,
            'circle-opacity': 0.85,
        },
    },
];

export default layers;
