import type { Binding, StyleSpec } from '../../types';

export const spec = {
    itemId: 'wetlands_subbasin_huc8',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Sub-Basin (HUC8)',
    archetype: 'simple',
    geom: 'line',
    color: '#0056B3',
    legend: [
        { label: 'Sub-Basin (HUC8)', color: '#0056B3', stroke: '#0056B3' },
    ],
} satisfies StyleSpec & Binding;
