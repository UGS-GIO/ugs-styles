import type { ExpressionSpecification, FilterSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import type { SpriteRecipe } from '../../sprites';

export const spec = {
    itemId: 'M-179DM__Geology_arc',
    render: 'faults',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Utah Faults (1:500,000)',
    sprite: 'styles/M-179DM__Geology_arc/sprite',
    legend: [
        { label: 'Fault, Normal, Well Located', color: '#000000', shape: 'line' as const },
        { label: 'Fault, Normal, Approximately Located', color: '#000000', shape: 'line' as const },
        { label: 'Fault, Normal, Concealed', color: '#000000', shape: 'line' as const },
        { label: 'Fault, Thrust, Well Located', color: '#000000', shape: 'line' as const },
        { label: 'Fault, Thrust, Approximately Located', color: '#000000', shape: 'line' as const },
        { label: 'Fault, Thrust, Concealed', color: '#000000', shape: 'line' as const },
    ],
} satisfies Binding & { render: string; sprite: string };

export const sprite: SpriteRecipe = {
    shape: 'triangle',
    values: { constant: ['thrust'] },
    cells: () => [{
        names: ['thrust-tooth'],
        fill: '#000000',
        stroke: '#000000',
    }],
};

const eq = (field: string, value: string): ExpressionSpecification => [
    '==',
    ['downcase', ['to-string', ['get', field]]],
    value,
];
const faultRule = (subtype: string, modifier: string): FilterSpecification => [
    'all',
    eq('TYPE', 'fault'),
    eq('SUBTYPE', subtype),
    eq('MODIFIER', modifier),
];

// Handwritten layers to filter TYPE='fault' from M-179DM__Geology_arc and draw dashed/dotted fault
// classes plus line-placed thrust teeth from the baked triangle sprite.
const layers: StyleLayer[] = [
    {
        id: 'M-179DM__Geology_arc-normal-well',
        type: 'line',
        filter: faultRule('normal', 'well located'),
        paint: {
            'line-color': '#000000',
            'line-width': 1,
        },
    },
    {
        id: 'M-179DM__Geology_arc-normal-approx',
        type: 'line',
        filter: faultRule('normal', 'approximately located'),
        paint: {
            'line-color': '#000000',
            'line-width': 1,
            'line-dasharray': [4, 3],
        },
    },
    {
        id: 'M-179DM__Geology_arc-normal-concealed',
        type: 'line',
        filter: faultRule('normal', 'concealed'),
        paint: {
            'line-color': '#000000',
            'line-width': 1,
            'line-dasharray': [1, 2],
        },
    },
    {
        id: 'M-179DM__Geology_arc-thrust-well',
        type: 'line',
        filter: faultRule('thrust', 'well located'),
        paint: {
            'line-color': '#000000',
            'line-width': 1,
        },
    },
    {
        id: 'M-179DM__Geology_arc-thrust-approx',
        type: 'line',
        filter: faultRule('thrust', 'approximately located'),
        paint: {
            'line-color': '#000000',
            'line-width': 1,
            'line-dasharray': [4, 3],
        },
    },
    {
        id: 'M-179DM__Geology_arc-thrust-concealed',
        type: 'line',
        filter: faultRule('thrust', 'concealed'),
        paint: {
            'line-color': '#000000',
            'line-width': 1,
            'line-dasharray': [1, 2],
        },
    },
    {
        id: 'M-179DM__Geology_arc-thrust-teeth',
        type: 'symbol',
        filter: ['all', eq('TYPE', 'fault'), eq('SUBTYPE', 'thrust')],
        layout: {
            'symbol-placement': 'line',
            'symbol-spacing': 28,
            'icon-image': 'thrust-tooth',
            'icon-size': 0.16,
            'icon-offset': [0, -14],
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
        },
    },
];

export default layers;
