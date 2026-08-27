/**
 * Wetland dashboard site attributes — flat point style. This dataset ships as its own
 * independent layer in the wetlandplants viewer (no shared key with wetlands_plants_site —
 * see ugs-map-viewer's wetlandplants layer config), and there's no established legacy
 * symbology to match, so a single neutral color (`point` archetype, no field/palette) is
 * enough to make the layer visible rather than guessing at a categorical field's semantics.
 */
import type { Binding } from '../../types';

export const spec = {
    itemId: 'wetlands_wetdash_siteattributes',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wetland dashboard site attributes',
    archetype: 'point',
    color: '#2C7FB8',
    legend: [{ label: 'Site', color: '#2C7FB8' }],
} satisfies Binding & { render: string; archetype: 'point'; color: string; legend: { label: string; color: string }[] };
