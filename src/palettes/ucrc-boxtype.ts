/**
 * UCRC well box-type palette — multi-value categorical, rendered as pie-wedge sprites.
 *
 * Split of ownership:
 *   - The UCRC management app owns the GROUPING (which specific type is Core/Cuttings/Other),
 *     published on the served `ucrc_boxes` parquet and snapshotted into ucrc-boxtype.membership.ts.
 *   - THIS file owns STYLE: the three group base colours + the shade algorithm + the order shades
 *     are assigned (alphabetical within a group — stable + deterministic, no hand-maintained list).
 *
 * Each specific type gets its own shade of its group's base colour. `box_type_codes` on a well is a
 * comma-delimited list of these codes; a well's pie disc is one wedge per specific type it holds.
 */
import { shades } from './shades';
import { UCRC_BOX_MEMBERSHIP } from './ucrc-boxtype.membership';

export type UcrcBoxGroup = 'CORE' | 'CUTTINGS' | 'OTHER';

// Group base colours (legend header + the hue each group's shades are drawn from) — ugs-styles owns these.
export const UCRC_BOX_GROUP_COLORS: Record<UcrcBoxGroup, string> = {
    CORE: '#5E3C99',
    CUTTINGS: '#1A9641',
    OTHER: '#BDBDBD',
};

export const UCRC_BOX_GROUP_ORDER = ['CORE', 'CUTTINGS', 'OTHER'] as const satisfies readonly UcrcBoxGroup[];

// Managed group codes are free text; normalize to our three known groups (anything else → OTHER).
const normGroup = (g: string): UcrcBoxGroup => {
    const u = g.toUpperCase();
    return u === 'CORE' || u === 'CUTTINGS' ? u : 'OTHER';
};

const GROUP_OF = new Map<string, UcrcBoxGroup>(UCRC_BOX_MEMBERSHIP.map(m => [m.code, normGroup(m.group)]));

// A group's codes, alphabetical — the stable shade order (ugs-styles owns ordering).
const codesByGroup = (g: UcrcBoxGroup): string[] =>
    UCRC_BOX_MEMBERSHIP.filter(m => normGroup(m.group) === g).map(m => m.code).sort((a, b) => a.localeCompare(b));

/** Every known token, in group + shade order — the wedge draw order for a well's pie. */
export const UCRC_BOX_TYPE_ORDER: readonly string[] = UCRC_BOX_GROUP_ORDER.flatMap(codesByGroup);

/** Core codes — drives the "draw CORE on top" sort-key. Derived from managed membership. */
export const UCRC_CORE_CODES: readonly string[] = codesByGroup('CORE');

// token -> its shade of the group colour (deterministic from the alphabetical order).
const TOKEN_COLOR = new Map<string, string>();
for (const g of UCRC_BOX_GROUP_ORDER) {
    const codes = codesByGroup(g);
    const cols = shades(UCRC_BOX_GROUP_COLORS[g], codes.length);
    codes.forEach((c, i) => TOKEN_COLOR.set(c, cols[i] ?? UCRC_BOX_GROUP_COLORS[g]));
}

/** Which colour group a specific box_type token rolls up into (from managed membership). */
export const boxTypeGroup = (token: string): UcrcBoxGroup => GROUP_OF.get(token) ?? 'OTHER';

/** A specific token's shade of its group colour (falls back to the group base for unknowns). */
export const boxTypeColor = (token: string): string =>
    TOKEN_COLOR.get(token) ?? UCRC_BOX_GROUP_COLORS[boxTypeGroup(token)];

/** The ordered tokens (with shade) for a group — drives the legend's `values`. */
export const groupValues = (g: UcrcBoxGroup): { value: string; color: string }[] =>
    codesByGroup(g).map(v => ({ value: v, color: boxTypeColor(v) }));

// Sprite name prefix — must match the by-boxtype render's icon-image expression.
export const UCRC_BOX_TYPE_NAMESPACE = 'box-type';
