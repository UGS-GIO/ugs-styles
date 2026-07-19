// Seeded from live GeoServer WMS GetLegendGraphic (style='hazards_insar_displacement_velocity'), one-time capture.
// GetLegendGraphic is used rather than GetStyles because GetStyles ignores the style selector and returns
// the layer's whole merged rule set — which previously made all three displacement renders identical.
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_displacement_contours',
    render: 'velocity',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "hazards_displacement_contours-0",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_1",
            "ugs:title": "< -1.5 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#d87070",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -1.5
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-1",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_1",
            "ugs:title": "< -1.5 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -1.5
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-2",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_2",
            "ugs:title": "-1.5 – -1.2 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#e08878",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -1.5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -1.2
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-3",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_2",
            "ugs:title": "-1.5 – -1.2 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -1.5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -1.2
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-4",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_3",
            "ugs:title": "-1.2 – -0.9 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#e89888",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -1.2
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.9
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-5",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_3",
            "ugs:title": "-1.2 – -0.9 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -1.2
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.9
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-6",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_4",
            "ugs:title": "-0.9 – -0.6 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#f0aa94",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.9
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.6
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-7",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_4",
            "ugs:title": "-0.9 – -0.6 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.9
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.6
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-8",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_5",
            "ugs:title": "-0.6 – -0.45 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#f4bca4",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.6
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.45
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-9",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_5",
            "ugs:title": "-0.6 – -0.45 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.6
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.45
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-10",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_6",
            "ugs:title": "-0.45 – -0.3 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#f6ccb8",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.45
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.3
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-11",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_6",
            "ugs:title": "-0.45 – -0.3 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.45
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.3
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-12",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_7",
            "ugs:title": "-0.3 – -0.15 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#f9dccb",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.15
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-13",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_7",
            "ugs:title": "-0.3 – -0.15 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.15
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-14",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_8",
            "ugs:title": "-0.15 – -0.075 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#fce8da",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.15
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.075
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-15",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_8",
            "ugs:title": "-0.15 – -0.075 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.15
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -0.075
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-16",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_9",
            "ugs:title": "-0.075 – 0.075 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#b088cc",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.075
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.075
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-17",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_9",
            "ugs:title": "-0.075 – 0.075 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.075
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.075
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-18",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_10",
            "ugs:title": "0.075 – 0.15 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#bea0d4",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.075
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.15
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-19",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_10",
            "ugs:title": "0.075 – 0.15 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.075
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.15
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-20",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_11",
            "ugs:title": "0.15 – 0.3 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#c0a8d0",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.15
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.3
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-21",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_11",
            "ugs:title": "0.15 – 0.3 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.15
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.3
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-22",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_12",
            "ugs:title": "0.3 – 0.45 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#a8b8d8",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.45
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-23",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_12",
            "ugs:title": "0.3 – 0.45 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.45
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-24",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_13",
            "ugs:title": "0.45 – 0.6 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#90b8d8",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.45
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.6
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-25",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_13",
            "ugs:title": "0.45 – 0.6 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.45
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.6
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-26",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_14",
            "ugs:title": "0.6 – 0.9 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#88c0dc",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.6
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.9
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-27",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_14",
            "ugs:title": "0.6 – 0.9 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.6
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                0.9
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-28",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_15",
            "ugs:title": "0.9 – 1.2 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#a8d4e8",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.9
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                1.2
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-29",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_15",
            "ugs:title": "0.9 – 1.2 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                0.9
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                1.2
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-30",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_16",
            "ugs:title": "1.2 – 1.5 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#c4e2f0",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                1.2
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                1.5
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-31",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_16",
            "ugs:title": "1.2 – 1.5 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                1.2
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                1.5
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-32",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_17",
            "ugs:title": "> 1.5 in/period",
            "ugs:zero": false
        },
        "paint": {
            "fill-color": "#e0f0f8",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                1.5
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-33",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_17",
            "ugs:title": "> 1.5 in/period",
            "ugs:zero": false
        },
        "paint": {
            "line-color": "#444444",
            "line-width": 0.3
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                1.5
            ],
            [
                "!",
                [
                    "all",
                    [
                        ">=",
                        [
                            "get",
                            "value_inch"
                        ],
                        -0.001
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-34",
        "type": "fill",
        "metadata": {
            "ugs:rule": "Zero",
            "ugs:title": "0 in/period",
            "ugs:zero": true
        },
        "paint": {
            "fill-color": "#ffffff",
            "fill-opacity": 0.85
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.001
            ],
            [
                "<=",
                [
                    "get",
                    "value_inch"
                ],
                0.001
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-35",
        "type": "line",
        "metadata": {
            "ugs:rule": "Zero",
            "ugs:title": "0 in/period",
            "ugs:zero": true
        },
        "paint": {
            "line-color": "#cccccc",
            "line-width": 0.5
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -0.001
            ],
            [
                "<=",
                [
                    "get",
                    "value_inch"
                ],
                0.001
            ]
        ]
    }
];
export default layers;
