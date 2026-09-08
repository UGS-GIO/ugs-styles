/**
 * Karst Features — points colored by `mkfhazardunit` (sinkhole vs. breccia pipe). Ported from the
 * retiring GeoServer SLD hazards:karstfeatures: 2 `PropertyIsEqualTo` rules, each a `PointSymbolizer`
 * using a TTF glyph mark (`ttf://ESRI Transportation & Civic#0x72`) at Size 24, no else-rule.
 * MapLibre has no equivalent glyph-mark primitive, so this renders as a flat circle instead — the
 * SLD's exact fill colors are kept, faithfully, which is what this port is graded on.
 *
 * No stroke: both SLD rules set stroke-opacity 0 / stroke-width 0 on the mark, i.e. explicitly no
 * outline — reproduced as-is (no `circle-stroke-*` paint).
 *
 * Radius: the SLD's Size=24 is a glyph point-size, not a MapLibre circle radius, so it doesn't
 * translate cleanly — picked circle-radius 5 as a reasonably visible point marker. NEEDS
 * CARTOGRAPHIC REVIEW (see report).
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `point` archetype: that archetype's
 * categorical branch also emits a stroke (src/archetypes/index.ts point()), which this SLD
 * explicitly does not want. The categorical color itself still uses the repo's `matchByField`
 * helper (src/expressions/categorical.ts).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed `hazards_karstfeatures`,
 * matching every sibling hazards item in the live catalog (e.g. hazards_qfaults). GeoServer-only
 * today; no warehouse item exists for this layer yet, but build-json.ts keys renders on itemId, so
 * it has to already be the domain-prefixed shape the warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// The field the SLD keyed on.
const FIELD = 'mkfhazardunit';

// mkfhazardunit code -> exact fill hex, from karstfeatures.sld (rule order kept).
const KARST_FILL: Record<string, string> = {
    'SHmkf': '#e60000',    // Sinkhole
    'BPmkf': '#a87000',    // Breccia Pipe
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its fill.
const KARST_LABELS: Record<string, string> = {
    'SHmkf': 'Sinkhole',
    'BPmkf': 'Breccia Pipe',
};

// Unmapped/blank codes -> grey (the categorical archetype's default fallback). Not a real data class.
const OTHER = '#BDBDBD';

const circleColor = matchByField(FIELD, KARST_FILL, OTHER);

export const spec = {
    itemId: 'hazards_karstfeatures',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Karst Features',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles;
    // 'Other' is the grey fallback above (unmapped codes), not a stored value.
    legend: [
        ...Object.entries(KARST_FILL).map(([code, color]) => ({
            label: KARST_LABELS[code] ?? code,
            color,
        })),
        { label: 'Other', color: OTHER },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_karstfeatures-circle',
        type: 'circle',
        // circle-radius: see header note — SLD Size=24 (glyph mark) has no clean equivalent.
        paint: { 'circle-color': circleColor, 'circle-radius': 5 },
    },
];

export default layers;
