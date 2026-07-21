/**
 * UCRC wells — symbolized by `box_type_codes` (pie-wedge icons). Ported from the authoritative
 * ugs-map-viewer subsurface layer: each well's icon is a disc split into colored wedges for the
 * box types it holds (BUTTS/CORE/CUTTINGS/SLABS). `box_type_codes` is multi-value, so it can't be
 * a single fill — the icons (pre-baked into a sprite sheet by scripts/gen-pie-sprites.ts) carry
 * the composite. icon-image = `box-type-<the well's exact codes>`, matching a baked sprite.
 *
 * The `sprite` field tells consumers which sprite sheet to load (the base map style's own sprite
 * doesn't carry these). The warehouse passes it into the STAC render block; the viewer
 * map.addSprite()s it before applying this layer.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom } from '../../expressions/categorical';
import type { UcrcBoxGroup } from '../../palettes/ucrc-boxtype';
import { UCRC_CORE_CODES, UCRC_BOX_GROUP_COLORS, UCRC_BOX_GROUP_ORDER, UCRC_BOX_TYPE_NAMESPACE, UCRC_BOX_NO_CODES, groupValues } from '../../palettes/ucrc-boxtype';

const GROUP_LABELS: Record<UcrcBoxGroup, string> = { CORE: 'Core', CUTTINGS: 'Cuttings', OTHER: 'Other' };

export const spec = {
    itemId: 'enmin_ucrc_wells',
    render: 'by-boxtype',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC wells by box type',
    field: 'box_type_codes',   // the attribute this render symbolizes (consumers wire filters to it)
    sprite: 'styles/enmin_ucrc_wells_current/sprite',  // relative to STYLES_CDN_BASE (no extension)
    // Explicit legend — the single source of truth for this render's symbology. Each entry is a
    // group: base `color` (header/hue) + its ordered `values`, where every specific token carries
    // its OWN shade of the group colour. Consumers derive colours + grouping from here verbatim.
    legend: UCRC_BOX_GROUP_ORDER.map((g) => ({ label: GROUP_LABELS[g], color: UCRC_BOX_GROUP_COLORS[g], values: groupValues(g) })),
} satisfies Binding & { render: string; field: string; sprite: string; legend: { label: string; color: string; values: { value: string; color: string }[] }[] };

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
