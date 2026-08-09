/**
 * The fontstacks we publish — the only names a style may put in `text-font`. Glyphs that 404 render
 * no labels at all, silently (warehouse#116). Noto Sans is also what OpenFreeMap serves.
 */
export const FONTSTACKS = [
    'Noto Sans Regular',
    'Noto Sans Bold',
    'Noto Sans Italic',
] as const;

export type Fontstack = (typeof FONTSTACKS)[number];

/** CDN-relative glyph template, published alongside the styles and sprites. */
export const GLYPHS_PATH = 'fonts/{fontstack}/{range}.pbf';
