// Seeded from live GeoServer: ../sldStyleFiles/energy_minerals/energy_minerals_wells_style.sld (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ogm_wells',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "wellswithtops_hascore",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_ogm_wells-0",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#e54baa",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "carbon dioxide well"
        ]
    },
    {
        "id": "enmin_ogm_wells-1",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#aced8d",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "dry hole"
        ]
    },
    {
        "id": "enmin_ogm_wells-2",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#fbff10",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "gas injection well"
        ]
    },
    {
        "id": "enmin_ogm_wells-3",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#12d82c",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "gas storage well"
        ]
    },
    {
        "id": "enmin_ogm_wells-4",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#c960d2",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "gas well"
        ]
    },
    {
        "id": "enmin_ogm_wells-5",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#afd03a",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "helium well"
        ]
    },
    {
        "id": "enmin_ogm_wells-6",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#7a7add",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "oil well"
        ]
    },
    {
        "id": "enmin_ogm_wells-7",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#8e5ccb",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "test well"
        ]
    },
    {
        "id": "enmin_ogm_wells-8",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#d14b11",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "unknown"
        ]
    },
    {
        "id": "enmin_ogm_wells-9",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#3fccd6",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "water disposal well"
        ]
    },
    {
        "id": "enmin_ogm_wells-10",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#4388d6",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "water injection well"
        ]
    },
    {
        "id": "enmin_ogm_wells-11",
        "type": "circle",
        "paint": {
            "circle-radius": 3.5,
            "circle-color": "#c84b5f",
            "circle-stroke-width": 0.5,
            "circle-stroke-color": "#232323"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "welltype"
                    ]
                ]
            ],
            "water source well"
        ]
    }
];
export default layers;
