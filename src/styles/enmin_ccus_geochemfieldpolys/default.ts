// No upstream cartography (the GeoServer layer carries only GeoServer's generic geometry style).
// Sensible default: geochemistry field areas as semi-transparent purple polygons (matching the
// ccus_geochemistry point theme) + outline + `label` labels. Tune / categorize on `type` or
// `status` later if wanted.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccus_geochemfieldpolys',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Geochemistry field areas',
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccus_geochemfieldpolys-fill',
        type: 'fill',
        paint: { 'fill-color': '#8e7cc3', 'fill-opacity': 0.35, 'fill-outline-color': '#5e35b1' },
    },
    {
        id: 'enmin_ccus_geochemfieldpolys-label',
        type: 'symbol',
        layout: { 'text-field': '{label}', 'text-font': ['Arial'], 'text-size': 10 },
        paint: { 'text-color': '#311b92', 'text-halo-color': '#ffffff', 'text-halo-width': 1.2 },
    },
];
export default layers;
