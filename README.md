# @ugs-gio/styles

Source-of-truth for MapLibre styling on UGS web/mobile maps. Replaces GeoServer SLDs as part of the UGS Cloud-Native Geospatial migration (PMTiles + parquet + STAC behind a CDN).

**Distribution: CDN-only.** This repo produces static JSON; consumers fetch over HTTP at runtime. No npm publish, no GitHub package install in apps.

A style is **declarative config**, not handwritten GL: declare `{ archetype, field, palette }` and
the MapLibre GL fragment is **generated**. Bound to warehouse data by **STAC item id**. Full
rationale in [`DESIGN.md`](DESIGN.md).

## What's inside

```
src/
  palettes/        named color sets + registry (palettes/index.ts)
  expressions/     reusable maplibre expression builders (match, zoom-interpolate)
  archetypes/      generate(spec) → StyleLayer[]  (simple | categorical | point)
  styles/{layer}/{render}.ts   per-render `spec` (or a handwritten StyleLayer[] escape hatch)
  types.ts         StyleLayer · StyleSpec · Binding
scripts/
  build-json.ts    spec → generate → dist-json/*.json + index.json (keyed by itemId), validated
  coverage.ts      diff live STAC catalog vs bound styles → the worklist
dist-json/         build output, synced to CDN by CI
```

## The loop (iterate as layers pipeline in)

```bash
npm install
npm run coverage      # what's piped into the warehouse but unstyled → your worklist
# pick an item id, write src/styles/<item>/<render>.ts (a ~6-line spec, below)
npm run dev           # watch (rebuild on save) + serve the live preview, opens the browser
#   → edit a spec, save, refresh preview: see the style on the layer's REAL PMTiles
#   → switch layers via the dropdown, or deep-link ?item=<id>&render=<id>
npm run build:json    # one-shot build + validate
npm run typecheck
# commit → CI rsyncs dist-json → CDN → warehouse attaches it to the STAC item's renders
```

**Visual preview (`preview/`)** renders a *locally-built* style on the layer's real PMTiles
from the CDN — the same source+source-layer binding the warehouse viewer does — so cartography
is tuned with no publish/reingest. `npm run dev` (watch + serve) is the tight loop; `npm run
preview` is one-shot. Override the data CDN with `?cdn=<base>`.

`build:json` produces `dist-json/styles/{layer}/{render}.json` (`{ "layers": [...] }`) and
`dist-json/index.json` (manifest keyed by `itemId`, the warehouse join key).

## Seeding from legacy GeoServer SLDs (one-time)

GeoServer is being retired; `scripts/sld-to-gl.ts` captures its authoritative SLD cartography
into committed GL style modules **once**, so nothing is lost. geostyler is a dev-only dep used
here at authoring time — **not** in the build/publish path; the emitted module is the source of
truth and is hand-editable thereafter.

```bash
npm run seed:sld -- <sld-file> <itemId>     # → src/styles/<itemId>/default.ts (bespoke GL)
npm run dev                                  # preview on real PMTiles — always verify
```

SLDs live in `ugs-sld-styles` / `sldStyleFiles` (pull fresh from GeoServer with
`sldStyleFiles ./run.sh pull` while it's still up). The translator preserves every rule's
filter + paint and rewrites string-equality filters **case-insensitively** (SLD literals drift
in case vs the live PMTiles values — e.g. `well constrained` vs `Well Constrained`). Always
preview: field/value drift beyond case will show as a layer that draws nothing.

## Adding a style

```ts
// src/styles/enmin_ucrc_wells_current/by-purpose.ts
import type { StyleSpec } from '../../types';
export const spec = {
  itemId: 'enmin_ucrc_wells',   // == STAC item id (the _current-stripped topic stem / series_id)
  render: 'by-purpose',
  kind: 'vector', assets: ['pmtiles'],
  archetype: 'point', field: 'purpose', palette: 'ucrc-purpose',
  title: 'UCRC wells by purpose',
} satisfies StyleSpec;
```

- New color set? add to `src/palettes/` and register it in `src/palettes/index.ts`.
- Archetypes: `simple` (single symbol), `categorical` (`match` field→palette; `geom: fill|line|circle`),
  `point` (circle, categorical when `field`+`palette` given). Add an archetype only when no
  existing one fits.
- **Bespoke escape hatch:** for cartography no archetype models, `export default [ /* StyleLayer[] */ ]`
  alongside the `spec` (the `spec` is still required for the itemId join).

### Rules

- **No `source` in fragments** — the consumer attaches the PMTiles source (via STAC).
- **`itemId` is the join key** — must equal the warehouse STAC item id, or it never binds.
- Don't translate SLDs. Pick an archetype + palette; the old SLDs are color reference only.

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
