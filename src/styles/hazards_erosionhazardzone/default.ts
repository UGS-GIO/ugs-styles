/**
 * Erosion Hazard Zones — a single flat fill, no attribute classification. Ported from the retiring
 * GeoServer SLD hazards:erosionhazardzone: exactly one `Rule` with no `Filter` (applies to every
 * feature) and an empty `<sld:Title/>`, one `PolygonSymbolizer` fill + one stroke-width-only
 * `PolygonSymbolizer`. No `matchByField` here — archetype B (single-fill polygon), unlike the
 * categorical hazards layers.
 *
 * Stroke color: the SLD's Stroke element sets only stroke-width (0.533px), no CssParameter
 * name="stroke", so color falls to the SLD/GeoTools default #000000 (verified: GeoTools
 * StyleFactoryImpl.getDefaultStroke()).
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed
 * `hazards_erosionhazardzone`, matching every sibling hazards item in the live catalog (e.g.
 * hazards_qfaults). GeoServer-only today; no warehouse item exists for this layer yet, but
 * build-json.ts keys renders on itemId, so it has to already be the domain-prefixed shape the
 * warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';

// SLD fill (exact hex, the rule's only CssParameter).
const FILL = '#ffaa00';
// SLD default stroke color (no explicit CssParameter name="stroke" in the source rule).
const STROKE = '#000000';

export const spec = {
    itemId: 'hazards_erosionhazardzone',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Erosion Hazard Zones',
    // Single-fill layer: one legend swatch (the SLD rule carried no Title of its own — the
    // style-level Title "Erosion Hazard Zones" stands in, singularized for a swatch label).
    legend: [{ label: 'Erosion Hazard Zone', color: FILL }],
} satisfies Binding & { render: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_erosionhazardzone-fill',
        type: 'fill',
        // SLD fill-opacity was 1.0 (solid).
        paint: { 'fill-color': FILL, 'fill-opacity': 1 },
    },
    {
        id: 'hazards_erosionhazardzone-line',
        type: 'line',
        paint: { 'line-color': STROKE, 'line-width': 0.5 },
    },
];

export default layers;
