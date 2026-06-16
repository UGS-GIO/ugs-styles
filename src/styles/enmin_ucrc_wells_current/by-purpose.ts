/**
 * UCRC wells — symbolized by `purpose`. Declarative spec; the GL fragment is generated
 * (point archetype + ucrc-purpose palette). This is the standard authoring shape — see DESIGN.md.
 */
import type { StyleSpec } from '../../types';

export const spec = {
    itemId: 'enmin_ucrc_wells',   // energy_mineral.enmin_ucrc_wells_current -> _current-stripped stem
    render: 'by-purpose',
    kind: 'vector',
    assets: ['pmtiles'],
    archetype: 'point',
    field: 'purpose',
    palette: 'ucrc-purpose',
    title: 'UCRC wells by purpose',
} satisfies StyleSpec;
