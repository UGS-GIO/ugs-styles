import type { Binding, StyleSpec } from '../../types';
import { WETLANDS_DECADE_FILL } from '../../palettes';

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
        { label: '1980s', color: WETLANDS_DECADE_FILL['1980s'] },
        { label: '1990s', color: WETLANDS_DECADE_FILL['1990s'] },
        { label: '2000s', color: WETLANDS_DECADE_FILL['2000s'] },
        { label: '2010s', color: WETLANDS_DECADE_FILL['2010s'] },
        { label: '2020s', color: WETLANDS_DECADE_FILL['2020s'] },
        { label: 'Unknown', color: WETLANDS_DECADE_FILL['Unknown'] },
    ],
} satisfies StyleSpec & Binding;
