/**
 * UCRC wells — symbolized by `box_type_codes` (pie-wedge icons). Ported from the authoritative
 * ugs-map-viewer subsurface layer: each well's icon is a disc split into colored wedges for the
 * box-type GROUPS it holds — Core / Cuttings / Other, three colors, so a disc is at most 3 slices
 * no matter how many specific types the well carries. `box_type_codes` is multi-value, so it can't
 * be a single fill — the icons (pre-baked into a sprite sheet by scripts/gen-sprites.ts, from the
 * `sprite` recipe below) carry the composite. icon-image = `box-type-<the well's exact codes>`.
 *
 * The `sprite` field tells consumers which sprite sheet to load (the base map style's own sprite
 * doesn't carry these). The warehouse passes it into the STAC render block; the viewer
 * map.addSprite()s it before applying this layer.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom } from '../../expressions/categorical';
import type { UcrcBoxGroup } from '../../palettes/ucrc-boxtype';
import { UCRC_CORE_CODES, UCRC_BOX_GROUP_COLORS, UCRC_BOX_GROUP_ORDER, UCRC_BOX_TYPE_NAMESPACE, UCRC_BOX_NO_CODES, groupValues, boxTypeGroup } from '../../palettes/ucrc-boxtype';
import type { SpriteRecipe } from '../../sprites';

const GROUP_LABELS: Record<UcrcBoxGroup, string> = { CORE: 'Core', CUTTINGS: 'Cuttings', OTHER: 'Other' };

export const spec = {
    itemId: 'enmin_ucrc_wells',
    render: 'by-boxtype',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC wells by sample type',
    field: 'box_type_codes',   // the attribute this render symbolizes (consumers wire filters to it)
    sprite: 'styles/enmin_ucrc_wells_current/sprite',  // relative to STYLES_CDN_BASE (no extension)
    // Explicit legend — the single source of truth for this render's symbology. Each entry is a
    // group: its `color` + the ordered `values` that roll up into it. Every value carries the SAME
    // color as its group (three swatches total); the `values` list is there to name what's in each
    // group, so consumers should draw one swatch per group, not one per value.
    legend: UCRC_BOX_GROUP_ORDER.map((g) => ({ label: GROUP_LABELS[g], color: UCRC_BOX_GROUP_COLORS[g], values: groupValues(g) })),
} satisfies Binding & { render: string; field: string; sprite: string; legend: { label: string; color: string; values: { value: string; color: string; label: string }[] }[] };

// The wedge colors for one combo, in fixed group order — every combo touching the same GROUP set
// draws the same disc (so ≤ 7 distinct discs however many combos exist).
const wedgesOf = (combo: string): { key: string; colors: string[] } => {
    const hit = new Set(combo.split(',').map((s) => s.trim()).filter(Boolean).map(boxTypeGroup));
    const groups: UcrcBoxGroup[] = UCRC_BOX_GROUP_ORDER.filter((g) => hit.has(g));
    return { key: groups.join('+'), colors: groups.map((g) => UCRC_BOX_GROUP_COLORS[g]) };
};

// Sprite recipe (baked by scripts/gen-sprites.ts). `box_type_codes` is an open, combinatorial domain,
// so the frame values are read from the live GeoParquet; combos are deduped to one disc per group-set,
// and the no-codes stand-in is always baked so a code-less well still draws.
export const sprite: SpriteRecipe = {
    shape: 'pie',
    values: { field: 'box_type_codes' },
    cells: (combos) => {
        const byKey = new Map<string, { names: string[]; wedges: string[] }>();
        for (const combo of [...new Set([...combos, UCRC_BOX_NO_CODES])].sort()) {
            const { key, colors } = wedgesOf(combo);
            const name = `${UCRC_BOX_TYPE_NAMESPACE}-${combo}`;
            const existing = byKey.get(key);
            if (existing) existing.names.push(name);
            else byKey.set(key, { names: [name], wedges: colors });
        }
        return [...byKey.values()];
    },
};

// A code-less well still has to draw: blank/missing codes resolve to the stand-in no-codes disc
// rather than to `box-type-` (no such sprite → invisible well). Distinct from the managed
// 'UNKNOWN' code, which means something else — see UCRC_BOX_NO_CODES.
const codes: ExpressionSpecification = [
    'case',
    ['==', ['coalesce', ['get', 'box_type_codes'], ''], ''], UCRC_BOX_NO_CODES,
    ['to-string', ['get', 'box_type_codes']],
];

// icon-image = `box-type-<the well's exact codes>`, matching a baked sprite.
const iconImage: ExpressionSpecification = ['concat', `${UCRC_BOX_TYPE_NAMESPACE}-`, codes];

// Draw CORE wells on top of every other box type: with icon-allow-overlap, a higher
// symbol-sort-key paints last (on top). A well is CORE if it carries any core token.
const coreOnTop: ExpressionSpecification = [
    'case', ['any', ...UCRC_CORE_CODES.map((t): ExpressionSpecification => ['in', t, codes])], 1, 0,
];

const layers: StyleLayer[] = [
    {
        id: 'enmin_ucrc_wells-boxtype',
        type: 'symbol',
        layout: {
            'icon-image': iconImage,
            // Sized to match the by-purpose circles: the sprite disc is 40px @1x, so
            // icon-size = (2 × that render's circle-radius) / 40 at each stop.
            'icon-size': interpolateByZoom([[4, 0.15], [7, 0.275], [10, 0.4], [13, 0.55], [16, 0.7]]),
            'icon-allow-overlap': true,
            'symbol-sort-key': coreOnTop,
        },
    },
];
export default layers;
