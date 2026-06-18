// Seeded from live GeoServer: energy_mineral:enmin_ccus_geochemistry_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccus_geochemistry',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "energy_minerals_ccus_geochemistry_style",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_ccus_geochemistry-0",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#7B1FA2",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#4A148C"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "datatype"
                    ]
                ]
            ],
            "core analysis"
        ]
    },
    {
        "id": "enmin_ccus_geochemistry-1",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#AB47BC",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#4A148C"
        },
        "filter": [
            "in",
            "average",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "datatype"
                    ]
                ]
            ]
        ]
    },
    {
        "id": "enmin_ccus_geochemistry-2",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#CE93D8",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#4A148C"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "datatype"
                    ]
                ]
            ],
            "salinity only"
        ]
    }
];
export default layers;
