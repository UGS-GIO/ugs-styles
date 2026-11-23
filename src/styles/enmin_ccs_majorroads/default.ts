import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom } from '../../expressions/categorical';

export const spec = {
    itemId: 'enmin_ccs_majorroads',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Major Roads',
    legend: [
        { label: 'Major Roads', color: '#000000' },
    ],
} satisfies Binding & { render: string };

// Handwritten layer for zoom-interpolated road stroke widths.
const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_majorroads-line',
        type: 'line',
        paint: {
            'line-color': '#000000',
            'line-width': interpolateByZoom([[6, 1.6], [10, 2.2], [14, 3]]),
        },
        layout: {
            'line-join': 'bevel',
            'line-cap': 'butt',
        },
    },
];

export default layers;
