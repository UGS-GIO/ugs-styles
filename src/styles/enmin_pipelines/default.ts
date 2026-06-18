// Seeded from GeoServer SLD: energy_minerals_pipelines_style.sld (geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_pipelines',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "pipelines",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_pipelines-0",
        "type": "line",
        "paint": {
            "line-width": 4
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "carbon dioxide"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "carbon dioxide (co2)"
            ]
        ]
    },
    {
        "id": "enmin_pipelines-1",
        "type": "line",
        "paint": {
            "line-color": "#7d079a",
            "line-width": 3
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "carbon dioxide"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "carbon dioxide (co2)"
            ]
        ]
    },
    {
        "id": "enmin_pipelines-2",
        "type": "line",
        "paint": {
            "line-width": 4
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "crude oil"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum (20 mb/d)"
            ]
        ]
    },
    {
        "id": "enmin_pipelines-3",
        "type": "line",
        "paint": {
            "line-color": "#33a02c",
            "line-width": 3
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "crude oil"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum (20 mb/d)"
            ]
        ]
    },
    {
        "id": "enmin_pipelines-4",
        "type": "line",
        "paint": {
            "line-width": 4
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "liquid natural gas"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "liquified petroleum gases (lpg)"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "natural gas"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "hydrogen sulfide bearing product"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "gas gathering"
            ]
        ]
    },
    {
        "id": "enmin_pipelines-5",
        "type": "line",
        "paint": {
            "line-color": "#e31a1c",
            "line-width": 3
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "liquid natural gas"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "liquified petroleum gases (lpg)"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "natural gas"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "hydrogen sulfide bearing product"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "gas gathering"
            ]
        ]
    },
    {
        "id": "enmin_pipelines-6",
        "type": "line",
        "paint": {
            "line-width": 4
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum product"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum products"
            ]
        ]
    },
    {
        "id": "enmin_pipelines-7",
        "type": "line",
        "paint": {
            "line-color": "#6bff08",
            "line-width": 3
        },
        "layout": {
            "line-join": "bevel"
        },
        "filter": [
            "any",
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum product"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "commodity"
                        ]
                    ]
                ],
                "petroleum products"
            ]
        ]
    }
];
export default layers;
