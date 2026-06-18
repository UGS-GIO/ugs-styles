// Seeded from GeoServer SLD: hazards_qFaults_style.sld (geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_qfaults',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Quaternary_Faults",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "hazards_qfaults-0",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#e60000",
            "line-width": 2,
            "line-offset": 0
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<150"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "well constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-1",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#e69800",
            "line-width": 2,
            "line-offset": 0
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<15,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "well constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-2",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#e69800",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<15,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "moderately constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-3",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#e69800",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<15,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "inferred"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-4",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#4ce600",
            "line-width": 2,
            "line-offset": 0
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<130,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "well constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-5",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#4ce600",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<130,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "moderately constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-6",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#4ce600",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<130,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "inferred"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-7",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#005ce6",
            "line-width": 2,
            "line-offset": 0
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<750,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "well constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-8",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#005ce6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<750,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "moderately constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-9",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#005ce6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<750,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "inferred"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-10",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#000000",
            "line-width": 2,
            "line-offset": 0
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<2,600,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "well constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-11",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#000000",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<2,600,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "moderately constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-12",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#000000",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "<2,600,000"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "inferred"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-13",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#a900e6",
            "line-width": 2,
            "line-offset": 0
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "undetermined"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "well constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-14",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#a900e6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "undetermined"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "moderately constrained"
            ]
        ]
    },
    {
        "id": "hazards_qfaults-15",
        "type": "line",
        "paint": {
            "line-opacity": 1,
            "line-color": "#a900e6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
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
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "faultage"
                        ]
                    ]
                ],
                "undetermined"
            ],
            [
                "==",
                [
                    "downcase",
                    [
                        "to-string",
                        [
                            "get",
                            "mappingconstraint"
                        ]
                    ]
                ],
                "inferred"
            ]
        ]
    }
];
export default layers;
