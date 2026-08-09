/** Cottonwood — debris-flow likelihood per stream segment for a 16 mm/h design storm. */
import type { Binding, StyleLayer } from '../../types';
import { likelihoodLegend } from '../../palettes/pwfdf';
import { likelihoodColorEitherCase } from '../../expressions/pwfdf';
import { interpolateByZoom } from '../../expressions/categorical';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_segments',
    render: 'likelihood-16',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow likelihood — 16 mm/h',
    field: 'p_16',
    legend: likelihoodLegend(),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'cottonwood-segments-16',
        type: 'line',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
            'line-color': likelihoodColorEitherCase(16),
            'line-width': interpolateByZoom([[8, 0.8], [12, 1.8], [16, 3.5]]),
        },
    },
];
export default layers;
