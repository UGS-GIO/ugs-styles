/**
 * UCRC well box-type palette — multi-value categorical, rendered as pie-wedge sprites.
 *
 * Split of ownership:
 *   - The UCRC management app owns the GROUPING (which specific type is Core/Cuttings/Other),
 *     published on the served `ucrc_boxes` parquet and snapshotted into ucrc-boxtype.membership.ts.
 *   - THIS file owns STYLE: the three group base colors, and the order codes are listed in
 *     (alphabetical within a group — stable + deterministic, no hand-maintained list).
 *
 * Color is per GROUP, not per type: every code in a group renders in that group's base color, so
 * the map carries exactly three colors. Per-type detail belongs in the popup, not the symbol.
 * `box_type_codes` on a well is a comma-delimited list of these codes; a well's pie disc is one
 * wedge per GROUP those codes touch — at most 3 — so a single-group well reads as a solid disc.
 */
import { UCRC_BOX_MEMBERSHIP } from './ucrc-boxtype.membership';

export type UcrcBoxGroup = 'CORE' | 'CUTTINGS' | 'OTHER';

// The three colors this render uses — legend header AND fill for every code in the group. ugs-styles owns these.
export const UCRC_BOX_GROUP_COLORS: Record<UcrcBoxGroup, string> = {
    CORE: '#8266BE',
    CUTTINGS: '#1A9641',
    OTHER: '#BDBDBD',
};

export const UCRC_BOX_GROUP_ORDER = ['CORE', 'CUTTINGS', 'OTHER'] as const satisfies readonly UcrcBoxGroup[];

// Display label per code — the managed codes are shouty-case free text (e.g. 'CORE CHIPS',
// 'CORESAMPLES'), not fit for a legend. Generic title-case handles most; a few codes are missing
// a word boundary the source system never had ('CORESAMPLES' has no space) and need an explicit
// override rather than mangling into 'Coresamples'.
const DISPLAY_LABEL_OVERRIDES: Record<string, string> = {
    CORESAMPLES: 'Core Samples',
};

const titleCase = (s: string): string =>
    s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

/** Human-readable legend text for a managed code — display only, never the filter `value`. */
export const boxTypeLabel = (token: string): string => DISPLAY_LABEL_OVERRIDES[token] ?? titleCase(token);

// Managed group codes are free text; normalize to our three known groups (anything else → OTHER).
const normGroup = (g: string): UcrcBoxGroup => {
    const u = g.toUpperCase();
    return u === 'CORE' || u === 'CUTTINGS' ? u : 'OTHER';
};

const GROUP_OF = new Map<string, UcrcBoxGroup>(UCRC_BOX_MEMBERSHIP.map(m => [m.code, normGroup(m.group)]));

// A group's codes, alphabetical — stable + deterministic listing order (ugs-styles owns ordering).
const codesByGroup = (g: UcrcBoxGroup): string[] =>
    UCRC_BOX_MEMBERSHIP.filter(m => normGroup(m.group) === g).map(m => m.code).sort((a, b) => a.localeCompare(b));

/** Every known token, grouped + alphabetical — the wedge draw order for a well's pie. */
export const UCRC_BOX_TYPE_ORDER: readonly string[] = UCRC_BOX_GROUP_ORDER.flatMap(codesByGroup);

/** Core codes — drives the "draw CORE on top" sort-key. Derived from managed membership. */
export const UCRC_CORE_CODES: readonly string[] = codesByGroup('CORE');

/** Which color group a specific box_type token rolls up into (from managed membership). */
export const boxTypeGroup = (token: string): UcrcBoxGroup => GROUP_OF.get(token) ?? 'OTHER';

/** A token's color = its group's color. Unknown tokens fall into OTHER. */
export const boxTypeColor = (token: string): string => UCRC_BOX_GROUP_COLORS[boxTypeGroup(token)];

/** The ordered tokens (with color + display label) for a group — drives the legend's `values`.
 *  Every token carries its GROUP's color; `value` stays the raw managed code (filter/data join
 *  key) and `label` is display-only. */
export const groupValues = (g: UcrcBoxGroup): { value: string; color: string; label: string }[] =>
    codesByGroup(g).map(v => ({ value: v, color: boxTypeColor(v), label: boxTypeLabel(v) }));

// Sprite name prefix — must match the by-boxtype render's icon-image expression.
export const UCRC_BOX_TYPE_NAMESPACE = 'box-type';

/**
 * Stand-in token for a well with NO `box_type_codes` at all. It exists so a code-less well
 * resolves to a real sprite (a plain OTHER-grey disc) instead of asking for `box-type-` and
 * drawing nothing. The sprite generator always bakes it; the by-boxtype render substitutes it for
 * blank/missing codes.
 *
 * Deliberately not 'UNKNOWN': that IS a managed code in the live data (both alone and inside
 * combos), and it means "this well's holdings are of an unknown type" — a different fact from
 * "this well has no holdings recorded". The double underscores keep the sentinel out of the
 * managed namespace for good.
 */
export const UCRC_BOX_NO_CODES = '__NONE__';
