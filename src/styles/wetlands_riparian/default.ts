import type { Binding, StyleSpec } from '../../types';

const color = '#F52891';

export const spec = {
    itemId: 'wetlands_riparian',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Riparian Mapping',
    archetype: 'simple',
    geom: 'fill',
    color,
    opacity: 0.8,
    legend: [
        { label: 'Riparian Mapping', color },
    ],
} satisfies StyleSpec & Binding;
