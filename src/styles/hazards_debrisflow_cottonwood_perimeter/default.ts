/** Cottonwood fire perimeter — context outline for the debris-flow assessment layers. */
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_perimeter',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Cottonwood fire perimeter',
    legend: [{ label: 'Fire perimeter', color: '#7f2704' }],
} satisfies Binding & { render: string; legend: { label: string; color: string }[] };

// Barely-there wash: this sits under the basins/segments renders, so it has to read as an extent
// rather than compete with the likelihood ramp on top of it.
const layers: StyleLayer[] = [
    {
        id: 'cottonwood-perimeter-fill',
        type: 'fill',
        paint: { 'fill-color': '#7f2704', 'fill-opacity': 0.06 },
    },
    {
        id: 'cottonwood-perimeter-line',
        type: 'line',
        paint: { 'line-color': '#7f2704', 'line-width': 1.8, 'line-dasharray': [3, 1.5] },
    },
];
export default layers;
