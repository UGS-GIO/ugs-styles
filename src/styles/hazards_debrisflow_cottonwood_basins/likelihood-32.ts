/** Cottonwood — debris-flow likelihood in the source basins for a 32 mm/h design storm. */
import type { Binding, StyleLayer } from '../../types';
import { likelihoodLegend } from '../../palettes/pwfdf';
import { likelihoodColorEitherCase } from '../../expressions/pwfdf';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_basins',
    render: 'likelihood-32',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Debris-flow likelihood — 32 mm/h',
    field: 'p_32',
    // Pre-staged: the live basins parquet ships p_20/40/60/80; this storm set lands with the
    // PWFDF-R ingest. `validate` warns instead of failing until then — clear this when it does.
    pending: 'ALL-5461',
    legend: likelihoodLegend(),
} satisfies Binding & { render: string; field: string; pending?: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'cottonwood-basins-32-fill',
        type: 'fill',
        paint: { 'fill-color': likelihoodColorEitherCase(32), 'fill-opacity': 0.75 },
    },
    {
        id: 'cottonwood-basins-32-line',
        type: 'line',
        paint: { 'line-color': '#4d4d4d', 'line-width': 0.4 },
    },
];
export default layers;
