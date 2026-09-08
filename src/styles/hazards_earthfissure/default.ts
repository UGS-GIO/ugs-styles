/**
 * Earth Fissure Hazard — lines colored by `efhhazardunit` (well-located vs. suspected fissure vs.
 * lineament of unknown origin). Ported from the retiring GeoServer SLD hazards:earthfissure: 3
 * `PropertyIsEqualTo` rules, each a `LineSymbolizer` stroke, no else-rule. Colors are the SLD's
 * exact hexes; the grey `OTHER` is a MapLibre-only fallback — the SLD drew nothing for an unmapped
 * code, but a GL `match` must return one.
 *
 * Supersedes an earlier auto-seeded version of this same file (WMS GetLegendGraphic capture, one
 * flat StyleLayer[] with a hand-rolled `==` filter per rule, mislabeled `title: "polygon"` on a
 * line layer, no legend/field). This rewrite brings it to the same shape as every other module in
 * this batch: `matchByField`, a real title, and a legend. Colors/stroke-width are unchanged — both
 * versions read the same SLD.
 *
 * Stroke width: all 3 rules use the same SLD stroke-width (2.667px); rounded to 2.7 as a sensible
 * default (consistent with how this batch rounds elsewhere).
 *
 * NOTE (line-cap/line-join): the source SLD gives 2 of 3 rules `stroke-linecap: butt` and 1 rule
 * `stroke-linecap: round` (all 3 use `stroke-linejoin: round`). Flattened to a single `round`/`round`
 * layout for all classes — a minor cosmetic simplification (not a color/geometry change), noted here
 * rather than silently dropped.
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `categorical` archetype: that
 * archetype's line branch is a flat `line-width: 1.2` with no layout control
 * (src/archetypes/index.ts categorical()), whereas this layer wants the SLD's own width + a round
 * cap/join. The categorical color itself still uses the repo's `matchByField` helper
 * (src/expressions/categorical.ts).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed `hazards_earthfissure`,
 * matching every sibling hazards item in the live catalog (e.g. hazards_qfaults). GeoServer-only
 * today; no warehouse item exists for this layer yet, but build-json.ts keys renders on itemId, so
 * it has to already be the domain-prefixed shape the warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// The field the SLD keyed on.
const FIELD = 'efhhazardunit';

// efhhazardunit code -> exact stroke hex, from earthfissure.sld (rule order kept).
const EARTHFISSURE_STROKE: Record<string, string> = {
    'WLFefh': '#e60000',   // Well Located Earth Fissure
    'SFefh': '#a87000',    // Suspected Earth Fissure
    'Lefh': '#70a800',     // Lineament of Unknown Origin
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its stroke.
const EARTHFISSURE_LABELS: Record<string, string> = {
    'WLFefh': 'Well Located Earth Fissure',
    'SFefh': 'Suspected Earth Fissure',
    'Lefh': 'Lineament of Unknown Origin',
};

// Unmapped/blank codes -> grey (the categorical archetype's default fallback). Not a real data class.
const OTHER = '#BDBDBD';

const lineColor = matchByField(FIELD, EARTHFISSURE_STROKE, OTHER);

export const spec = {
    itemId: 'hazards_earthfissure',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Earth Fissure Hazard',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles;
    // 'Other' is the grey fallback above (unmapped codes), not a stored value.
    legend: [
        ...Object.entries(EARTHFISSURE_STROKE).map(([code, color]) => ({
            label: EARTHFISSURE_LABELS[code] ?? code,
            color,
        })),
        { label: 'Other', color: OTHER },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_earthfissure-line',
        type: 'line',
        paint: { 'line-color': lineColor, 'line-width': 2.7 },
        layout: { 'line-cap': 'round', 'line-join': 'round' },
    },
];

export default layers;
