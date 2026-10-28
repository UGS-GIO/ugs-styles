// No upstream cartography (the GeoServer layer carries only GeoServer's generic geometry style).
// Sensible default: geochemistry field areas as semi-transparent purple polygons (matching the
// ccus_geochemistry point theme) + outline. Tune / categorize on `type` or `status` later if wanted.
import type { Binding, StyleLayer } from '../../types';

const FILL = '#8e7cc3';
const OUTLINE = '#5e35b1';

export const spec = {
    itemId: 'enmin_ccus_geochemfieldpolys',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Geochemistry field areas',
    legend: [{ label: 'Field with rock property data', color: FILL, stroke: OUTLINE }],
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccus_geochemfieldpolys-fill',
        type: 'fill',
        paint: { 'fill-color': FILL, 'fill-opacity': 0.35, 'fill-outline-color': OUTLINE },
    },
];
export default layers;
