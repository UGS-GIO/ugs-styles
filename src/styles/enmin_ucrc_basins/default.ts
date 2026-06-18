// Seeded from live GeoServer: energy_mineral:enmin_ucrc_basins_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ucrc_basins',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "energy_minerals_ucrc_basins_style",
} satisfies Binding & { render: string };

// Faithful translation of the SLD rules (filters + paint preserved). Tune as needed.
const layers: StyleLayer[] = [
    {
        "id": "enmin_ucrc_basins-0",
        "type": "line",
        "paint": {
            "line-color": "#8400A8",
            "line-width": 2
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "label"
                    ]
                ]
            ],
            "paradox basin"
        ]
    },
    {
        "id": "enmin_ucrc_basins-1",
        "type": "symbol",
        "paint": {
            "text-opacity": 1,
            "text-color": "#8400A8"
        },
        "layout": {
            "text-field": "{label}",
            "text-font": [
                "Arial"
            ],
            "text-size": 9,
            "symbol-placement": "point"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "label"
                    ]
                ]
            ],
            "paradox basin"
        ]
    },
    {
        "id": "enmin_ucrc_basins-2",
        "type": "line",
        "paint": {
            "line-color": "#005CE6",
            "line-width": 2
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "label"
                    ]
                ]
            ],
            "uinta basin"
        ]
    },
    {
        "id": "enmin_ucrc_basins-3",
        "type": "symbol",
        "paint": {
            "text-opacity": 1,
            "text-color": "#005CE6"
        },
        "layout": {
            "text-field": "{label}",
            "text-font": [
                "Arial"
            ],
            "text-size": 9,
            "symbol-placement": "point"
        },
        "filter": [
            "==",
            [
                "downcase",
                [
                    "to-string",
                    [
                        "get",
                        "label"
                    ]
                ]
            ],
            "uinta basin"
        ]
    },
    {
        "id": "enmin_ucrc_basins-4",
        "type": "line",
        "paint": {
            "line-color": "#808080",
            "line-width": 2
        }
    },
    {
        "id": "enmin_ucrc_basins-5",
        "type": "symbol",
        "paint": {
            "text-opacity": 1,
            "text-color": "#000000"
        },
        "layout": {
            "text-field": "{label}",
            "text-font": [
                "Arial"
            ],
            "text-size": 9,
            "symbol-placement": "point"
        }
    }
];
export default layers;
