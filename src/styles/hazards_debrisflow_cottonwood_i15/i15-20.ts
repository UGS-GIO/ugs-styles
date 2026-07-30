/** Low Cottonwood — post-fire debris-flow runout extent for a 20 mm/h design storm. */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { PWFDF_RUNOUT_CLASSES } from '../../palettes/pwfdf';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_i15',
    render: 'i15-20',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow runout — 20 mm/h',
    field: 'dfsi_thr',
    legend: PWFDF_RUNOUT_CLASSES.map((c) => ({ label: c.label, color: c.color })),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

// The item holds all four design storms; each render draws only its own. They're independent
// scenarios, so stacking them would composite unrelated model runs into one blob.
const scenario: ExpressionSpecification = ['==', ['number', ['get', 'i15'], -1], 20];
const thr: ExpressionSpecification = ['number', ['get', 'dfsi_thr'], -1];

// `dfsi_thr` is a double — matched by window rather than `== 0.3`, which is how a class silently
// draws nothing. Emitted low threshold first so the tightest (highest-threshold) extent lands on top.
const layers: StyleLayer[] = PWFDF_RUNOUT_CLASSES.map((c, n): StyleLayer => {
    const bounds: ExpressionSpecification[] = [];
    if (c.lo !== null) bounds.push(['>=', thr, c.lo]);
    if (c.hi !== null) bounds.push(['<', thr, c.hi]);
    return {
        id: `cottonwood-i15-20-thr${n}`,
        type: 'fill',
        filter: ['all', scenario, ...bounds],
        paint: { 'fill-color': c.color, 'fill-opacity': 0.85 },
    };
});
export default layers;
