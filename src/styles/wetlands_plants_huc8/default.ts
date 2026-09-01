/**
 * Watershed (HUC8) Boundaries — supplementary boundary polygons for Wetland Survey Sites (old
 * app: https://wetlandplants.geology.utah.gov/). Open polygons, blue outline only — no fill,
 * same as the old app's fillSymbol. Darker than the old app's raw rgb(0,128,255) for better
 * contrast against the basemap.
 */
import type { Binding } from '../../types';

export const spec = {
    itemId: 'wetlands_plants_huc8',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Watershed (HUC8) Boundaries',
    archetype: 'simple',
    geom: 'line',
    color: '#0056B3',
} satisfies Binding & { render: string; archetype: 'simple'; geom: string; color: string };
