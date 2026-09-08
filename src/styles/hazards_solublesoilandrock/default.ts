/**
 * Soluble Soil and Rock Susceptibility — polygons colored by `slshazardunit` (the SLD
 * classification field for this layer), with a uniform black stroke (SLD default). Ported from
 * the retiring GeoServer SLD hazards:solublesoilandrock: 10 `PropertyIsEqualTo` rules, each a
 * solid fill + stroke, no else-rule. Fills are the SLD's exact colors; the grey `OTHER` is a
 * MapLibre-only fallback — the SLD drew nothing for an unmapped code, but a GL `match` must
 * return one.
 *
 * Stroke color: none of the 10 rules set a CssParameter name="stroke" (only stroke-width), so
 * color falls to the SLD/GeoTools default #000000 (verified: GeoTools
 * StyleFactoryImpl.getDefaultStroke()).
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `categorical` archetype: that
 * archetype emits a single fill with a baked hairline `fill-outline-color` at 0.6 opacity
 * (src/archetypes/index.ts categorical()), whereas this layer needs a *separate* stroke as its
 * own `line` layer, faithful to the SLD. The categorical color itself still uses the repo's
 * `matchByField` helper (src/expressions/categorical.ts).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed
 * `hazards_solublesoilandrock`, matching every sibling hazards item in the live catalog (e.g.
 * hazards_qfaults). GeoServer-only today; no warehouse item exists for this layer yet, but
 * build-json.ts keys renders on itemId, so it has to already be the domain-prefixed shape the
 * warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// The field the SLD keyed on.
const FIELD = 'slshazardunit';

// slshazardunit code -> exact fill hex, from solublesoilandrock.sld (rule order kept).
const SOLUBLE_FILL: Record<string, string> = {
    'GSHsls': '#e60000',    // Highly Soluble Soil Units
    'GS1sls': '#ff7f7f',    // Soil Units of Gypsiferous Silt
    'GS2sls': '#6ba000',    // Soil Units (Gypsum Bearing) Mapped by the NRCS
    'GRHsls': '#a3c400',    // Bedrock Units that Contain Gypsum
    'GR1sls': '#deea00',    // Highly Soluble Bedrock Units with Abundant Gypsum
    'GR2sls': '#ffe900',    // Bedrock Units that Lack Massive Gypsum Deposits
    'GR3sls': '#ffbb00',    // Bedrock Units that Contain Gypsum in Greater or Lesser Amounts
    'GBRsls': '#ff9000',    // Buried or Embedded Gypsiferous Rock Units
    'LR1sls': '#ff6100',    // Limestone Bedrock Units
    'LGRsls': '#732600',    // Bedrock Units that Contain Significant Amounts of Both Limestone and Gypsum
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its fill.
const SOLUBLE_LABELS: Record<string, string> = {
    'GSHsls': 'Highly Soluble Soil Units',
    'GS1sls': 'Soil Units of Gypsiferous Silt',
    'GS2sls': 'Soil Units (Gypsum Bearing) Mapped by the NRCS',
    'GRHsls': 'Bedrock Units that Contain Gypsum',
    'GR1sls': 'Highly Soluble Bedrock Units with Abundant Gypsum',
    'GR2sls': 'Bedrock Units that Lack Massive Gypsum Deposits',
    'GR3sls': 'Bedrock Units that Contain Gypsum in Greater or Lesser Amounts',
    'GBRsls': 'Buried or Embedded Gypsiferous Rock Units',
    'LR1sls': 'Limestone Bedrock Units',
    'LGRsls': 'Bedrock Units that Contain Significant Amounts of Both Limestone and Gypsum',
};

// Unmapped/blank codes -> grey (the categorical archetype's default fallback). Not a real data class.
const OTHER = '#BDBDBD';

const fillColor = matchByField(FIELD, SOLUBLE_FILL, OTHER);
const strokeColor = '#000000';

export const spec = {
    itemId: 'hazards_solublesoilandrock',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Soluble Soil and Rock Susceptibility',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles;
    // 'Other' is the grey fallback above (unmapped codes), not a stored value.
    legend: [
        ...Object.entries(SOLUBLE_FILL).map(([code, color]) => ({
            label: SOLUBLE_LABELS[code] ?? code,
            color,
        })),
        { label: 'Other', color: OTHER },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_solublesoilandrock-fill',
        type: 'fill',
        // SLD fill-opacity was 1.0 (solid) on every rule.
        paint: { 'fill-color': fillColor, 'fill-opacity': 1 },
    },
    {
        id: 'hazards_solublesoilandrock-line',
        type: 'line',
        paint: { 'line-color': strokeColor, 'line-width': 0.5 },
    },
];

export default layers;
