import type { Binding, StyleSpec } from '../../types';

export const spec = {
    itemId: 'wetlands_riverine',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Riverine',
    archetype: 'simple',
    geom: 'fill',
    color: '#016100',
    legend: [
        { label: 'Riverine', color: '#016100' },
    ],
} satisfies StyleSpec & Binding;
