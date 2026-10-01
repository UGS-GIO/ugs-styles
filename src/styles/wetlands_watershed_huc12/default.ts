import type { Binding, StyleSpec } from '../../types';

export const spec = {
    itemId: 'wetlands_watershed_huc12',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Watershed (HUC12)',
    archetype: 'simple',
    geom: 'line',
    color: '#0056B3',
    legend: [
        { label: 'Watershed (HUC12)', color: '#0056B3', stroke: '#0056B3' },
    ],
} satisfies StyleSpec & Binding;
