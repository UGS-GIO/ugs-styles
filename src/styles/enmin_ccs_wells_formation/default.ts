import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_wells_formation',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wells Database',
    field: 'welltype_name',
    legend: [
        { label: 'Carbon Dioxide Well', color: '#e54baa', stroke: '#232323' },
        { label: 'Dry Hole', color: '#aced8d', stroke: '#232323' },
        { label: 'Gas Injection Well', color: '#fbff10', stroke: '#232323' },
        { label: 'Gas Storage Well', color: '#12d82c', stroke: '#232323' },
        { label: 'Gas Well', color: '#c960d2', stroke: '#232323' },
        { label: 'Helium Well', color: '#afd03a', stroke: '#232323' },
        { label: 'Oil Well', color: '#7a7add', stroke: '#232323' },
        { label: 'Test Well', color: '#8e5ccb', stroke: '#232323' },
        { label: 'Unknown', color: '#d14b11', stroke: '#232323' },
        { label: 'Water Disposal Well', color: '#3fccd6', stroke: '#232323' },
        { label: 'Water Injection Well', color: '#4388d6', stroke: '#232323' },
        { label: 'Water Source Well', color: '#c84b5f', stroke: '#232323' },
    ],
} satisfies Binding & { render: string; field: string };

// Handwritten layer for 12-class case-insensitive welltype colors with 3.5px radius and translucent stroke.
const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_wells_formation-circle',
        type: 'circle',
        paint: {
            'circle-radius': 3.5,
            'circle-color': [
                'match',
                ['downcase', ['to-string', ['get', 'welltype_name']]],
                'carbon dioxide well', '#e54baa',
                'dry hole', '#aced8d',
                'gas injection well', '#fbff10',
                'gas storage well', '#12d82c',
                'gas well', '#c960d2',
                'helium well', '#afd03a',
                'oil well', '#7a7add',
                'test well', '#8e5ccb',
                'unknown', '#d14b11',
                'water disposal well', '#3fccd6',
                'water injection well', '#4388d6',
                'water source well', '#c84b5f',
                '#a0a0a0',
            ],
            'circle-stroke-width': 0.5,
            'circle-stroke-color': '#232323',
            'circle-stroke-opacity': 0.65,
        },
    },
];

export default layers;
