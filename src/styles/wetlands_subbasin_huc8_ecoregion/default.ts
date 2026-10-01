import type { Binding, StyleSpec } from '../../types';
import { WETLANDS_ECOREGIONS_ALL_FILL } from '../../palettes';

export const spec = {
    itemId: 'wetlands_subbasin_huc8_ecoregion',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Sub-Basin (HUC8) by Ecoregion',
    archetype: 'categorical',
    field: 'ecoregion',
    palette: 'wetlands-ecoregions',
    legend: Object.entries(WETLANDS_ECOREGIONS_ALL_FILL).map(([label, color]) => ({ label, color })),
} satisfies StyleSpec & Binding;
