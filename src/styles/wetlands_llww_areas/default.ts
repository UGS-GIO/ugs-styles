import type { Binding, StyleSpec } from '../../types';

const color = '#8400A8';

export const spec = {
    itemId: 'wetlands_llww_areas',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'LLWW Mapping Areas',
    archetype: 'simple',
    geom: 'line',
    color,
    legend: [
        { label: 'LLWW Mapping Areas', color, stroke: color },
    ],
} satisfies StyleSpec & Binding;
