// Seeded from live GeoServer: https://ugs-geoserver-prod-flbcoqv7oa-uc.a.run.app/geoserver/hazards/wms?service=WMS&version=1.1.1&request=GetStyles&layers=hazards:merged_displacement_contours_test_all&styles=hazards_insar_displacement_cumulative (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_displacement_contours',
    render: 'cumulative',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "hazards_displacement_contours-0",
        "type": "fill",
        "paint": {
            "fill-color": "#AAAAAA"
        }
    },
    {
        "id": "hazards_displacement_contours-1",
        "type": "fill",
        "paint": {
            "fill-color": "#d87070"
        },
        "filter": [
            "all",
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -12
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-2",
        "type": "line",
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
                -12
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-3",
        "type": "fill",
        "paint": {
            "fill-color": "#e08878"
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -12
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -8
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-4",
        "type": "line",
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
                -12
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -8
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-5",
        "type": "fill",
        "paint": {
            "fill-color": "#e89888"
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -8
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -6
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-6",
        "type": "line",
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
                -8
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                -6
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-7",
        "type": "fill",
        "paint": {
            "fill-color": "#f0aa94"
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                -6
            ],
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-8",
        "type": "line",
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
                -6
            ],
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-9",
        "type": "fill",
        "paint": {
            "fill-color": "#f6ccb8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-10",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-11",
        "type": "fill",
        "paint": {
            "fill-color": "#f9dccb"
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
                -2
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-12",
        "type": "line",
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
                -2
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-13",
        "type": "fill",
        "paint": {
            "fill-color": "#fce8da"
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
                -1.2
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-14",
        "type": "line",
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
                -1.2
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-15",
        "type": "fill",
        "paint": {
            "fill-color": "#bea0d4"
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
                2
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-16",
        "type": "line",
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
                2
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-17",
        "type": "fill",
        "paint": {
            "fill-color": "#c0a8d0"
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
                3
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-18",
        "type": "line",
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
                3
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-19",
        "type": "fill",
        "paint": {
            "fill-color": "#a8b8d8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-20",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-21",
        "type": "fill",
        "paint": {
            "fill-color": "#88c0dc"
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
                "<",
                [
                    "get",
                    "value_inch"
                ],
                5
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-22",
        "type": "line",
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
                "<",
                [
                    "get",
                    "value_inch"
                ],
                5
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-23",
        "type": "fill",
        "paint": {
            "fill-color": "#a8d4e8"
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                6
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-24",
        "type": "line",
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
                5
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                6
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-25",
        "type": "fill",
        "paint": {
            "fill-color": "#c4e2f0"
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                6
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                8
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-26",
        "type": "line",
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
                6
            ],
            [
                "<",
                [
                    "get",
                    "value_inch"
                ],
                8
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-27",
        "type": "fill",
        "paint": {
            "fill-color": "#e0f0f8"
        },
        "filter": [
            "all",
            [
                ">=",
                [
                    "get",
                    "value_inch"
                ],
                8
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-28",
        "type": "line",
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
                8
            ],
            [
                "!",
                [
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-29",
        "type": "fill",
        "paint": {
            "fill-color": "#FFFFFF"
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
        "id": "hazards_displacement_contours-30",
        "type": "line",
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
    },
    {
        "id": "hazards_displacement_contours-31",
        "type": "fill",
        "paint": {
            "fill-color": "#d87070"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-32",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-33",
        "type": "fill",
        "paint": {
            "fill-color": "#e08878"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-34",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-35",
        "type": "fill",
        "paint": {
            "fill-color": "#e89888"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-36",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-37",
        "type": "fill",
        "paint": {
            "fill-color": "#f0aa94"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-38",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-39",
        "type": "fill",
        "paint": {
            "fill-color": "#f4bca4"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-40",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-41",
        "type": "fill",
        "paint": {
            "fill-color": "#f6ccb8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-42",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-43",
        "type": "fill",
        "paint": {
            "fill-color": "#f9dccb"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-44",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-45",
        "type": "fill",
        "paint": {
            "fill-color": "#fce8da"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-46",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-47",
        "type": "fill",
        "paint": {
            "fill-color": "#b088cc"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-48",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-49",
        "type": "fill",
        "paint": {
            "fill-color": "#bea0d4"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-50",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-51",
        "type": "fill",
        "paint": {
            "fill-color": "#c0a8d0"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-52",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-53",
        "type": "fill",
        "paint": {
            "fill-color": "#a8b8d8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-54",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-55",
        "type": "fill",
        "paint": {
            "fill-color": "#90b8d8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-56",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-57",
        "type": "fill",
        "paint": {
            "fill-color": "#88c0dc"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-58",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-59",
        "type": "fill",
        "paint": {
            "fill-color": "#a8d4e8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-60",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-61",
        "type": "fill",
        "paint": {
            "fill-color": "#c4e2f0"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-62",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-63",
        "type": "fill",
        "paint": {
            "fill-color": "#e0f0f8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-64",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -0.001
                    ],
                    [
                        "<=",
                        "value_inch",
                        0.001
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-65",
        "type": "fill",
        "paint": {
            "fill-color": "#FFFFFF"
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
        "id": "hazards_displacement_contours-66",
        "type": "line",
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
    },
    {
        "id": "hazards_displacement_contours-67",
        "type": "fill",
        "paint": {
            "fill-color": "#d87070"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-68",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-69",
        "type": "fill",
        "paint": {
            "fill-color": "#e08878"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-70",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-71",
        "type": "fill",
        "paint": {
            "fill-color": "#f0aa94"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-72",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-73",
        "type": "fill",
        "paint": {
            "fill-color": "#f4bca4"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-74",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-75",
        "type": "fill",
        "paint": {
            "fill-color": "#f6ccb8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-76",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-77",
        "type": "fill",
        "paint": {
            "fill-color": "#fce8da"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-78",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-79",
        "type": "fill",
        "paint": {
            "fill-color": "#bea0d4"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-80",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-81",
        "type": "fill",
        "paint": {
            "fill-color": "#a8b8d8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-82",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-83",
        "type": "fill",
        "paint": {
            "fill-color": "#90b8d8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-84",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-85",
        "type": "fill",
        "paint": {
            "fill-color": "#88c0dc"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-86",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-87",
        "type": "fill",
        "paint": {
            "fill-color": "#c4e2f0"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-88",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-89",
        "type": "fill",
        "paint": {
            "fill-color": "#e0f0f8"
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-90",
        "type": "line",
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
                    "&&",
                    [
                        ">=",
                        "value_inch",
                        -1.2
                    ],
                    [
                        "<=",
                        "value_inch",
                        1.2
                    ]
                ]
            ]
        ]
    },
    {
        "id": "hazards_displacement_contours-91",
        "type": "fill",
        "paint": {
            "fill-color": "#FFFFFF"
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
        "id": "hazards_displacement_contours-92",
        "type": "line",
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
