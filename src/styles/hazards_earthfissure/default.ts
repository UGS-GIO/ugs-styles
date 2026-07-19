// Seeded from live GeoServer WMS GetLegendGraphic (style='hazards_earthfissure_style'), one-time capture.
// GetLegendGraphic is used rather than GetStyles because GetStyles ignores the style selector and returns
// the layer's whole merged rule set — which previously made all three displacement renders identical.
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_earthfissure',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "hazards_earthfissure-0",
        "type": "line",
        "metadata": {
            "ugs:rule": "Well_Located_Earth_Fissure",
            "ugs:title": "Well Located Earth Fissure",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#e60000",
            "line-width": 2.6666666666666665
        },
        "layout": {
            "line-cap": "butt",
            "line-join": "round"
        },
        "filter": [
            "all",
            [
                "==",
                [
                    "get",
                    "efhhazardunit"
                ],
                "WLFefh"
            ]
        ]
    },
    {
        "id": "hazards_earthfissure-1",
        "type": "line",
        "metadata": {
            "ugs:rule": "Suspected_Earth_Fissure",
            "ugs:title": "Suspected Earth Fissure",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#a87000",
            "line-width": 2.6666666666666665
        },
        "layout": {
            "line-cap": "butt",
            "line-join": "round"
        },
        "filter": [
            "all",
            [
                "==",
                [
                    "get",
                    "efhhazardunit"
                ],
                "SFefh"
            ]
        ]
    },
    {
        "id": "hazards_earthfissure-2",
        "type": "line",
        "metadata": {
            "ugs:rule": "Lineament_of_Unknown_Origin",
            "ugs:title": "Lineament of Unknown Origin",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#70a800",
            "line-width": 2.6666666666666665
        },
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "filter": [
            "all",
            [
                "==",
                [
                    "get",
                    "efhhazardunit"
                ],
                "Lefh"
            ]
        ]
    }
];
export default layers;
