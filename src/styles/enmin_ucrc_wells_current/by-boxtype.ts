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
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom } from '../../expressions/categorical';
import { UCRC_BOX_TYPE_NAMESPACE } from '../../palettes/ucrc-boxtype';

export const spec = {
    itemId: 'enmin_ucrc_wells',
    render: 'by-boxtype',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC wells by box type',
    sprite: 'styles/enmin_ucrc_wells_current/sprite',  // relative to STYLES_CDN_BASE (no extension)
} satisfies Binding & { render: string; sprite: string };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ucrc_wells-boxtype',
        type: 'symbol',
        layout: {
            'icon-image': ['concat', `${UCRC_BOX_TYPE_NAMESPACE}-`,
                ['coalesce', ['get', 'box_type_codes'], '']] as unknown as never,
            'icon-size': interpolateByZoom([[4, 0.1], [7, 0.2], [10, 0.3], [13, 0.4], [16, 0.5]]) as unknown as never,
            'icon-allow-overlap': true,
        },
    },
];
export default layers;
