import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_sitlareports',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CO₂ Storage Potential on SITLA Blocks',
    field: 'ranking',
    legend: [
        { label: 'Excellent Potential', color: '#3dc200' },
        { label: 'Good Potential', color: '#cfff00' },
        { label: 'Some Potential', color: '#ffe700' },
        { label: 'Limited Potential', color: '#ff7e00' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_sitlareports-fill',
        type: 'fill',
        paint: {
            'fill-color': [
                'case',
                ['in', 'Excellent', ['get', 'ranking']], '#3dc200',
                ['in', 'Good', ['get', 'ranking']], '#cfff00',
                ['in', 'Some', ['get', 'ranking']], '#ffe700',
                ['in', 'Limited', ['get', 'ranking']], '#ff7e00',
                '#bdc3c7',
            ],
            'fill-opacity': 0.6,
            'fill-outline-color': '#2c3e50',
        },
    },
    {
        id: 'enmin_ccs_sitlareports-outline',
        type: 'line',
        paint: {
            'line-color': '#2c3e50',
            'line-width': 1,
        },
    },
];

export default layers;
