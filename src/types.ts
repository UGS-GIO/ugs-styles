import type { LayerSpecification } from 'maplibre-gl';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type StyleLayer = DistributiveOmit<LayerSpecification, 'source'>;

/**
 * One legend swatch — the render's symbology, read verbatim by consumers.
 * `values` (grouped renders) = the specific field values an entry rolls up, each with its own
 * shade; `stroke` = optional swatch outline for flat renders.
 */
export type LegendEntry = {
    label: string;
    color: string;
    values?: readonly { value: string; color: string }[];
    stroke?: string;
};

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
    // The render's legend. Lives on Binding because build-json copies it straight into
    // dist-json/index.json for every render shape — spec-authored and hand-authored alike.
    // Without it here the `satisfies` excess-property check rejects `legend:` at authoring time
    // (this is what broke the v0.1.34 publish), so every style had to re-declare it by hand.
    legend?: LegendEntry[];
    // raster-only render params (passed through to the STAC render extension):
    colormap_name?: string;
    rescale?: [number, number];
};

export type Geom = 'fill' | 'line' | 'circle';

// A style spec is the whole authoring surface: the binding (itemId/kind/assets) plus the style
// *intent* (archetype + field + palette). build-json runs `generate(spec)` → MapLibre GL, so a
// new style is ~5 lines, not handwritten paint. For true-bespoke cartography, skip the spec and
// default-export StyleLayer[] instead (the escape hatch). See DESIGN.md.
export type StyleSpec = Binding & {
    render: string;                  // render id (default | by-purpose | …); unique per item
    archetype: 'simple' | 'categorical' | 'point' | 'graduated';
    field?: string;                  // attribute keyed on (categorical / graduated / point-by-field)
    palette?: string;                // named palette or ramp (see palettes/index.ts)
    geom?: Geom;                     // categorical/simple geometry (default 'fill')
    color?: string;                  // simple/point single color (when no palette)
    // graduated-only — the numeric domain, one entry per ramp stop (see archetypes/index.ts):
    values?: number[];               // discrete field values, matched with `==`
    breaks?: number[];               // ascending lower bounds of half-open bins, `>=` / `<`
    opacity?: number;                // fill opacity (default 0.7)
    // Pre-staged: the style is written before its data lands, so `validate` reports unknown fields
    // as warnings instead of failing the release (the fields don't exist YET). Carry the tracking
    // id so a stale flag is traceable — clear it once the ingest ships the columns.
    pending?: string;
};
