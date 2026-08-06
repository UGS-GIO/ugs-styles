// Seeded from live GeoServer: energy_mineral:enmin_plss_sections_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_plss_sections',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "energy_minerals_plss_sections_style",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
//
// The section outline was lost in the seed: the SLD's PolygonSymbolizer is
// `<Fill fill-opacity="0"/><Stroke/>`, and the empty `<Stroke/>` — SLD 1.0 defaults, black 1px —
// came through as a fill with no paint, which the build then dropped, leaving labels only (#34).
// Re-read from prod GeoServer GetStyles (energy_minerals_plss_sections_style, 2026-07-29) and
// republished as the `line` it always was. `minzoom` matches MaxScaleDenominator 250000.
const layers: StyleLayer[] = [
    {
        "id": "enmin_plss_sections-0",
        "minzoom": 11.126916814491269,
        "type": "line",
        "paint": {
            "line-color": "#000000",
            "line-width": 1
        }
    },
    {
        "id": "enmin_plss_sections-1",
        "minzoom": 11.126916814491269,
        "type": "symbol",
        "paint": {
            "text-opacity": 1,
            "text-color": "#000000"
        },
        "layout": {
            "text-field": "{frstdivlab}",
            "text-font": [
                "Arial"
            ],
            "text-size": 8,
            "symbol-placement": "point"
        }
    }
];
export default layers;
