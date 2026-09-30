import type { Binding, StyleSpec } from '../../types';
import { WETLANDS_TYPE_FILL } from '../../palettes';

export const spec = {
    itemId: 'wetlands_nonriverine',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wetlands (non-riverine)',
    archetype: 'categorical',
    field: 'wetland_type',
    palette: 'wetlands-type',
    legend: [
        { label: 'Freshwater Emergent Wetland', color: WETLANDS_TYPE_FILL['Freshwater Emergent Wetland'] },
        { label: 'Freshwater Forested/Shrub Wetland', color: WETLANDS_TYPE_FILL['Freshwater Forested/Shrub Wetland'] },
        { label: 'Freshwater Pond', color: WETLANDS_TYPE_FILL['Freshwater Pond'] },
        { label: 'Lake', color: WETLANDS_TYPE_FILL['Lake'] },
        { label: 'Other', color: WETLANDS_TYPE_FILL['Other'] },
    ],
} satisfies StyleSpec & Binding;
