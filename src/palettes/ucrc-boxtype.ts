/**
 * UCRC well box-type palette — multi-value categorical, rendered as pie-wedge sprites.
 * Ported verbatim from the authoritative ugs-map-viewer subsurface layer (UCRC_BOX_TYPE_*).
 * `box_type_codes` is a comma-delimited list per well; only these four codes get a wedge
 * (others present on a well are ignored, matching the viewer). Source-of-truth lives here now.
 */

export const UCRC_BOX_TYPE_CODES = ['BUTTS', 'CORE', 'CUTTINGS', 'SLABS'] as const;

export const UCRC_BOX_TYPE_COLORS: Record<string, string> = {
    BUTTS: '#E66101',
    CORE: '#5E3C99',
    CUTTINGS: '#1A9641',
    SLABS: '#0571B0',
};

// Sprite name prefix — must match the by-boxtype render's icon-image expression.
export const UCRC_BOX_TYPE_NAMESPACE = 'box-type';
