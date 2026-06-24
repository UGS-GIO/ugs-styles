// Hand-authored from live GeoServer: energy_mineral:enmin_ccus_georegions_current (GetStyles).
// The SLD uses a graphic/pattern fill that MapLibre GL can't represent (geostyler: "Mapbox only
// supports Icons"), so the categorical fill + labels are translated by hand — faithful to the
// CCUS storage-suitability ramp (ranking: Excellent / Moderate / Limited) + the `name` labels.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccus_cbgeoregion',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CCUS geo-regions by storage ranking',
} satisfies Binding & { render: string };

// One fill layer per `ranking` value (case-insensitive match — matches the project convention and
// the legend's per-category-layer derivation). Colors straight from the SLD.
const fill = (value: string, color: string): StyleLayer => ({
    id: `enmin_ccus_cbgeoregion-${value}`,
    type: 'fill',
    paint: { 'fill-color': color, 'fill-opacity': 0.6, 'fill-outline-color': '#555555' },
    filter: ['==', ['downcase', ['to-string', ['get', 'ranking']]], value],
});

const layers: StyleLayer[] = [
    fill('excellent', '#3dc200'),
    fill('moderate', '#ffe700'),
    fill('limited', '#ff7e00'),
    {
        id: 'enmin_ccus_cbgeoregion-label',
        type: 'symbol',
        layout: { 'text-field': '{name}', 'text-font': ['Arial'], 'text-size': 11 },
        paint: { 'text-color': '#000000', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.2 },
    },
];
export default layers;
