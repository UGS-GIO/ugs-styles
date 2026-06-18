// Seeded from GeoServer SLD: energy_minerals_oil_gas_style.sld (geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_oilgasfields_ogm',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "oilgasfields",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_oilgasfields_ogm-0",
        "type": "fill",
        "paint": {
            "fill-color": "#fdbf6f"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "co2"
        ]
    },
    {
        "id": "enmin_oilgasfields_ogm-1",
        "type": "line",
        "paint": {
            "line-color": "#232323"
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "co2"
        ]
    },
    {
        "id": "enmin_oilgasfields_ogm-2",
        "type": "fill",
        "paint": {
            "fill-color": "#e31a1c"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "gas"
        ]
    },
    {
        "id": "enmin_oilgasfields_ogm-3",
        "type": "line",
        "paint": {
            "line-color": "#232323"
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "gas"
        ]
    },
    {
        "id": "enmin_oilgasfields_ogm-4",
        "type": "fill",
        "paint": {
            "fill-color": "#33a02c"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "oil"
        ]
    },
    {
        "id": "enmin_oilgasfields_ogm-5",
        "type": "line",
        "paint": {
            "line-color": "#232323"
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "oil"
        ]
    },
    {
        "id": "enmin_oilgasfields_ogm-6",
        "type": "fill",
        "paint": {
            "fill-color": "#ad42f5"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "coalbed methane"
        ]
    },
    {
        "id": "enmin_oilgasfields_ogm-7",
        "type": "line",
        "paint": {
            "line-color": "#232323"
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "type"
                    ]
                ]
            ],
            "coalbed methane"
        ]
    }
];
export default layers;
