import type { Binding, StyleSpec } from '../../types';

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
        { label: 'Freshwater Emergent Wetland', color: '#B4D79E' },
        { label: 'Freshwater Forested/Shrub Wetland', color: '#FFD37F' },
        { label: 'Freshwater Pond', color: '#BEE8FF' },
        { label: 'Lake', color: '#73B2FF' },
        { label: 'Other', color: '#D0D0D0' },
    ],
} satisfies StyleSpec & Binding;
