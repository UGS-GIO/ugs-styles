/**
 * UCRC Wells — symbolize by `purpose`.
 * Renders points as colored circles, color from purpose categorical palette.
 * Zoom-scaled radius. Stroke matches purpose at slightly darker tone.
 *
 * Consumed via:
 *   - import directly into geohaz-v2 (typed)
 *   - JSON build output at CDN, referenced by STAC item `renders.by-purpose.style_url`
 */

import type { LayerSpecification } from 'maplibre-gl';
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE } from '../../palettes/ucrc-purpose';
import { matchByField, interpolateByZoom } from '../../expressions/categorical';

const sourceId = 'enmin_ucrc_wells';

export const layers: LayerSpecification[] = [
    {
        id: `${sourceId}-circle`,
        type: 'circle',
        source: sourceId,
        paint: {
            'circle-radius': interpolateByZoom([
                [4, 1.5],
                [7, 2.5],
                [10, 4],
                [13, 6],
                [16, 8],
            ]),
            'circle-color': matchByField('purpose', UCRC_PURPOSE_FILL, UCRC_PURPOSE_FILL.Other ?? '#BDBDBD'),
            'circle-stroke-color': matchByField('purpose', UCRC_PURPOSE_STROKE, UCRC_PURPOSE_STROKE.Other ?? '#858585'),
            'circle-stroke-width': 0.8,
            'circle-opacity': 0.85,
            'circle-stroke-opacity': 0.85,
        },
    },
];

export default layers;
