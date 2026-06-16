# @ugs-gio/styles

Source-of-truth for MapLibre styling on UGS web/mobile maps. Replaces GeoServer SLDs as part of the UGS Cloud-Native Geospatial migration (PMTiles + parquet + STAC behind a CDN).

**Distribution: CDN-only.** This repo produces static JSON; consumers fetch over HTTP at runtime. No npm publish, no GitHub package install in apps.

## What's inside

```
src/
  palettes/                            shared color tokens
  expressions/                         reusable maplibre expression builders
  styles/{layer-name}/{render-id}.ts   per-layer per-render style fragments
  types.ts                             StyleLayer = Omit<LayerSpecification, 'source'>
scripts/
  build-json.ts                        compile TS styles → CDN JSON
  import-sld.ts                        helper: pull legacy SLDs from GeoServer
  layers.json                          target list for bulk SLD pulls
legacy-sld/                            SLD reference (deleted once migration done)
dist-json/                             build output, synced to CDN by CI
```

## Build

```bash
npm install
npm run build:json
```

Produces:

- `dist-json/styles/{layer}/{render}.json` — `{ "layers": LayerSpecification[] }`
- `dist-json/index.json` — manifest `[{ layer, render, path }, ...]` for STAC autodiscovery

## Adding a style

1. (If new palette) Add to `src/palettes/`.
2. Create `src/styles/{layer-name}/{render-id}.ts`. Default-export `StyleLayer[]`.
3. `npm run typecheck`
4. `npm run build:json` to verify output
5. Commit + open PR. Tag a release once merged; CI rsyncs JSON to the CDN bucket.

### Style file rules

- **No `source` declared** in layer fragments. Sources come from the consumer (PMTiles URL via STAC).
- **No data filters baked in** if the consumer needs to derive sub-layers. Example: `hazards-displacement-contours/default.ts` is one base style; geohaz-v2 splits it 4 ways via `filter: ['==', ['get','type'], '<value>']` at consume time.
- Hand-translate SLDs. Do **not** use geostyler-mapbox-parser — output is noisy for stepped fills.

## Consume from a viewer

Fetch JSON at runtime, attach the consumer's source, addLayer each fragment:

```ts
const { layers } = await fetch(
  'https://storage.googleapis.com/ut-dnr-ugs-ucrc-public/styles/hazards-displacement-contours/default.json',
).then(r => r.json());

map.addSource('hazards-displacement-contours', {
  type: 'vector',
  url: 'pmtiles://...',
});

for (const layer of layers) {
  map.addLayer({ ...layer, source: 'hazards-displacement-contours', 'source-layer': '...' });
}
```

For sidebar splits, append a `filter` on the way in:

```ts
map.addLayer({
  ...layer,
  source: 'hazards-displacement-contours',
  'source-layer': '...',
  filter: ['==', ['get', 'type'], 'Cumulative'],
});
```

## STAC integration

Each render is referenced by a STAC item's `renders` extension:

```json
{
  "id": "hazards-displacement-contours",
  "renders": {
    "default": {
      "title": "Displacement (cm)",
      "style_url": "https://storage.googleapis.com/ut-dnr-ugs-ucrc-public/styles/hazards-displacement-contours/default.json"
    }
  }
}
```

`dist-json/index.json` is the master list of available `style_url`s.

## Importing a legacy SLD

```bash
curl 'https://ugs-geoserver-prod-flbcoqv7oa-uc.a.run.app/geoserver/wms?service=WMS&version=1.1.1&request=GetStyles&layers={workspace}:{layer}' \
  > legacy-sld/{workspace}__{layer}.sld
```

Or batch via `scripts/layers.json` + `npm run import:sld`. SLDs are reference only — hand-translate to TS.

## Conventions

- Layer dir name = qualified parquet/pmtiles slug (`enmin_ucrc_wells`, `hazards-displacement-contours`)
- Render id = short kebab-case (`default`, `by-purpose`, `by-box-type`)
- Palettes are `Record<string, string>` keyed by data value
- Expression helpers wrap MapLibre's tuple syntax with named functions

## Agent rules

`CLAUDE.md` is the binding instruction set for AI agents working in this repo. Read it before any structural change.
