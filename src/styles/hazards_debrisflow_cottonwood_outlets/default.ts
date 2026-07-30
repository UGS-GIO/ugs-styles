/** Cottonwood — drainage outlet of each modelled source basin. */
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom } from '../../expressions/categorical';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_outlets',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Basin outlets',
    legend: [{ label: 'Basin outlet', color: '#1a1a1a' }],
} satisfies Binding & { render: string; legend: { label: string; color: string }[] };

// The layer carries no model attributes — it marks WHERE each basin discharges, so it's a plain
// locator drawn over the likelihood ramp, light-ringed to stay visible on the dark 80-100% class.
const layers: StyleLayer[] = [
    {
        id: 'cottonwood-outlets',
        type: 'circle',
        paint: {
            'circle-radius': interpolateByZoom([[8, 2], [12, 3.5], [16, 5]]),
            'circle-color': '#1a1a1a',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 0.8,
        },
    },
];
export default layers;
