# ugs-styles — PR review guide
TypeScript build scripts (tsx, no UI framework) that author declarative specs and GENERATE MapLibre
GL style JSON, published CDN-only and bound to warehouse data by STAC item id. Review ONLY the
changed lines against these repo-specific rules (general bug/security/perf/quality is assumed).
Cite file:line, use repo context for correctness, skip unrelated pre-existing issues, group nits.

## MapLibre style authoring (the ones that bite here)
- Author the spec, not raw GL: prefer `{ archetype, field, palette }` (`archetypes/`) over a
  handwritten `StyleLayer[]`; the handwritten escape hatch is a last resort — flag it and justify.
  Never hand-edit `dist-json/*`; it's build output (`build:json`).
- Field/value drift is THE bug: any `field` a style keys on must exist in the layer's GeoParquet,
  and palette keys + `match`/filter literals must equal real data values (case-sensitive). Run
  `npm run validate` (prefer `--strict`); a field-missing error is a hard fail — never silence it
  or ship around it. Everything falling through to `other` = mis-keyed.
- Source binding: within a render, layer `id`s unique; each layer's `source` + `source-layer` must
  match the layer's real PMTiles binding (source-layer ≠ the topic name — easy to get wrong) and
  `type` must match geometry (fill/line vs circle/symbol). A wrong source-layer draws nothing.
- `itemId` is the warehouse join key: `dist-json/index.json` keys must be real STAC item ids
  (cross-check `npm run coverage`) — a typo'd id means the style silently never attaches.
- Reuse: palettes from `palettes/index.ts` (not inline hex); expressions from the builders
  (`match`, zoom-interpolate, pwfdf), not hand-rolled arrays. `interpolate`/`step` stops strictly
  ascending; sane `minzoom`/`maxzoom`.
- Sprites/glyphs: pie sprites are generated (`gen:sprites`) — any `icon-image`/sprite id a style
  references must exist in the sheet; `text-font` stacks must exist at the CDN glyphs endpoint. A
  new tile/sprite/glyph host must be allowlisted in the consuming viewer's CSP.

## TypeScript / scripts
- Fail loud: `build:json`/`validate`/`coverage` must exit non-zero on bad input — never
  warn-and-exit-0. Validate external input at boundaries: GeoParquet columns (hyparquet), the live
  STAC catalog, SLD input in `sld-to-gl.ts` (dev-only authoring, NOT in the publish path).
- No `any`/unsafe casts/non-null `!`; keep specs typed against `types.ts`.

## Publish / process
- Merge to `master` does NOT publish — a `v0.1.x` tag ships `dist-json` to the CDN. Flag a PR whose
  description assumes "merge = live." Conventional-commit title. GCP/CDN hosts only, no other vendor.
