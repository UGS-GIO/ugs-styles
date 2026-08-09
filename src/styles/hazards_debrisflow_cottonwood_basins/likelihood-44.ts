/** Cottonwood — debris-flow likelihood in the source basins for a 44 mm/h design storm. */
import type { Binding, StyleLayer } from '../../types';
import { likelihoodLegend } from '../../palettes/pwfdf';
import { likelihoodColorEitherCase } from '../../expressions/pwfdf';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_basins',
    render: 'likelihood-44',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow likelihood — 44 mm/h',
    field: 'p_44',
    legend: likelihoodLegend(),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'cottonwood-basins-44-fill',
        type: 'fill',
        paint: { 'fill-color': likelihoodColorEitherCase(44), 'fill-opacity': 0.75 },
    },
    {
        id: 'cottonwood-basins-44-line',
        type: 'line',
        paint: { 'line-color': '#4d4d4d', 'line-width': 0.4 },
    },
];
export default layers;
