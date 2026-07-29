/** Shared paint for the PWFDF likelihood renders (basins polygons, segments lines). */
import type { ExpressionSpecification } from 'maplibre-gl';
import { PWFDF_LIKELIHOOD_BINS as B } from '../palettes/pwfdf';

/**
 * `p_<i15>` -> bin colour. `step` rather than a chain of comparisons: the values are doubles and
 * the bins are contiguous, so a step on the lower bounds can't leave a gap between classes.
 * `number` (not `to-number`) so an absent probability falls to the lowest bin instead of erroring.
 */
export const likelihoodColor = (intensity: number): ExpressionSpecification => [
    'step', ['number', ['get', `p_${intensity}`], 0],
    B[0].color,
    B[1].lo, B[1].color,
    B[2].lo, B[2].color,
    B[3].lo, B[3].color,
    B[4].lo, B[4].color,
];
