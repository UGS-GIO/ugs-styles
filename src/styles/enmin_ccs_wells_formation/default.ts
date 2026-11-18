import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_wells_formation',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CCS Wells with Formation Tops',
    field: 'welltype_name',
    legend: [
        { label: 'Carbon Dioxide Well', color: '#e54baa' },
        { label: 'Dry Hole', color: '#aced8d' },
        { label: 'Gas Injection Well', color: '#fbff10' },
        { label: 'Gas Storage Well', color: '#033aef' },
        { label: 'Gas Well', color: '#e81414' },
        { label: 'Oil Well', color: '#16cb1c' },
        { label: 'Other', color: '#a0a0a0' },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_wells_formation-circle',
        type: 'circle',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 2.5, 10, 4, 14, 6],
            'circle-color': [
                'match',
                ['downcase', ['to-string', ['coalesce', ['get', 'welltype_name'], ['get', 'welltype'], '']]],
                'carbon dioxide well', '#e54baa',
                'dry hole', '#aced8d',
                'gas injection well', '#fbff10',
                'gas storage well', '#033aef',
                'gas well', '#e81414',
                'oil well', '#16cb1c',
                '#a0a0a0',
            ],
            'circle-stroke-width': 0.5,
            'circle-stroke-color': '#232323',
        },
    },
];

export default layers;
