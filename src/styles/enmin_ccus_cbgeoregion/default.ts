import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccus_cbgeoregion',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Carbon Capture Geologic Regions",
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        "id": "enmin_ccus_cbgeoregion-fill",
        "type": "fill",
        "paint": {
            "fill-color": [
                "match",
                ["downcase", ["to-string", ["get", "region_name"]]],
                "paradox basin", "#BEBADA",
                "uinta basin", "#FB8072",
                "green river", "#80B1D3",
                "wasatch", "#FDB462",
                "#8DD3C7"
            ],
            "fill-opacity": 0.4
        }
    },
    {
        "id": "enmin_ccus_cbgeoregion-line",
        "type": "line",
        "paint": {
            "line-color": [
                "match",
                ["downcase", ["to-string", ["get", "region_name"]]],
                "paradox basin", "#807DB8",
                "uinta basin", "#F15A24",
                "green river", "#2B83BA",
                "wasatch", "#D95F02",
                "#1F78B4"
            ],
            "line-width": 1.5
        }
    }
];
export default layers;