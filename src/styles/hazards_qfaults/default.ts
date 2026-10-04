// Seeded from live GeoServer: hazards:hazards_qfaults_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
// Uses the handwritten StyleLayer[] escape hatch because one coded field (`qffhazardunit`) sets both
// the color (fault age) and the dash (mapping constraint), which no archetype draws.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_qfaults',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Quaternary faults by age and mapping constraint',
    // One entry per layer below, in the same order. Labels from the GeoServer SLD rule titles.
    // Line style carries the constraint: solid = well constrained, long dash = moderately, short dash = inferred.
    legend: [
        { label: '<150 years, well constrained', color: '#e60000' },
        { label: '<15,000 years, well constrained', color: '#e69800' },
        { label: '<15,000 years, moderately constrained', color: '#e69800' },
        { label: '<15,000 years, inferred', color: '#e69800' },
        { label: '<130,000 years, well constrained', color: '#4ce600' },
        { label: '<130,000 years, moderately constrained', color: '#4ce600' },
        { label: '<130,000 years, inferred', color: '#4ce600' },
        { label: '<750,000 years, well constrained', color: '#005ce6' },
        { label: '<750,000 years, moderately constrained', color: '#005ce6' },
        { label: '<750,000 years, inferred', color: '#005ce6' },
        { label: '<2.6 million years, well constrained', color: '#000000' },
        { label: '<2.6 million years, moderately constrained', color: '#000000' },
        { label: '<2.6 million years, inferred', color: '#000000' },
        { label: 'Undetermined age, well constrained', color: '#a900e6' },
        { label: 'Undetermined age, moderately constrained', color: '#a900e6' },
        { label: 'Undetermined age, inferred', color: '#a900e6' },
    ],
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "hazards_qfaults-0",
        "type": "line",
        "paint": {
            "line-color": "#e60000",
            "line-width": 2,
            "line-offset": 0
        },
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u150wcqff"
        ]
    },
    {
        "id": "hazards_qfaults-1",
        "type": "line",
        "paint": {
            "line-color": "#e69800",
            "line-width": 2,
            "line-offset": 0
        },
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u15kwcqff"
        ]
    },
    {
        "id": "hazards_qfaults-2",
        "type": "line",
        "paint": {
            "line-color": "#e69800",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u15kmcqff"
        ]
    },
    {
        "id": "hazards_qfaults-3",
        "type": "line",
        "paint": {
            "line-color": "#e69800",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u15kiqff"
        ]
    },
    {
        "id": "hazards_qfaults-4",
        "type": "line",
        "paint": {
            "line-color": "#4ce600",
            "line-width": 2,
            "line-offset": 0
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u130kwcqff"
        ]
    },
    {
        "id": "hazards_qfaults-5",
        "type": "line",
        "paint": {
            "line-color": "#4ce600",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u130kmcqff"
        ]
    },
    {
        "id": "hazards_qfaults-6",
        "type": "line",
        "paint": {
            "line-color": "#4ce600",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u130kiqff"
        ]
    },
    {
        "id": "hazards_qfaults-7",
        "type": "line",
        "paint": {
            "line-color": "#005ce6",
            "line-width": 2,
            "line-offset": 0
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u750kwcqff"
        ]
    },
    {
        "id": "hazards_qfaults-8",
        "type": "line",
        "paint": {
            "line-color": "#005ce6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u750kmcqff"
        ]
    },
    {
        "id": "hazards_qfaults-9",
        "type": "line",
        "paint": {
            "line-color": "#005ce6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u750kiqff"
        ]
    },
    {
        "id": "hazards_qfaults-10",
        "type": "line",
        "paint": {
            "line-color": "#000000",
            "line-width": 2,
            "line-offset": 0
        },
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u2600kwcqff"
        ]
    },
    {
        "id": "hazards_qfaults-11",
        "type": "line",
        "paint": {
            "line-color": "#000000",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u2600kmcqff"
        ]
    },
    {
        "id": "hazards_qfaults-12",
        "type": "line",
        "paint": {
            "line-color": "#000000",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "u2600kiqff"
        ]
    },
    {
        "id": "hazards_qfaults-13",
        "type": "line",
        "paint": {
            "line-color": "#a900e6",
            "line-width": 2,
            "line-offset": 0
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "udwcqff"
        ]
    },
    {
        "id": "hazards_qfaults-14",
        "type": "line",
        "paint": {
            "line-color": "#a900e6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                8,
                2
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "udmcqff"
        ]
    },
    {
        "id": "hazards_qfaults-15",
        "type": "line",
        "paint": {
            "line-color": "#a900e6",
            "line-width": 2,
            "line-offset": 0,
            "line-dasharray": [
                3,
                3
            ]
        },
        "layout": {
            "line-join": "round"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "qffhazardunit"
                    ]
                ]
            ],
            "udiqff"
        ]
    }
];
export default layers;
