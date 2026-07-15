/**
 * UCRC well box-type palette — multi-value categorical, rendered as pie-wedge sprites.
 *
 * `box_type_codes` is a comma-delimited list of the SPECIFIC sample types on a well. Each type
 * belongs to one of three GROUPS (Core / Cuttings / Other), and gets its OWN SHADE of that group's
 * base colour — generated deterministically from the group's fixed token order (see shades.ts).
 * So Core is a family of purples, Cuttings a family of greens, Other a family of grays.
 *
 * Grouping still drives draw order (Core on top) + the legend's group headers; the per-token shade
 * is what colours each wedge + legend swatch. Token order below is FIXED — do not reorder, it pins
 * each token's shade. The old bare `CORE` code never existed in the data.
 */
import { shades } from './shades';

// Fixed per-group token order — pins each token's shade. Do not reorder.
export const UCRC_CORE_CODES = ['BUTTS', 'SLABS', 'WHOLE CORE', 'CORESAMPLES', 'SKELETONIZED CORE', 'SPOT CORES'] as const;
export const UCRC_CUTTINGS_CODES = ['CUTTINGS', 'CORE CHIPS'] as const;
export const UCRC_OTHER_CODES = ['OUTCROP SAMPLES', 'OTHER', 'SIDEWALL PLUGS', 'UNKNOWN', 'THIN SECTIONS'] as const;

export type UcrcBoxGroup = 'CORE' | 'CUTTINGS' | 'OTHER';

// Group base colours (the legend group header + the hue each group's shades are drawn from).
export const UCRC_BOX_GROUP_COLORS: Record<UcrcBoxGroup, string> = {
    CORE: '#5E3C99',
    CUTTINGS: '#1A9641',
    OTHER: '#BDBDBD',
};

export const UCRC_BOX_GROUP_ORDER = ['CORE', 'CUTTINGS', 'OTHER'] as const satisfies readonly UcrcBoxGroup[];

const GROUP_CODES: Record<UcrcBoxGroup, readonly string[]> = {
    CORE: UCRC_CORE_CODES,
    CUTTINGS: UCRC_CUTTINGS_CODES,
    OTHER: UCRC_OTHER_CODES,
};

/** Every known token, in group order — the wedge draw order for a well's pie. */
export const UCRC_BOX_TYPE_ORDER: readonly string[] = UCRC_BOX_GROUP_ORDER.flatMap(g => [...GROUP_CODES[g]]);

// token -> its shade of the group colour (built once, deterministic from the fixed order).
const TOKEN_COLOR = new Map<string, string>();
for (const g of UCRC_BOX_GROUP_ORDER) {
    const codes = GROUP_CODES[g];
    const cols = shades(UCRC_BOX_GROUP_COLORS[g], codes.length);
    codes.forEach((c, i) => TOKEN_COLOR.set(c, cols[i] ?? UCRC_BOX_GROUP_COLORS[g]));
}

const CORE_SET: ReadonlySet<string> = new Set(UCRC_CORE_CODES);
const CUTTINGS_SET: ReadonlySet<string> = new Set(UCRC_CUTTINGS_CODES);

/** Which colour group a specific box_type token rolls up into. */
export const boxTypeGroup = (token: string): UcrcBoxGroup =>
    CORE_SET.has(token) ? 'CORE' : CUTTINGS_SET.has(token) ? 'CUTTINGS' : 'OTHER';

/** A specific token's shade of its group colour (falls back to the group base for unknowns). */
export const boxTypeColor = (token: string): string =>
    TOKEN_COLOR.get(token) ?? UCRC_BOX_GROUP_COLORS[boxTypeGroup(token)];

/** The ordered tokens (with shade) for a group — drives the legend's `values`. */
export const groupValues = (g: UcrcBoxGroup): { value: string; color: string }[] =>
    GROUP_CODES[g].map(v => ({ value: v, color: boxTypeColor(v) }));

// Sprite name prefix — must match the by-boxtype render's icon-image expression.
export const UCRC_BOX_TYPE_NAMESPACE = 'box-type';
