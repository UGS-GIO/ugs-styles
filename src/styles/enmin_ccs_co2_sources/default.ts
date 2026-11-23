import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_co2_sources',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CO₂ Sources',
    field: 'description',
    legend: [
        { label: 'Agriculture', value: 'Agriculture', color: '#7F1D1D' },
        { label: 'Cement/lime plant', value: 'Cement/lime plant', color: '#0B6623' },
        { label: 'Coal power plant', value: 'Coal power plant', color: '#5B2C6F' },
        { label: 'Landfill', value: 'Landfill', color: '#FFEB3B' },
        { label: 'Manufacturing', value: 'Manufacturing', color: '#000000' },
        { label: 'Military', value: 'Military', color: '#1F77B4' },
        { label: 'Natural resources extraction', value: 'Natural resources extraction', color: '#F39C12' },
        { label: 'NG pipeline compressor station', value: 'NG pipeline compressor station', color: '#7F8C8D' },
        { label: 'NG power plant', value: 'NG power plant', color: '#F5F5F5' },
        { label: 'NG processing', value: 'NG processing', color: '#F5F5F5' },
        { label: 'Refinery', value: 'Refinery', color: '#5DADE2' },
        { label: 'University', value: 'University', color: '#52BE80' },
    ],
} satisfies Binding & { render: string; field: string };

// Handwritten circle layer: combines categorical description colors with continuous emissions-scaled radius.
const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_co2_sources-circle',
        type: 'circle',
        paint: {
            'circle-color': [
                'match',
                ['downcase', ['to-string', ['get', 'description']]],
                'agriculture', '#7F1D1D',
                'cement/lime plant', '#0B6623',
                'coal power plant', '#5B2C6F',
                'landfill', '#FFEB3B',
                'manufacturing', '#000000',
                'military', '#1F77B4',
                'natural resources extraction', '#F39C12',
                'ng pipeline compressor station', '#7F8C8D',
                'ng power plant', '#F5F5F5',
                'ng processing', '#F5F5F5',
                'refinery', '#5DADE2',
                'university', '#52BE80',
                '#888888',
            ],
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['to-number', ['get', 'ghg_quantity_metric_tons_co2e'], 400],
                400, 3,
                4500000, 11,
            ],
            'circle-stroke-color': '#222222',
            'circle-stroke-width': 1,
            'circle-opacity': 0.8,
        },
    },
];

export default layers;
