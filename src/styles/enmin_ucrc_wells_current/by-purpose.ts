/**
 * UCRC Wells — symbolize by `purpose`.
 * Renders points as colored circles; color from purpose categorical palette.
 * Zoom-scaled radius. Stroke matches purpose at slightly darker tone.
 */

import type { Binding, StyleLayer } from '../../types';
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE } from '../../palettes/ucrc-purpose';
import { matchByField } from '../../expressions/categorical';

// energy_mineral.enmin_ucrc_wells_current -> warehouse item id is the `_current`-stripped stem.
export const binding = {
    itemId: 'enmin_ucrc_wells',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC wells by purpose',
} satisfies Binding;

export const layers: StyleLayer[] = [
    {
        id: 'enmin_ucrc_wells-circle',
        type: 'circle',
        paint: {
            'circle-radius': 4,
            'circle-color': matchByField('purpose', UCRC_PURPOSE_FILL, UCRC_PURPOSE_FILL.Other ?? '#BDBDBD'),
            'circle-stroke-color': matchByField('purpose', UCRC_PURPOSE_STROKE, UCRC_PURPOSE_STROKE.Other ?? '#858585'),
            'circle-stroke-width': 0.5,
        },
    },
];

export default layers;
