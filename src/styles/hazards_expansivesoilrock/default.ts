/**
 * Expansive Soil and Rock Susceptibility — polygons colored by `exshazardunit` (the SLD
 * classification field for this layer), with a uniform black stroke (SLD default). Ported from
 * the retiring GeoServer SLD hazards:expansivesoilrock: 8 `PropertyIsEqualTo` rules, each a
 * solid fill + stroke, no else-rule. Fills are the SLD's exact colors; the grey `OTHER` is a
 * MapLibre-only fallback — the SLD drew nothing for an unmapped code, but a GL `match` must
 * return one.
 *
 * Stroke color: none of the 8 rules set a CssParameter name="stroke" (only stroke-width), so
 * color falls to the SLD/GeoTools default #000000 (verified: GeoTools
 * StyleFactoryImpl.getDefaultStroke()).
 *
 * NOTE (stroke width): source alternates 0.133px (soil classes) / 0.533px (rock classes);
 * flattened to one width.
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `categorical` archetype: that
 * archetype emits a single fill with a baked hairline `fill-outline-color` at 0.6 opacity
 * (src/archetypes/index.ts categorical()), whereas this layer needs a *separate* stroke as its
 * own `line` layer, faithful to the SLD. The categorical color itself still uses the repo's
 * `matchByField` helper (src/expressions/categorical.ts).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed
 * `hazards_expansivesoilrock`, matching every sibling hazards item in the live catalog (e.g.
 * hazards_qfaults). GeoServer-only today; no warehouse item exists for this layer yet, but
 * build-json.ts keys renders on itemId, so it has to already be the domain-prefixed shape the
 * warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// The field the SLD keyed on.
const FIELD = 'exshazardunit';

// exshazardunit code -> exact fill hex, from expansivesoilrock.sld (rule order kept).
const EXPANSIVE_FILL: Record<string, string> = {
    'HSexs': '#ff0000',     // Highly Susceptible Soil
    'HRexs': '#ff7f7f',     // Highly Susceptible Rock
    'MSexs': '#ffaa00',     // Moderately Susceptible Soil
    'MRexs': '#ffd37f',     // Moderately Susceptible Rock
    'LSexs': '#38a800',     // Low Susceptibility Soil
    'LRexs': '#55ff00',     // Low Susceptibility Rock
    'HCexs': '#73c4e0',     // Concealed
    'Uexs': '#cccccc',      // Area Unlikely to Contain Expansive Soil or Rock
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its fill.
const EXPANSIVE_LABELS: Record<string, string> = {
    'HSexs': 'Highly Susceptible Soil',
    'HRexs': 'Highly Susceptible Rock',
    'MSexs': 'Moderately Susceptible Soil',
    'MRexs': 'Moderately Susceptible Rock',
    'LSexs': 'Low Susceptibility Soil',
    'LRexs': 'Low Susceptibility Rock',
    'HCexs': 'Concealed',
    'Uexs': 'Area Unlikely to Contain Expansive Soil or Rock',
};

// Unmapped/blank codes -> grey (the categorical archetype's default fallback). Not a real data class.
const OTHER = '#BDBDBD';

const fillColor = matchByField(FIELD, EXPANSIVE_FILL, OTHER);
const strokeColor = '#000000';

export const spec = {
    itemId: 'hazards_expansivesoilrock',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Expansive Soil and Rock Susceptibility',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles;
    // 'Other' is the grey fallback above (unmapped codes), not a stored value.
    legend: [
        ...Object.entries(EXPANSIVE_FILL).map(([code, color]) => ({
            label: EXPANSIVE_LABELS[code] ?? code,
            color,
        })),
        { label: 'Other', color: OTHER },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_expansivesoilrock-fill',
        type: 'fill',
        // SLD fill-opacity was 1.0 (solid) on every rule.
        paint: { 'fill-color': fillColor, 'fill-opacity': 1 },
    },
    {
        id: 'hazards_expansivesoilrock-line',
        type: 'line',
        paint: { 'line-color': strokeColor, 'line-width': 0.5 },
    },
];

export default layers;
