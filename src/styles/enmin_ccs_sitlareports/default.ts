import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_sitlareports',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CO₂ Storage Potential on SITLA Blocks',
    field: 'ranking',
    legend: [
        { label: 'Limited Potential', color: '#ff7e00', stroke: '#232323' },
        { label: 'Some Potential', color: '#ffe700', stroke: '#232323' },
        { label: 'Good Potential', color: '#cfff00', stroke: '#232323' },
        { label: 'Excellent Potential', color: '#3dc200', stroke: '#232323' },
        { label: 'Not Evaluated', color: '#cdcdcd', stroke: '#232323' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_sitlareports-fill',
        type: 'fill',
        paint: {
            'fill-color': [
                'case',
                ['in', 'Excellent', ['to-string', ['get', 'ranking']]], '#3dc200',
                ['in', 'Good', ['to-string', ['get', 'ranking']]], '#cfff00',
                ['in', 'Some', ['to-string', ['get', 'ranking']]], '#ffe700',
                ['in', 'Limited', ['to-string', ['get', 'ranking']]], '#ff7e00',
                '#cdcdcd',
            ],
            'fill-opacity': 0.7,
        },
    },
    {
        id: 'enmin_ccs_sitlareports-outline',
        type: 'line',
        paint: {
            'line-color': '#232323',
            'line-width': 1,
        },
        layout: {
            'line-join': 'bevel',
        },
    },
];

export default layers;
