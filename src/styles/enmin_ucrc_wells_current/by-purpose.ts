/**
 * UCRC wells — symbolized by `purpose`. Ported from the authoritative vector style in
 * ugs-map-viewer (subsurface wells layer): zoom-interpolated radius + categorical fill/stroke
 * by `purpose`. Colors come from the ucrc-purpose palette (same values the viewer + GeoServer
 * SLD use). Bespoke GL (not the point archetype) so the zoom-scaled radius is preserved.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom, matchByValue } from '../../expressions/categorical';
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE, UCRC_WELLS_PURPOSE_LABELS } from '../../palettes/ucrc-purpose';

// Wells with a blank/missing `purpose` are a real class in the data, not a data error, so they
// get their own 'Unknown' swatch rather than silently sharing grey with unmapped values ('Other').
const purpose: ExpressionSpecification = [
    'case',
    ['==', ['coalesce', ['get', 'purpose'], ''], ''], 'Unknown',
    ['to-string', ['get', 'purpose']],
];

export const spec = {
    itemId: 'enmin_ucrc_wells',   // energy_mineral.enmin_ucrc_wells_current -> _current-stripped stem
    render: 'by-purpose',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC wells by purpose',
    field: 'purpose',   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology (fill + stroke per purpose). Flat
    // (no `values`): each entry's label IS the field value. Consumers derive colours from here.
    // Legends only THIS layer's vocabulary — the palette also carries wells_spatial's older names
    // for the same categories (Mining / Building or Construction), which draw nothing here.
    legend: UCRC_WELLS_PURPOSE_LABELS.map((p) => ({
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
            'circle-radius': interpolateByZoom([[4, 3], [7, 5.5], [10, 8], [13, 11], [16, 14]]),
            'circle-stroke-width': 1,
            'circle-opacity': 0.85,
            'circle-color': matchByValue(purpose, UCRC_PURPOSE_FILL, UCRC_PURPOSE_FILL.Other ?? '#BDBDBD'),
            'circle-stroke-color': matchByValue(purpose, UCRC_PURPOSE_STROKE, UCRC_PURPOSE_STROKE.Other ?? '#858585'),
        },
    },
];
export default layers;
