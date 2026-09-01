import type { Binding } from '../../types';

export const spec = {
    itemId: 'wetlands_plants_huc8',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Watershed (HUC8) Boundaries',
    archetype: 'simple',
    geom: 'line',
    color: '#0056B3',
} satisfies Binding & { render: string; archetype: 'simple'; geom: string; color: string };
