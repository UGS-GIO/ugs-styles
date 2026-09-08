/**
 * Landslide inventory ("Mapped Landslides") — polygons colored by `lsfhazardunit` (the landslide
 * feature / hazard-unit code), with a uniform black outline. Ported from the retiring GeoServer SLD
 * hazards:landslideinventory: 14 `PropertyIsEqualTo` rules, each a solid fill + a uniform black
 * stroke (0.533 px), no else-rule. Fills are the SLD's exact colors; the grey `OTHER` is a
 * MapLibre-only fallback — the SLD drew nothing for an unmapped code, but a GL `match` must return
 * one.
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `categorical` archetype: that
 * archetype emits a single fill with a baked hairline `fill-outline-color` at 0.6 opacity
 * (src/archetypes/index.ts categorical()), whereas this layer needs a *separate* solid black
 * outline as its own `line` layer, faithful to the SLD. The categorical color itself still uses the
 * repo's `matchByField` helper (src/expressions/categorical.ts), so the code→color lookup is the
 * one shared idiom rather than hand-rolled `match` JSON.
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed `{schema}_{table}` with
 * `_current` stripped, i.e. `hazards_landslideinventory`. That matches this dir and every sibling
 * hazards item in the live catalog — verified, e.g. hazards_qfaults is
 * `{ id: 'hazards_qfaults', collection: 'hazards' }` — so the schema is BOTH the id prefix and the
 * collection name, not one or the other. This layer is GeoServer-only today (no warehouse item
 * exists for it yet), but the manifest (scripts/build-json.ts) keys renders on `itemId`, so the id
 * has to already be the domain-prefixed shape the warehouse's `attach_renders` joins on — a bare
 * `landslideinventory` would silently never attach.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// The field the SLD keyed on — also the viewer's hazard-unit join key
// (ugs-map-viewer layers-pmtiles.tsx → unitdescriptions_current on `lsfhazardunit`).
const FIELD = 'lsfhazardunit';

// lsfhazardunit code → exact fill hex, from hazards_landslideinventory_style.sld (rule order kept).
const LANDSLIDE_FILL: Record<string, string> = {
    CBlsf: '#e60000',    // Cliff Band
    CDFlsf: '#d2f49f',   // Channel/Debris Flow
    DFSAlsf: '#64c3ef',  // Debris Flow Source Area
    DFlsf: '#f9a7aa',    // Debris Flow
    EFlsf: '#5eed71',    // Earth Flow
    FPSTlsf: '#f4b164',  // Fall-Prone Slope Talus
    FPSlsf: '#bf96e8',   // Fall-Prone Slope
    MSlsf: '#5e5b91',    // Main Scarp
    Olsf: '#876543',     // Outcrop
    RSlsf: '#d8f259',    // Rotational Slide
    TBSlsf: '#5befdb',   // Translational Block Slide
    TDSlsf: '#53875e',   // Translational Debris Slide
    TPSTlsf: '#4a4ad3',  // Topple-Prone Slope Talus
    Ulsf: '#8c3352',     // Mapped Landslide
};

// Human labels for the legend — the SLD rule Titles, keyed by code so a swatch matches its fill.
const LANDSLIDE_LABELS: Record<string, string> = {
    CBlsf: 'Cliff Band',
    CDFlsf: 'Channel/Debris Flow',
    DFSAlsf: 'Debris Flow Source Area',
    DFlsf: 'Debris Flow',
    EFlsf: 'Earth Flow',
    FPSTlsf: 'Fall-Prone Slope Talus',
    FPSlsf: 'Fall-Prone Slope',
    MSlsf: 'Main Scarp',
    Olsf: 'Outcrop',
    RSlsf: 'Rotational Slide',
    TBSlsf: 'Translational Block Slide',
    TDSlsf: 'Translational Debris Slide',
    TPSTlsf: 'Topple-Prone Slope Talus',
    Ulsf: 'Mapped Landslide',
};

// Unmapped/blank codes → grey (the categorical archetype's default fallback). Not a real data class.
const OTHER = '#BDBDBD';

const fillColor = matchByField(FIELD, LANDSLIDE_FILL, OTHER);

export const spec = {
    itemId: 'hazards_landslideinventory',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Landslides by hazard unit',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the SLD rule titles;
    // 'Other' is the grey fallback above (unmapped codes), not a stored value.
    legend: [
        ...Object.entries(LANDSLIDE_FILL).map(([code, color]) => ({
            label: LANDSLIDE_LABELS[code] ?? code,
            color,
        })),
        { label: 'Other', color: OTHER },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_landslideinventory-fill',
        type: 'fill',
        // SLD fill-opacity was 1.0 (solid). The app applies its own layer opacity (the viewer sets
        // 0.75 on this layer), so the style stays solid and lets the app own basemap blend.
        paint: { 'fill-color': fillColor, 'fill-opacity': 1 },
    },
    {
        id: 'hazards_landslideinventory-line',
        type: 'line',
        // Uniform black outline: SLD stroke #000000, width 0.533 → 0.5, opacity 1 (the GL default).
        paint: { 'line-color': '#000000', 'line-width': 0.5 },
    },
];

export default layers;
