import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'geolmap_geolunits_gems',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Geologic Units",
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        "id": "geolmap_geolunits_gems-fill",
        "type": "fill",
        "paint": {
            "fill-color": [
                "match",
                ["downcase", ["to-string", ["get", "unit_symbol"]]],
                "q", "#FFF7BC",
                "qa", "#FFF7BC",
                "qaf", "#FEE391",
                "t", "#FEC44F",
                "k", "#984EA3",
                "j", "#4DAF4A",
                "p", "#377EB8",
                "#E5D8BD"
            ],
            "fill-opacity": 0.5
        }
    },
    {
        "id": "geolmap_geolunits_gems-line",
        "type": "line",
        "paint": {
            "line-color": "#444444",
            "line-width": 0.5,
            "line-opacity": 0.3
        }
    }
];
export default layers;