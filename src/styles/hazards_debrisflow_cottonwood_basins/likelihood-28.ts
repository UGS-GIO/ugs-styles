/** Cottonwood — debris-flow likelihood in the source basins for a 28 mm/h design storm. */
import type { Binding, StyleLayer } from '../../types';
import { likelihoodLegend } from '../../palettes/pwfdf';
import { likelihoodColorEitherCase } from '../../expressions/pwfdf';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_basins',
    render: 'likelihood-28',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow likelihood — 28 mm/h',
    field: 'p_28',
    legend: likelihoodLegend(),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'cottonwood-basins-28-fill',
        type: 'fill',
        paint: { 'fill-color': likelihoodColorEitherCase(28), 'fill-opacity': 0.75 },
    },
    {
        id: 'cottonwood-basins-28-line',
        type: 'line',
        paint: { 'line-color': '#4d4d4d', 'line-width': 0.4 },
    },
];
export default layers;
