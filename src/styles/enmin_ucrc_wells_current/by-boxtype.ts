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
import { UCRC_BOX_TYPE_CODES, UCRC_BOX_TYPE_COLORS, UCRC_BOX_TYPE_NAMESPACE } from '../../palettes/ucrc-boxtype';

export const spec = {
    itemId: 'enmin_ucrc_wells',
    render: 'by-boxtype',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC wells by box type',
    sprite: 'styles/enmin_ucrc_wells_current/sprite',  // relative to STYLES_CDN_BASE (no extension)
    // Explicit legend — icon (pie-wedge) renders have no paint color for the viewer to derive a
    // legend from, so carry the wedge codes→colors here (the authoritative palette).
    legend: UCRC_BOX_TYPE_CODES.map((c) => ({ label: c, color: UCRC_BOX_TYPE_COLORS[c] ?? '#BDBDBD' })),
} satisfies Binding & { render: string; sprite: string; legend: { label: string; color: string }[] };

// icon-image = `box-type-<the well's exact codes>`, matching a baked sprite.
const iconImage: ExpressionSpecification = [
    'concat', `${UCRC_BOX_TYPE_NAMESPACE}-`, ['coalesce', ['get', 'box_type_codes'], ''],
];

// Draw CORE wells on top of every other box type: with icon-allow-overlap, a
// higher symbol-sort-key paints last (on top). CORE-containing codes → 1, rest → 0.
const coreOnTop: ExpressionSpecification = [
    'case', ['in', 'CORE', ['coalesce', ['get', 'box_type_codes'], '']], 1, 0,
];

const layers: StyleLayer[] = [
    {
        id: 'enmin_ucrc_wells-boxtype',
        type: 'symbol',
        layout: {
            'icon-image': iconImage,
            'icon-size': interpolateByZoom([[4, 0.1], [7, 0.2], [10, 0.3], [13, 0.4], [16, 0.5]]),
            'icon-allow-overlap': true,
            'symbol-sort-key': coreOnTop,
        },
    },
];
export default layers;
