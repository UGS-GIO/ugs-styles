/**
 * Karst Features — sinkholes and breccia pipes as asterisk markers colored by `mkfhazardunit`,
 * matching the GeoServer SLD (hazards:karstfeatures). Both classes use the same ESRI "Transportation
 * & Civic" 0x72 asterisk mark at size 24, fill only (the SLD sets stroke-opacity 0), differing only
 * in color — Sinkhole #e60000, Breccia Pipe #a87000. MapLibre draws circles natively but no asterisk,
 * so each color is a pre-baked asterisk sprite (the `sprite` recipe below, baked by
 * scripts/gen-sprites.ts) and this render maps icon-image = karst-<code> per point. Bespoke GL (not
 * the point archetype) for the icon + zoom-scaled size.
 *
 * Supersedes the batch's first cut of this module (a plain circle stand-in for the glyph). Colors are
 * the SLD's exact hexes; the six-arm asterisk is the generator's match for the ESRI marker (see
 * scripts/gen-sprites.ts drawAsterisk).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed `hazards_karstfeatures`,
 * matching every sibling hazards item in the live catalog. GeoServer-only today; no warehouse item
 * exists for this layer yet, but build-json.ts keys renders on itemId.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom, matchByField } from '../../expressions/categorical';
import type { SpriteRecipe } from '../../sprites';

// The field the SLD keyed on.
const FIELD = 'mkfhazardunit';
const NS = 'karst';   // icon-image namespace: karst-<code>

// mkfhazardunit code -> exact asterisk color, from karstfeatures.sld (rule order kept).
const KARST_FILL: Record<string, string> = {
    'SHmkf': '#e60000',   // Sinkhole
    'BPmkf': '#a87000',   // Breccia Pipe
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its marker.
const KARST_LABELS: Record<string, string> = {
    'SHmkf': 'Sinkhole',
    'BPmkf': 'Breccia Pipe',
};

// Fallback frame for any unmapped/blank code — grey, baked so a point is never invisible, but NOT
// shown in the legend (the layer has only the two clean classes today). Not a real data class.
const OTHER = '#BDBDBD';
const OTHER_FRAME = `${NS}-other`;

export const spec = {
    itemId: 'hazards_karstfeatures',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Karst Features',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    sprite: 'styles/hazards_karstfeatures/sprite',   // relative to STYLES_CDN_BASE (no extension)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles.
    legend: Object.entries(KARST_FILL).map(([code, color]) => ({
        label: KARST_LABELS[code] ?? code,
        color,
    })),
} satisfies Binding & {
    render: string;
    field: string;
    sprite: string;
    legend: { label: string; color: string }[];
};

// Sprite recipe — baked by scripts/gen-sprites.ts. One asterisk frame per code from a declared
// constant list (reproducible, no build-time network), plus the grey fallback frame the icon-image
// match falls through to. Keys stay in lockstep with the legend + the icon-image match below.
export const sprite: SpriteRecipe = {
    shape: 'asterisk',
    values: { constant: [...Object.keys(KARST_FILL), 'OTHER'] },
    cells: (codes) => codes.map((c) => c === 'OTHER'
        ? { names: [OTHER_FRAME], fill: OTHER }
        : { names: [`${NS}-${c}`], fill: KARST_FILL[c] ?? OTHER }),
};

// icon-image = the baked asterisk for the point's mkfhazardunit; unmapped/blank falls to the grey
// frame, so a point always draws.
const KARST_FRAMES: Record<string, string> = Object.fromEntries(
    Object.keys(KARST_FILL).map((c) => [c, `${NS}-${c}`]),
);
const iconImage: ExpressionSpecification = matchByField(FIELD, KARST_FRAMES, OTHER_FRAME);

const layers: StyleLayer[] = [
    {
        id: 'hazards_karstfeatures-symbol',
        type: 'symbol',
        layout: {
            'icon-image': iconImage,
            // SLD mark size is 24; the baked asterisk cell is 40px @1x, so ~0.6 renders ≈24px. Gentle
            // zoom ramp so the marker stays legible without dominating at high zoom.
            'icon-size': interpolateByZoom([[4, 0.4], [8, 0.5], [12, 0.6], [16, 0.75]]),
            'icon-allow-overlap': true,
        },
    },
];
export default layers;
