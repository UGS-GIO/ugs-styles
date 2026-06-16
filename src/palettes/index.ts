/**
 * Palette registry — named color sets referenced by `spec.palette`. One source for color, so
 * layers that share a domain look consistent and theming is central. Never inline hex in a spec.
 *
 * A palette is `{ fill, stroke?, other? }` where fill/stroke map a data value -> color
 * (categorical), and `other` is the fallback for unmapped values.
 */
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE } from './ucrc-purpose';

export type Palette = {
    fill: Record<string, string>;
    stroke?: Record<string, string>;
    other?: string;
};

export const PALETTES: Record<string, Palette> = {
    'ucrc-purpose': { fill: UCRC_PURPOSE_FILL, stroke: UCRC_PURPOSE_STROKE, other: '#BDBDBD' },
};
