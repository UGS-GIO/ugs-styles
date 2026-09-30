import type { Binding, StyleSpec } from '../../types';

const color = '#016100';

export const spec = {
    itemId: 'wetlands_riverine',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Riverine',
    archetype: 'simple',
    geom: 'fill',
    color,
    legend: [
        { label: 'Riverine', color },
    ],
} satisfies StyleSpec & Binding;
