/** Babylon fire — debris-flow likelihood per stream segment for a 32 mm/h design storm. */
import type { Binding, StyleLayer } from '../../types';
import { likelihoodLegend } from '../../palettes/pwfdf';
import { likelihoodColor } from '../../expressions/pwfdf';
import { interpolateByZoom } from '../../expressions/categorical';

export const spec = {
    itemId: 'hazards_debrisflow_babylon_segments',
    render: 'likelihood-32',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow likelihood — 32 mm/h',
    field: 'p_32',
    legend: likelihoodLegend(),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'babylon-segments-32',
        type: 'line',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
            'line-color': likelihoodColor(32),
            'line-width': interpolateByZoom([[8, 0.8], [12, 1.8], [16, 3.5]]),
        },
    },
];
export default layers;
