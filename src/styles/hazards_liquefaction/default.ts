/**
 * Liquefaction Susceptibility — polygons colored by `lqshazardunit` (the SLD classification
 * field for this layer), with a uniform grey stroke (#6e6e6e). Ported from the retiring
 * GeoServer SLD hazards:liquefaction: 5 `PropertyIsEqualTo` rules, each a solid fill + stroke,
 * no else-rule. Fills are the SLD's exact colors; the grey `OTHER` is a MapLibre-only fallback —
 * the SLD drew nothing for an unmapped code, but a GL `match` must return one.
 *
 * Stroke color: SLD stroke #6e6e6e (explicit CssParameter, uniform across all 5 rules).
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `categorical` archetype: that
 * archetype emits a single fill with a baked hairline `fill-outline-color` at 0.6 opacity
 * (src/archetypes/index.ts categorical()), whereas this layer needs a *separate* stroke as its
 * own `line` layer, faithful to the SLD. The categorical color itself still uses the repo's
 * `matchByField` helper (src/expressions/categorical.ts).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed
 * `hazards_liquefaction`, matching every sibling hazards item in the live catalog (e.g.
 * hazards_qfaults). GeoServer-only today; no warehouse item exists for this layer yet, but
 * build-json.ts keys renders on itemId, so it has to already be the domain-prefixed shape the
 * warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// The field the SLD keyed on.
const FIELD = 'lqshazardunit';

// lqshazardunit code -> exact fill hex, from liquefaction.sld (rule order kept).
const LIQUEFACTION_FILL: Record<string, string> = {
    'VHlqs': '#e60000',     // Very High Susceptibility
    'Hlqs': '#d2897a',      // High Susceptibility
    'Mlqs': '#dadca4',      // Moderate Susceptibility
    'Llqs': '#1fb75e',      // Low Susceptibility
    'VLlqs': '#7fe2e4',     // Very Low Susceptibility
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its fill.
const LIQUEFACTION_LABELS: Record<string, string> = {
    'VHlqs': 'Very High Susceptibility',
    'Hlqs': 'High Susceptibility',
    'Mlqs': 'Moderate Susceptibility',
    'Llqs': 'Low Susceptibility',
    'VLlqs': 'Very Low Susceptibility',
};

// Unmapped/blank codes -> grey (the categorical archetype's default fallback). Not a real data class.
const OTHER = '#BDBDBD';

const fillColor = matchByField(FIELD, LIQUEFACTION_FILL, OTHER);
const strokeColor = '#6e6e6e';

export const spec = {
    itemId: 'hazards_liquefaction',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Liquefaction Susceptibility',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles;
    // 'Other' is the grey fallback above (unmapped codes), not a stored value.
    legend: [
        ...Object.entries(LIQUEFACTION_FILL).map(([code, color]) => ({
            label: LIQUEFACTION_LABELS[code] ?? code,
            color,
        })),
        { label: 'Other', color: OTHER },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_liquefaction-fill',
        type: 'fill',
        // SLD fill-opacity was 1.0 (solid) on every rule.
        paint: { 'fill-color': fillColor, 'fill-opacity': 1 },
    },
    {
        id: 'hazards_liquefaction-line',
        type: 'line',
        paint: { 'line-color': strokeColor, 'line-width': 0.5 },
    },
];

export default layers;
