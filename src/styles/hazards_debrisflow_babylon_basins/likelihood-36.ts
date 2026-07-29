/** Babylon fire — debris-flow likelihood in the source basins for a 36 mm/h design storm. */
import type { Binding, StyleLayer } from '../../types';
import { likelihoodLegend } from '../../palettes/pwfdf';
import { likelihoodColor } from '../../expressions/pwfdf';

export const spec = {
    itemId: 'hazards_debrisflow_babylon_basins',
    render: 'likelihood-36',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow likelihood — 36 mm/h',
    field: 'p_36',
    legend: likelihoodLegend(),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'babylon-basins-36-fill',
        type: 'fill',
        paint: { 'fill-color': likelihoodColor(36), 'fill-opacity': 0.75 },
    },
    {
        id: 'babylon-basins-36-line',
        type: 'line',
        paint: { 'line-color': '#4d4d4d', 'line-width': 0.4 },
    },
];
export default layers;
