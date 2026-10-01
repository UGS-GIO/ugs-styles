import type { Binding, StyleSpec } from '../../types';
import { WETLANDS_STRESSORS_RAMP } from '../../palettes';

export const spec = {
    itemId: 'wetlands_stressors',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wetland Stressors',
    archetype: 'graduated',
    field: 'gridcode',
    palette: 'wetlands-stressors',
    values: [0, 1, 2, 3],
    opacity: 0.8,
    legend: [
        { label: 'None', color: WETLANDS_STRESSORS_RAMP[0] },
        { label: 'Low', color: WETLANDS_STRESSORS_RAMP[1] },
        { label: 'Moderate', color: WETLANDS_STRESSORS_RAMP[2] },
        { label: 'High', color: WETLANDS_STRESSORS_RAMP[3] },
    ],
} satisfies StyleSpec & Binding;
