import type { Binding, StyleLayer } from '../../types';
import { eq, FAULT_LAYERS, FAULT_LEGEND } from './faults';

export const spec = {
    itemId: 'M-179DM__Geology_arc',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Utah Geologic Lines (1:500,000)',
    sprite: 'styles/M-179DM__Geology_arc/sprite',
    legend: [
        ...FAULT_LEGEND,
        { label: 'Contact', value: 'contact', color: '#444444', shape: 'line' as const },
        { label: 'Water Boundary', value: 'water boundary', color: '#4a90d9', shape: 'line' as const },
        { label: 'Shoreline', value: 'shoreline', color: '#1f78b4', shape: 'line' as const },
        { label: 'Gilsonite Vein', value: 'vein', color: '#7b2cbf', shape: 'line' as const },
        { label: 'Marker Bed', value: 'marker bed', color: '#8c510a', shape: 'line' as const },
        { label: 'Map Boundary', value: 'map boundary', color: '#666666', shape: 'line' as const },
    ],
} satisfies Binding & { render: string; sprite: string };

// Handwritten layers covering every TYPE/SUBTYPE/MODIFIER class in M-179DM__Geology_arc
// so full-publication views render contacts, boundaries, veins, marker beds, and faults together.
const layers: StyleLayer[] = [
    {
        id: 'M-179DM__Geology_arc-map-boundary',
        type: 'line',
        filter: eq('TYPE', 'map boundary'),
        paint: {
            'line-color': '#666666',
            'line-width': 0.8,
        },
    },
    {
        id: 'M-179DM__Geology_arc-contact-well',
        type: 'line',
        filter: ['all', eq('TYPE', 'contact'), ['!=', ['downcase', ['to-string', ['get', 'MODIFIER']]], 'concealed']],
        paint: {
            'line-color': '#444444',
            'line-width': 0.6,
        },
    },
    {
        id: 'M-179DM__Geology_arc-contact-concealed',
        type: 'line',
        filter: ['all', eq('TYPE', 'contact'), eq('MODIFIER', 'concealed')],
        paint: {
            'line-color': '#444444',
            'line-width': 0.6,
            'line-dasharray': [2, 2],
        },
    },
    {
        id: 'M-179DM__Geology_arc-water-boundary',
        type: 'line',
        filter: eq('TYPE', 'water boundary'),
        paint: {
            'line-color': '#4a90d9',
            'line-width': 0.8,
        },
    },
    {
        id: 'M-179DM__Geology_arc-shoreline',
        type: 'line',
        filter: eq('TYPE', 'shoreline'),
        paint: {
            'line-color': '#1f78b4',
            'line-width': 0.9,
            'line-dasharray': [3, 2],
        },
    },
    {
        id: 'M-179DM__Geology_arc-marker-bed',
        type: 'line',
        filter: eq('TYPE', 'marker bed'),
        paint: {
            'line-color': '#8c510a',
            'line-width': 1,
        },
    },
    {
        id: 'M-179DM__Geology_arc-vein',
        type: 'line',
        filter: eq('TYPE', 'vein'),
        paint: {
            'line-color': '#7b2cbf',
            'line-width': 1.2,
        },
    },
    ...FAULT_LAYERS,
];

export default layers;
