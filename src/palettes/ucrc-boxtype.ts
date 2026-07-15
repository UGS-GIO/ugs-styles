/**
 * UCRC well box-type palette — multi-value categorical, rendered as pie-wedge sprites.
 *
 * `box_type_codes` is a comma-delimited list of the SPECIFIC sample types on a well. For
 * symbology those roll up into three GROUPS by colour:
 *   CORE (purple)     — physical core material: butts, slabs, whole core, coresamples,
 *                       skeletonized core, spot cores
 *   CUTTINGS (green)  — cuttings + core chips
 *   OTHER (gray)      — everything else (outcrop samples, sidewall plugs, thin sections, …)
 *
 * Grouping is colour-only: the specific token stays on the feature (popup + filter), so a well
 * is still identifiable by its exact type. The old bare `CORE` code never existed in the data —
 * core is these six specific tokens.
 */

export const UCRC_CORE_CODES = ['BUTTS', 'SLABS', 'WHOLE CORE', 'CORESAMPLES', 'SKELETONIZED CORE', 'SPOT CORES'] as const;
export const UCRC_CUTTINGS_CODES = ['CUTTINGS', 'CORE CHIPS'] as const;

export type UcrcBoxGroup = 'CORE' | 'CUTTINGS' | 'OTHER';

export const UCRC_BOX_GROUP_COLORS: Record<UcrcBoxGroup, string> = {
    CORE: '#5E3C99',
    CUTTINGS: '#1A9641',
    OTHER: '#BDBDBD',
};

// Wedge-draw + legend order.
export const UCRC_BOX_GROUP_ORDER = ['CORE', 'CUTTINGS', 'OTHER'] as const satisfies readonly UcrcBoxGroup[];

const CORE_SET: ReadonlySet<string> = new Set(UCRC_CORE_CODES);
const CUTTINGS_SET: ReadonlySet<string> = new Set(UCRC_CUTTINGS_CODES);

/** Which colour group a specific box_type token rolls up into. */
export const boxTypeGroup = (token: string): UcrcBoxGroup =>
    CORE_SET.has(token) ? 'CORE' : CUTTINGS_SET.has(token) ? 'CUTTINGS' : 'OTHER';

// Sprite name prefix — must match the by-boxtype render's icon-image expression.
export const UCRC_BOX_TYPE_NAMESPACE = 'box-type';
