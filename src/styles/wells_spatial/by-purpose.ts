/**
 * wells_spatial — symbolized by `purpose`, reusing the authoritative ucrc-purpose palette
 * (same value domain: Oil and Gas, Mining, Water, …). The legacy energy_minerals_wells SLD
 * keyed a `welltype_name` column this layer doesn't have, so this is spec-authored from the
 * shared palette rather than seeded.
 */
import type { StyleSpec } from '../../types';

export const spec = {
    itemId: 'wells_spatial',
    render: 'by-purpose',
    kind: 'vector',
    assets: ['pmtiles'],
    archetype: 'point',
    field: 'purpose',
    palette: 'wells-purpose',
    title: 'Wells by purpose',
} satisfies StyleSpec;
