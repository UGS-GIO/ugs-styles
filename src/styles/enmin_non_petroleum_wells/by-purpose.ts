/**
 * Non-petroleum wells — symbolized by `purpose` with triangle icons. Companion to the UCRC wells
 * `by-purpose` render: same purpose → same color (from the shared ucrc-purpose tones), but a
 * triangle marker instead of a circle so the two wells layers are distinguishable on one map.
 *
 * `purpose` is stored as Esri coded-value-domain codes (C, SH, T, …). MapLibre has no triangle
 * primitive, so each color is a pre-baked triangle in a sprite sheet (scripts/gen-triangle-sprites.ts)
 * and this render stamps `icon-image = npwc-purpose-<code>`. Bespoke GL (not the point archetype) for
 * the icon + zoom-scaled size + the code→Unknown fallback.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom } from '../../expressions/categorical';
import {
    NPWC_PURPOSE_NAMESPACE,
    NPWC_PURPOSE_DESC,
    NPWC_PRESENT_CODES,
    NPWC_BLANK_CODE,
    npwcFill,
    npwcStroke,
} from '../../palettes/npwc-purpose';

export const spec = {
    itemId: 'enmin_non_petroleum_wells',
    render: 'by-purpose',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Non-petroleum wells by purpose',
    field: 'purpose',   // the attribute this render symbolizes (consumers wire filters to it)
    sprite: 'styles/enmin_non_petroleum_wells/sprite',  // relative to STYLES_CDN_BASE (no extension)
    // Explicit legend — the source of truth for this render's symbology. Each entry is a friendly
    // NPWC label with its color + the raw `purpose` code it rolls up (data stores the code, the
    // legend shows the label). Legends the values present in the live serving table; a code the
    // ingest adds later is baked + colored on the next publish, but is NOT added to this legend
    // automatically (hand-maintained snapshot, like the sibling wells layers).
    legend: NPWC_PRESENT_CODES.map((code) => ({
        label: NPWC_PURPOSE_DESC[code],
        color: npwcFill(code),
        stroke: npwcStroke(code),
        values: [{ value: code, color: npwcFill(code) }],
    })),
} satisfies Binding & {
    render: string;
    field: string;
    sprite: string;
    legend: { label: string; color: string; stroke: string; values: { value: string; color: string }[] }[];
};

// A blank/missing `purpose` is a real class in the data, not an error, so it resolves to the
// Unknown stand-in frame rather than `npwc-purpose-` (no such sprite → invisible well). Every stored
// code maps to its own baked frame — this assumes codes are stored unpadded (verified: {C,SH,T,U,W}),
// since the generator trims when baking but MapLibre has no trim expression to match here; a
// whitespace-padded code would miss its frame.
const code: ExpressionSpecification = [
    'case',
    ['==', ['coalesce', ['get', 'purpose'], ''], ''], NPWC_BLANK_CODE,
    ['to-string', ['get', 'purpose']],
];

// icon-image = `npwc-purpose-<the well's purpose code>`, matching a baked triangle frame.
const iconImage: ExpressionSpecification = ['concat', `${NPWC_PURPOSE_NAMESPACE}-`, code];

// Draw every non-Coal purpose on top of Coal: Coal is ~95% of wells, so with icon-allow-overlap the
// rare purposes would otherwise be buried under the Coal mass. Higher symbol-sort-key paints last.
const coalUnderneath: ExpressionSpecification = ['case', ['==', code, 'C'], 0, 1];

const layers: StyleLayer[] = [
    {
        id: 'enmin_non_petroleum_wells-purpose',
        type: 'symbol',
        layout: {
            'icon-image': iconImage,
            // Sized to match the UCRC wells by-purpose circles: the sprite triangle is 40px @1x, so
            // icon-size = (2 × that render's circle-radius) / 40 at each zoom stop.
            'icon-size': interpolateByZoom([[4, 0.15], [7, 0.275], [10, 0.4], [13, 0.55], [16, 0.7]]),
            'icon-allow-overlap': true,
            'symbol-sort-key': coalUnderneath,
        },
    },
];
export default layers;
