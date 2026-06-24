// No upstream cartography (the GeoServer layer carries only a generic gray fill, and this is the
// US Census/TIGER county set — `cbsafp` = Core-Based Statistical Area, not carbon basin). Sensible
// default: county boundaries as context — outline + faint fill + name labels. Tune freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccus_cbcounty',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'County boundaries',
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccus_cbcounty-fill',
        type: 'fill',
        paint: { 'fill-color': '#cfd8dc', 'fill-opacity': 0.12 },
    },
    {
        id: 'enmin_ccus_cbcounty-line',
        type: 'line',
        paint: { 'line-color': '#607d8b', 'line-width': 1 },
    },
    {
        id: 'enmin_ccus_cbcounty-label',
        type: 'symbol',
        layout: { 'text-field': '{name20}', 'text-font': ['Arial'], 'text-size': 11 },
        paint: { 'text-color': '#37474f', 'text-halo-color': '#ffffff', 'text-halo-width': 1.2 },
    },
];
export default layers;
