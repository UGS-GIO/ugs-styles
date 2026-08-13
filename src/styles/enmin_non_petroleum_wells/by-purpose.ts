/**
 * Non-petroleum wells — symbolized by `purpose` with triangle icons. Companion to the UCRC wells
 * `by-purpose` render: same purpose → same color (from the shared ucrc-purpose tones), but a
 * triangle marker instead of a circle so the two wells layers are distinguishable on one map.
 *
 * `purpose` is stored as Esri coded-value-domain codes (C, SH, T, …). MapLibre has no triangle
 * primitive, so each purpose color is a pre-baked triangle (the `sprite` recipe below, baked by
 * scripts/gen-sprites.ts) and this render maps `icon-image = npwc-purpose-<code>` per well. Bespoke
 * GL (not the point archetype) for the icon + zoom-scaled size.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom, matchByField } from '../../expressions/categorical';
import type { SpriteRecipe } from '../../sprites';
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
    // legend shows the label). NPWC_PRESENT_CODES is the single declared list this legend, the sprite
    // bake, and the icon-image match all read, so the three can't drift; extending the layer to a new
    // code is a one-line edit there.
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

// Sprite recipe — baked by scripts/gen-sprites.ts. One triangle frame per purpose code, from the
// declared NPWC_PRESENT_CODES constant rather than live data, so the sheet is a function of the
// commit (reproducible, no build-time network) and stays in lockstep with the legend + icon-image
// match. Unknown ('U') is in that list, so the blank/missing stand-in frame is always baked.
export const sprite: SpriteRecipe = {
    shape: 'triangle',
    // Always bake the Unknown stand-in, even if it were dropped from the present list — the
    // icon-image match falls back to its frame, so it must exist (mirrors by-boxtype's unconditional
    // no-codes disc). `U` is already in NPWC_PRESENT_CODES today, so this is a no-op belt for now.
    values: { constant: [...new Set<string>([...NPWC_PRESENT_CODES, NPWC_BLANK_CODE])] },
    cells: (codes) => codes.map((c) => ({
        names: [`${NPWC_PURPOSE_NAMESPACE}-${c}`],
        fill: npwcFill(c),
        stroke: npwcStroke(c),
    })),
};

// icon-image = the baked frame for the well's `purpose`. Keyed on the SAME declared list the sprite
// is baked from, so it can never ask for a frame that wasn't baked: any unlisted or blank/missing
// value (coalesced to '') falls through to the Unknown frame, so a well always draws — no invisible
// markers, no string-concat foot-gun.
const NPWC_FRAMES: Record<string, string> = Object.fromEntries(
    NPWC_PRESENT_CODES.map((c) => [c, `${NPWC_PURPOSE_NAMESPACE}-${c}`]),
);
const iconImage: ExpressionSpecification = matchByField('purpose', NPWC_FRAMES, `${NPWC_PURPOSE_NAMESPACE}-${NPWC_BLANK_CODE}`);

// Draw every non-Coal purpose on top of Coal: Coal is ~95% of wells, so with icon-allow-overlap the
// rare purposes would otherwise be buried under the Coal mass. Higher symbol-sort-key paints last.
const coalUnderneath: ExpressionSpecification = ['case', ['==', ['get', 'purpose'], 'C'], 0, 1];

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
