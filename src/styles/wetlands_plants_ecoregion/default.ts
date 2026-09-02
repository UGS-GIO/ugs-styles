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
    legend: [
        { label: 'Central Basin and Range', color: '#FDB863' },
        { label: 'Colorado Plateaus', color: '#E66101' },
        { label: 'Mojave Basin and Range', color: '#A6D96A' },
        { label: 'Northern Basin and Range', color: '#B2ABD2' },
        { label: 'Southern Rockies', color: '#5E3C99' },
        { label: 'Wasatch and Uinta Mountains', color: '#1B9E77' },
        { label: 'Wyoming Basin', color: '#66C2A5' },
    ],
} satisfies Binding & { render: string; archetype: 'categorical'; field: string; palette: string };
