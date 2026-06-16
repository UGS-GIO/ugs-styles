import type { LayerSpecification } from 'maplibre-gl';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type StyleLayer = DistributiveOmit<LayerSpecification, 'source'>;

// How a style render binds to a warehouse layer. The warehouse joins on `itemId` (the STAC
// item id it mints — a serving topic's `{layer}` stem, or a pub `series_id`), reads `kind`
// to pick the render shape, and attaches the style only to items carrying one of `assets`.
// build-json.ts emits this into dist-json/index.json for STAC autodiscovery (warehouse
// docs/STYLING.md). Declare it next to each render: `export const binding = {...} satisfies Binding`.
export type Binding = {
    itemId: string;                  // == STAC item id (e.g. 'enmin_ucrc_wells', 'GQ-1560')
    kind: 'vector' | 'raster';
    assets: string[];                // STAC asset keys this render targets: ['pmtiles'] | ['cog']
    title?: string;                  // human label for the render
    // raster-only render params (passed through to the STAC render extension):
    colormap_name?: string;
    rescale?: [number, number];
};
