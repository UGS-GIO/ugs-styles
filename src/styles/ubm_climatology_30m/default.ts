/**
 * UGS Soil Water Balance (UBM) datacubes, one style for every item in the collection: each variable
 * in mm (soil saturation in %), stretched 0–100 like the soil-water viewer. Users adjust from there.
 */
import type { StyleSpec } from '../../types';

export const spec = {
    collectionId: 'ubm-climatology-30m',
    render: 'default',
    kind: 'raster',
    assets: ['data'],
    archetype: 'continuous-raster',
    title: 'Default stretch',
    colormap_name: 'viridis',
    rescale: [0, 100],
} satisfies StyleSpec;
