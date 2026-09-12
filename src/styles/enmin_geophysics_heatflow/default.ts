/**
 * Heat-flow measurement points — a single purple circle, ported 1:1 from the retiring GeoServer SLD
 * energy_mineral:enmin_geophysics_heatflow (one PointSymbolizer: WellKnownName circle, fill #7d00ff,
 * stroke #232323 @ 0.5, Size 7 → radius 3.5). No classification field; every point draws the same.
 *
 * Bespoke escape hatch (default-export StyleLayer[]) rather than the `point` archetype: keeps the
 * SLD's exact fill/stroke/radius instead of the archetype's defaults. itemId is the domain-prefixed
 * warehouse STAC item id the render binds to.
 */
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_geophysics_heatflow',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Heat Flow',
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_geophysics_heatflow-0',
        type: 'circle',
        paint: {
            'circle-radius': 3.5,
            'circle-color': '#7d00ff',
            'circle-stroke-width': 0.5,
            'circle-stroke-color': '#232323',
        },
    },
];

export default layers;
