// Seeded from live GeoServer WMS GetLegendGraphic (style='hazards_insar_displacement_yearly'), one-time capture.
// GetLegendGraphic is used rather than GetStyles because GetStyles ignores the style selector and returns
// the layer's whole merged rule set — which previously made all three displacement renders identical.
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_displacement_contours',
    render: 'yearly',
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
            "ugs:title": "< -4 in",
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
                -4
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "< -4 in",
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
                -4
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-4 – -3 in",
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
                -4
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -3
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-4 – -3 in",
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
                -4
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -3
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-3 – -2.5 in",
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
                -3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -2.5
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-3 – -2.5 in",
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
                -3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -2.5
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-2.5 – -2 in",
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
                -2.5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -2
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-2.5 – -2 in",
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
                -2.5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -2
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-2 – -1.5 in",
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
                -2
            ],
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-2 – -1.5 in",
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
                -2
            ],
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-1.5 – -1.2 in",
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
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
            "ugs:title": "-1.5 – -1.2 in",
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-12",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_8",
            "ugs:title": "1.2 – 1.5 in",
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-13",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_8",
            "ugs:title": "1.2 – 1.5 in",
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-14",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_9",
            "ugs:title": "1.5 – 2 in",
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
                1.5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                2
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-15",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_9",
            "ugs:title": "1.5 – 2 in",
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
                "<",
                [
                    "get",
                    "value_inch"
                ],
                2
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-16",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_10",
            "ugs:title": "2 – 2.5 in",
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
                2
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                2.5
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-17",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_10",
            "ugs:title": "2 – 2.5 in",
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
                2
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                2.5
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-18",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_11",
            "ugs:title": "2.5 – 3 in",
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
                2.5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                3
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-19",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_11",
            "ugs:title": "2.5 – 3 in",
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
                2.5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                3
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-20",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_12",
            "ugs:title": "3 – 4 in",
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
                3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                4
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-21",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_12",
            "ugs:title": "3 – 4 in",
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
                3
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                4
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-22",
        "type": "fill",
        "metadata": {
            "ugs:rule": "class_13",
            "ugs:title": "> 4 in",
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
                4
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-23",
        "type": "line",
        "metadata": {
            "ugs:rule": "class_13",
            "ugs:title": "> 4 in",
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
                4
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
                        -1.2
                    ],
                    [
                        "<=",
                        [
                            "get",
                            "value_inch"
                        ],
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-24",
        "type": "fill",
        "metadata": {
            "ugs:rule": "Zero",
            "ugs:title": "-1.2 – 1.2 in (within uncertainty)",
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
                -1.2
            ],
            [
                "<=",
                [
                    "get",
                    "value_inch"
                ],
                1.2
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-25",
        "type": "line",
        "metadata": {
            "ugs:rule": "Zero",
            "ugs:title": "-1.2 – 1.2 in (within uncertainty)",
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
                -1.2
            ],
            [
                "<=",
                [
                    "get",
                    "value_inch"
                ],
                1.2
            ]
        ]
    }
];
export default layers;
