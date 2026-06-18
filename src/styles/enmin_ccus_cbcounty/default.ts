import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccus_cbcounty',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "Carbon Capture County Areas",
} satisfies Binding & { render: string };

const layers: StyleLayer[] = [
    {
        "id": "enmin_ccus_cbcounty-fill",
        "type": "fill",
        "paint": {
            "fill-color": "#8DD3C7",
            "fill-opacity": 0.35
        }
    },
    {
        "id": "enmin_ccus_cbcounty-line",
        "type": "line",
        "paint": {
            "line-color": "#4A90E2",
            "line-width": 1.5,
            "line-dasharray": [2, 2]
        }
    }
];
export default layers;