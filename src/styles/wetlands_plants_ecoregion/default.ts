/**
 * Wetland plants EcoRegional Groups — EPA Omernik Level III ecoregion polygons used to
 * classify Wetland Survey Sites (old app: https://wetlandplants.geology.utah.gov/).
 * Categorical archetype on `us_l3name`, `wetland-ecoregions` palette (src/palettes/index.ts).
 */
import type { Binding } from '../../types';

export const spec = {
    itemId: 'wetlands_plants_ecoregion',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'EcoRegional Groups',
    archetype: 'categorical',
    field: 'us_l3name',
    palette: 'wetland-ecoregions',
} satisfies Binding & { render: string; archetype: 'categorical'; field: string; palette: string };
