# ugs-styles — agent instructions

Source-of-truth for MapLibre styles that replace existing UGS GeoServer SLDs. Part of the UGS Cloud-Native Geospatial migration (moving off GeoServer + SLD onto CDN-hosted PMTiles + parquet + STAC).

## Distribution model: CDN-first, NOT npm

**Final state:** static JSON on a CDN. Apps fetch over HTTP at runtime via STAC `renders` extension. Industry pattern (OpenMapTiles, MapTiler, Stadia). Cross-platform (web, future mobile, QGIS) consume the same JSON — no npm anywhere.

The current scaffold (this repo's `package.json`) was written assuming an npm-distributed package with `main`/`module`/`exports`. **That decision was reversed.** Strip the npm-publish surface and keep only what's needed to build JSON:

- Keep: `tsx`, `typescript`, `maplibre-gl` (peer for types only), `build:json` script.
- Drop: `tsup`, `tsup.config.ts`, `main`/`module`/`types`/`exports` in package.json. No `dist/*.js`.
- Output target: `dist-json/styles/{layer-name}/{render-id}.json` only.

If a future case warrants in-bundle import (mostly for the in-tree dev story), keep types accessible by importing `.ts` directly within this repo. External consumers fetch JSON.

## Repo layout (target)

```
ugs-styles/
  src/
    styles/
      {layer-name}/
        {render-id}.ts            # exports default LayerSpecification[]
    palettes/                     # shared color tokens (red-white-blue, viridis, ...)
    expressions/                  # reusable maplibre expression builders (step bins, interpolate)
    index.ts                      # registry of all styles for build script enumeration
  legacy-sld/                     # existing GeoServer SLDs pulled for migration reference
  scripts/
    build-json.ts                 # walks src/styles, writes dist-json/{layer-name}/{render-id}.json + dist-json/index.json manifest
    import-sld.ts                 # helper: pulls SLD from GeoServer GetStyles
  .github/workflows/
    publish.yml                   # on tag push: build + gsutil rsync dist-json/ -> gs://maps-assets/styles/
  package.json
  tsconfig.json
  README.md
  CLAUDE.md
```

## v0.1.0 deliverable

Build infra + ONE migrated style as proof of pipeline.

**First migration target: `hazards:hazards_displacement_contours_review`**

- Pull SLD via:
  ```
  curl 'https://ugs-geoserver-prod-flbcoqv7oa-uc.a.run.app/geoserver/wms?service=WMS&version=1.1.1&request=GetStyles&layers=hazards:hazards_displacement_contours_review' > legacy-sld/hazards__hazards_displacement_contours_review.sld
  ```
- Style is `energy_minerals_insar_displacement_contours_sld`: stepped polygon fill on `value_cm` field, ~30 bins from <-3.0 to >+3.0 in 0.2cm increments, red→white→blue ramp, 0.1px `#cccccc` stroke.
- Translate by hand to MapLibre. **Do NOT use geostyler-mapbox-parser** — it produces noisy output for stepped fills and the CNG plan explicitly skips it.
- Output: `src/styles/hazards-displacement-contours/default.ts`. Default-exports `LayerSpecification[]` containing one `fill` layer using a `step` expression on `['get', 'value_cm']` plus `fill-outline-color: '#cccccc'`.
- Do NOT bake `source` declarations into style layers. Sources are declared by the consumer (PMTiles URL from STAC). Style files describe layer paint/layout/filter only.
- Do NOT bake the `type` field filter in. The geohaz-v2 sidebar splits into 4 sub-layers (Cumulative / Yearly / Velocity / Annual amplitude) by attaching `filter: ['==', ['get','type'], '<value>']` at consume time. One render = base style; consumer derives the four.

## Build script behavior

- Walk `src/styles/`, dynamically import each `*.ts`, write JSON to `dist-json/styles/{layer-name}/{render-id}.json`.
- Emit `dist-json/index.json` listing every render: `[{ layer: "...", render: "...", path: "styles/.../..." }, ...]` — used by STAC autodiscovery and consumers that want to enumerate available styles without crawling the bucket.

## CI workflow

- Trigger: tag push matching `v*`.
- Steps: checkout → install → `npm run build:json` → GCP auth via Workload Identity Federation (assume `GCP_WIF_PROVIDER` secret exists; ask user if not) → `gsutil -m rsync -r dist-json/ gs://maps-assets/styles/`.
- **No npm publish step.** Repo is JSON producer only.

## Acceptance for v0.1.0

1. `npm run build:json` produces `dist-json/styles/hazards-displacement-contours/default.json` containing valid MapLibre `LayerSpecification[]`.
2. `dist-json/index.json` lists it.
3. CI workflow file exists wired to tag pushes (don't run it yet — wait for tag).
4. README explains: how to add a style, build process, where consumers fetch from.
5. This `CLAUDE.md` stays current — update if any rule above changes.

## Hard rules

- No npm publish.
- No `@ugs/styles` consumer dep in any app.
- No bundler beyond `tsc` / `tsx` for the build script.
- No source declarations in style layers.
- No GeoStyler / SLD-to-Mapbox auto-conversion.
- Hand-translate SLDs.

## References

- Live SLDs: `{GEOSERVER_URL}/wms?service=WMS&version=1.1.1&request=GetStyles&layers={workspace:layer}` (public, no auth).
- Geohaz-v2 displacement-contours split: branch `fix/data-reviewer-split-displacement-contours` (consumer side, today uses WMS + cql_filter; will swap to PMTiles + this style file once Track 5 ships).
- CNG architecture plan: lives in geohaz-v2 agent memory at `cng-architecture-plan.md`. If anything here conflicts with that doc, the doc wins. Ask before deviating.
