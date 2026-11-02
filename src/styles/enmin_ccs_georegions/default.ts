/**
 * Hand-authored from live GeoServer: energy_mineral:enmin_ccus_georegions_current (GetStyles), for
 * the warehouse item that replaces it, emp.enmin_ccs_georegions_current.
 * The SLD uses a graphic/pattern fill that MapLibre GL can't represent (geostyler: "Mapbox only
 * supports Icons"), so the categorical fill + labels are translated by hand — faithful to the
 * CCUS storage-suitability ramp (ranking: Excellent / Moderate / Limited) + the region name labels.
 */
import type { Binding, StyleLayer } from '../../types';

// Lowercased `ranking` value -> fill, straight from the SLD.
const RANKING_COLORS = {
    excellent: '#3dc200',
    moderate: '#ffe700',
    limited: '#ff7e00',
} as const;

export const spec = {
    itemId: 'enmin_ccs_georegions',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CCUS geo-regions by storage ranking',
    field: 'ranking',
    legend: [
        { label: 'Excellent', value: 'excellent', color: RANKING_COLORS.excellent },
        { label: 'Moderate', value: 'moderate', color: RANKING_COLORS.moderate },
        { label: 'Limited', value: 'limited', color: RANKING_COLORS.limited },
    ],
} satisfies Binding & { render: string; field: string };

// One fill layer per `ranking` value (case-insensitive match — matches the project convention and
// the legend's per-category-layer derivation).
const fill = (value: string, color: string): StyleLayer => ({
    id: `enmin_ccs_georegions-${value}`,
    type: 'fill',
    paint: { 'fill-color': color, 'fill-opacity': 0.6, 'fill-outline-color': '#555555' },
    filter: ['==', ['downcase', ['to-string', ['get', 'ranking']]], value],
});

const layers: StyleLayer[] = [
    ...Object.entries(RANKING_COLORS).map(([value, color]) => fill(value, color)),
    {
        id: 'enmin_ccs_georegions-label',
        type: 'symbol',
        layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans Regular'],
            'text-size': 11,
        },
        paint: { 'text-color': '#000000', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.2 },
    },
];
export default layers;
