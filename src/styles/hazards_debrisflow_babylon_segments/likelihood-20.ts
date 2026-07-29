/** Babylon fire — debris-flow likelihood per stream segment for a 20 mm/h design storm. */
import type { Binding, StyleLayer } from '../../types';
import { likelihoodLegend } from '../../palettes/pwfdf';
import { likelihoodColor } from '../../expressions/pwfdf';
import { interpolateByZoom } from '../../expressions/categorical';

export const spec = {
    itemId: 'hazards_debrisflow_babylon_segments',
    render: 'likelihood-20',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow likelihood — 20 mm/h',
    field: 'p_20',
    legend: likelihoodLegend(),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'babylon-segments-20',
        type: 'line',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
            'line-color': likelihoodColor(20),
            'line-width': interpolateByZoom([[8, 0.8], [12, 1.8], [16, 3.5]]),
        },
    },
];
export default layers;
