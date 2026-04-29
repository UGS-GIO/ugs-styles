# @ugs-gio/styles

MapLibre style modules for UGS map viewers. Source-of-truth for vector styling.

## What's inside

```
src/
  palettes/        shared color tokens (categorical, sequential)
  expressions/     reusable maplibre expression builders
  styles/{layer}/{render-id}.ts   per-layer per-render style fragments
scripts/
  layers.json      layers to bulk-fetch SLDs from
  import-sld.ts    legacy SLD reference dump
  build-json.ts    compile TS styles → CDN-shaped JSON
legacy-sld/        SLD reference, deleted once migration done
dist-json/         build output, uploaded to CDN
```

## Two outputs, one source

```
ugs-styles repo (TS)
  ├─→ tsup build → npm/git package → typed import in viewer
  └─→ build:json → JSON files → CDN → STAC item renders.style_url
```

Both outputs come from the same TS source. Edit once, use either way.

## Install in a consumer

Direct from GitHub (no npm registry):

```json
"dependencies": {
  "@ugs-gio/styles": "github:UGS-GIO/ugs-styles#v0.1.0"
}
```

Then in code:

```ts
import { ucrcWellsByPurpose, UCRC_PURPOSE_FILL } from '@ugs-gio/styles';

map.addSource('enmin_ucrc_wells', { type: 'geojson', data: ... });
ucrcWellsByPurpose.forEach(layer => map.addLayer(layer));
```

## Workflow

### Adding a new style

1. Add palette to `src/palettes/` if it doesn't exist
2. Create `src/styles/{layer-name}/{render-id}.ts` exporting `LayerSpecification[]`
3. Re-export from `src/index.ts`
4. `npm run typecheck`
5. Tag release, push, CI publishes JSON to CDN

### Importing legacy SLDs (one-shot reference)

Add layer name to `scripts/layers.json`, then:

```bash
npm install
npm run import:sld
```

Saves SLDs to `legacy-sld/` for migration reference. Not authoritative.

### Build JSON for CDN

```bash
npm run build:json
# outputs dist-json/{layer}/{render-id}.json
```

CI (TBD) syncs `dist-json/` to `gs://maps-assets.geology.utah.gov/styles/`.

## STAC integration

Each style JSON is referenced by a STAC item's `renders` extension:

```json
{
  "id": "enmin_ucrc_wells",
  "renders": {
    "by-purpose": {
      "title": "By Purpose",
      "style_url": "https://maps-assets.geology.utah.gov/styles/enmin_ucrc_wells/by-purpose.json"
    }
  }
}
```

Viewer reads STAC item, fetches `style_url`, applies layers to map.

## Conventions

- Layer dir name = qualified parquet/pmtiles slug (`enmin_ucrc_wells`)
- Render id = short kebab-case key (`by-purpose`, `by-box-type`, `default`)
- Source IDs in style fragments = layer slug (so consumer registers source under matching name)
- Palettes are `Record<string, string>` keyed by data value
- Expression helpers wrap maplibre's verbose tuple syntax with named functions
