/**
 * hazards:hazards_displacement_contours_review
 * Hand-translated from SLD: energy_minerals_insar_displacement_contours_sld
 *
 * Stepped polygon fill on `value_cm`. Red→white→blue diverging ramp,
 * 0.2 cm bins from < -3.0 through > 3.0 with a ±0.1 cm white zero-band.
 *
 * No source declared (consumer attaches PMTiles via STAC). No `type` filter
 * baked in — consumer derives Cumulative / Yearly / Velocity / Annual amplitude
 * sub-layers via filter: ['==', ['get','type'], '<value>'] at consume time.
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const fillColorByValueCm: ExpressionSpecification = [
    'step',
    ['get', 'value_cm'],
    '#C00000',
    -2.8, '#C41010',
    -2.6, '#C82121',
    -2.4, '#CD3131',
    -2.2, '#D14242',
    -2.0, '#D65252',
    -1.8, '#DA6363',
    -1.6, '#DF7474',
    -1.4, '#E38484',
    -1.2, '#E79595',
    -1.0, '#ECA5A5',
    -0.8, '#F0B6B6',
    -0.6, '#F5C6C6',
    -0.4, '#F9D7D7',
    -0.2, '#FEE8E8',
    -0.1, '#FFFFFF',
    0.1, '#F0F0FF',
    0.2, '#DEDEFA',
    0.4, '#CDCDF6',
    0.6, '#BCBCF1',
    0.8, '#ABABED',
    1.0, '#9A9AE8',
    1.2, '#8989E4',
    1.4, '#7878DF',
    1.6, '#6666DB',
    1.8, '#5555D6',
    2.0, '#4444D2',
    2.2, '#3333CD',
    2.4, '#2222C9',
    2.6, '#1111C4',
    2.8, '#0000C0',
];

export const layers: StyleLayer[] = [
    {
        id: 'hazards-displacement-contours-review-fill',
        type: 'fill',
        paint: {
            'fill-color': fillColorByValueCm,
            'fill-outline-color': '#cccccc',
        },
    },
];

export default layers;
