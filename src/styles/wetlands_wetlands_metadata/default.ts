import type { Binding, StyleSpec } from '../../types';

export const spec = {
    itemId: 'wetlands_wetlands_metadata',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wetland Project Information',
    archetype: 'categorical',
    field: 'decade',
    palette: 'wetlands-decade',
    legend: [
        { label: '1980s', color: '#C2523C' },
        { label: '1990s', color: '#F7DB07' },
        { label: '2000s', color: '#0EC445' },
        { label: '2010s', color: '#0B2C7A' },
        { label: '2020s', color: '#9900FF' },
        { label: 'Unknown', color: '#CCCCCC' },
    ],
} satisfies StyleSpec & Binding;
