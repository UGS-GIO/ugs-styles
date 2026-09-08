/**
 * Borehole Locations — PLACEHOLDER cartography, NEEDS CARTOGRAPHIC REVIEW.
 *
 * The GeoServer SLD for hazards:boreholes_locations is `Name: generic` / `Title: Generic` —
 * GeoServer's built-in fallback style (an isCoverage raster rule, a grey-polygon rule, a blue-line
 * rule, and an ElseFilter red-square-point rule keyed on geometry dimension, not on any attribute
 * of this data). There is no authored symbology to port faithfully; this is not a real SLD for this
 * layer, so there is no "exact hex" to reproduce.
 *
 * This module is a simple single-color circle standing in until a cartographer picks real
 * symbology. Color/radius chosen only for basic visibility (a steady mid-blue, readable on both
 * light and dark basemaps), not from any source design.
 *
 * itemId = the warehouse STAC item id this render binds to: domain-prefixed
 * `hazards_boreholes_locations`, matching every sibling hazards item in the live catalog (e.g.
 * hazards_qfaults). GeoServer-only today; no warehouse item exists for this layer yet, but
 * build-json.ts keys renders on itemId, so it has to already be the domain-prefixed shape the
 * warehouse's attach_renders joins on.
 */
import type { Binding, StyleLayer } from '../../types';

// PLACEHOLDER — no source symbology to honor. Pick a different color/radius on cartographic review.
const FILL = '#2B6CB0';

export const spec = {
    itemId: 'hazards_boreholes_locations',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Borehole Locations',
    legend: [{ label: 'Borehole', color: FILL }],
} satisfies Binding & { render: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'hazards_boreholes_locations-circle',
        type: 'circle',
        paint: {
            'circle-color': FILL,
            'circle-radius': 4,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1,
        },
    },
];

export default layers;
