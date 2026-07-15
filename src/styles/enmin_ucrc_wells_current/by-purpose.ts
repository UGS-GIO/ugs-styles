/**
 * UCRC wells — symbolized by `purpose`. Ported from the authoritative vector style in
 * ugs-map-viewer (subsurface wells layer): zoom-interpolated radius + categorical fill/stroke
 * by `purpose`. Colors come from the ucrc-purpose palette (same values the viewer + GeoServer
 * SLD use). Bespoke GL (not the point archetype) so the zoom-scaled radius is preserved.
 */
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom, matchByField } from '../../expressions/categorical';
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE, UCRC_PURPOSE_LABELS } from '../../palettes/ucrc-purpose';

export const spec = {
    itemId: 'enmin_ucrc_wells',   // energy_mineral.enmin_ucrc_wells_current -> _current-stripped stem
    render: 'by-purpose',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC wells by purpose',
    field: 'purpose',   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology (fill + stroke per purpose). Flat
    // (no `values`): each entry's label IS the field value. Consumers derive colours from here.
    legend: UCRC_PURPOSE_LABELS.map((p) => ({
        label: p,
        color: UCRC_PURPOSE_FILL[p] ?? '#BDBDBD',
        stroke: UCRC_PURPOSE_STROKE[p] ?? '#858585',
    })),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string; stroke: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ucrc_wells-circle',
        type: 'circle',
        paint: {
            'circle-radius': interpolateByZoom([[4, 2], [7, 4], [10, 6], [13, 8], [16, 10]]),
            'circle-stroke-width': 1,
            'circle-opacity': 0.85,
            'circle-color': matchByField('purpose', UCRC_PURPOSE_FILL, UCRC_PURPOSE_FILL.Other ?? '#BDBDBD'),
            'circle-stroke-color': matchByField('purpose', UCRC_PURPOSE_STROKE, UCRC_PURPOSE_STROKE.Other ?? '#858585'),
        },
    },
];
export default layers;
