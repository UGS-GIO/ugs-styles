/**
 * Rockfall Hazard — polygons colored by `rfhhazardunit` (the SLD classification field for this
 * layer), with a per-class stroke color (see NEEDS REVIEW notes — the source SLD mixes explicit
 * grey and default-black strokes). Ported from the retiring GeoServer SLD hazards:rockfall: 5
 * `PropertyIsEqualTo` rules, each a solid fill + stroke, no else-rule. Fills are the SLD's exact
 * colors; the grey `OTHER` is a MapLibre-only fallback — the SLD drew nothing for an unmapped
 * code, but a GL `match` must return one.
 *
 * NOTE (stroke width): source alternates 0.133px / 0.533px per class; flattened to one width
 * (stroke COLOR is kept per-class, see below).
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `categorical` archetype: that
 * archetype emits a single fill with a baked hairline `fill-outline-color` at 0.6 opacity
 * (src/archetypes/index.ts categorical()), whereas this layer needs a *separate* stroke as its
 * own `line` layer, faithful to the SLD. The categorical color itself still uses the repo's
 * `matchByField` helper (src/expressions/categorical.ts).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed `hazards_rockfall`,
 * matching every sibling hazards item in the live catalog (e.g. hazards_qfaults). GeoServer-only
 * today; no warehouse item exists for this layer yet, but build-json.ts keys renders on itemId,
 * so it has to already be the domain-prefixed shape the warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// The field the SLD keyed on.
const FIELD = 'rfhhazardunit';

// rfhhazardunit code -> exact fill hex, from rockfall.sld (rule order kept).
const ROCKFALL_FILL: Record<string, string> = {
    'VHrfh': '#e600a9',     // Very High Hazard
    'Hrfh': '#e60000',      // High Hazard
    'Mrfh': '#ffaa00',      // Moderate Hazard
    'Lrfh': '#38a800',      // Low Hazard
    'LHrfh': '#bf9470',     // Low Probability with High Hazard
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its fill.
const ROCKFALL_LABELS: Record<string, string> = {
    'VHrfh': 'Very High Hazard',
    'Hrfh': 'High Hazard',
    'Mrfh': 'Moderate Hazard',
    'Lrfh': 'Low Hazard',
    'LHrfh': 'Low Probability with High Hazard',
};

// Unmapped/blank codes -> grey (the categorical archetype's default fallback). Not a real data class.
const OTHER = '#BDBDBD';

const fillColor = matchByField(FIELD, ROCKFALL_FILL, OTHER);
// ROCKFALL_FILL codes above; NOT every rule set an explicit stroke color — some only set
// stroke-width, which per the SLD/GeoTools default resolves the color to #000000
// (verified: GeoTools StyleFactoryImpl.getDefaultStroke()). Reproduced here per-class, faithfully,
// rather than flattened to one color, because the source SLD is genuinely inconsistent
// (2 of 5 rules override to a lighter grey; the rest default to black).
const ROCKFALL_STROKE: Record<string, string> = {
    'VHrfh': '#000000',     // Very High Hazard
    'Hrfh': '#4e4e4e',      // High Hazard
    'Mrfh': '#000000',      // Moderate Hazard
    'Lrfh': '#4e4e4e',      // Low Hazard
    'LHrfh': '#000000',     // Low Probability with High Hazard
};

const strokeColor = matchByField(FIELD, ROCKFALL_STROKE, '#000000');

export const spec = {
    itemId: 'hazards_rockfall',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Rockfall Hazard',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles;
    // 'Other' is the grey fallback above (unmapped codes), not a stored value.
    legend: [
        ...Object.entries(ROCKFALL_FILL).map(([code, color]) => ({
            label: ROCKFALL_LABELS[code] ?? code,
            color,
        })),
        { label: 'Other', color: OTHER },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_rockfall-fill',
        type: 'fill',
        // SLD fill-opacity was 1.0 (solid) on every rule.
        paint: { 'fill-color': fillColor, 'fill-opacity': 1 },
    },
    {
        id: 'hazards_rockfall-line',
        type: 'line',
        paint: { 'line-color': strokeColor, 'line-width': 0.5 },
    },
];

export default layers;
