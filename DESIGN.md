# ugs-styles — design (from scratch)

How vector (and single-band raster) styling *should* work for the UGS Cloud-Native Geospatial
stack, designed clean — not as a translation of the point-in-time GeoServer SLD dump that
seeded this repo. The legacy `legacy-sld/` pile and the hand-painted per-layer modules are
**reference only**; this is the target.

Companion: the warehouse consumes whatever this repo publishes via STAC (`ugs-warehouse/docs/STYLING.md`).
That contract — **bind by STAC item id, through the render extension** — is fixed. This doc is
about how styles are *authored and generated* on this side.

---

## 1. The core shift: style is **config**, generated from data semantics

The legacy mistake was hand-painting MapLibre/SLD per layer. That doesn't scale (hundreds of
layers), drifts (handwritten paint goes stale when data changes), and is inconsistent (every
author picks their own colors).

Flip it. The gold layers have **known, typed, documented attributes** (dbt models + the
`schema_registry` catalog metadata). Most UGS layers are thematically simple. So:

> A style is a **declaration** — `{ archetype, field, palette }` — and the MapLibre GL fragment
> is **generated** from it, with the data **domain pulled from the layer itself**.

```
 per-layer style spec            archetype library          palette/token library
 { itemId, render,        +      categorical | graduated  +  named ramps & colors
   archetype, field,             | simple | point |          (FGDC geologic, hazard,
   palette }                     geologic-unit               brand tokens)
        │                              │                          │
        └──────────────┬───────────────┴──────────────┬──────────┘
                       │   domain (distinct values /   │
                       │   class breaks) derived from  │
                       │   the GeoParquet via DuckDB    │
                       ▼   (or schema_registry)         ▼
                 generator  →  MapLibre GL fragment (StyleLayer[])
                       │
                       ▼
        dist-json/styles/<layer>/<render>.json  +  index.json (keyed by itemId)
                       │  (CDN)
                       ▼
        warehouse attaches it to the STAC item's render extension (by item id)
```

Tens of small configs replace hundreds of hand-painted styles, stay consistent via shared
palettes, and self-heal when domains change.

---

## 2. Style spec (what an author writes)

One spec per `(itemId, render)`. Default the common case to ~3 meaningful lines.

```ts
export const spec = {
  itemId: 'hazards_qfaults',        // == STAC item id (the warehouse topic.stem / series_id)
  render: 'default',                // render id; multiple renders per item allowed
  kind: 'vector',                   // 'vector' | 'raster'
  assets: ['pmtiles'],              // STAC asset(s) this render targets

  archetype: 'categorical',         // picks the generator (see §3)
  field: 'fault_type',              // attribute the archetype keys on
  palette: 'qfaults',               // named palette (see §4)
  // optional archetype params: classes/breaks, radius, width, opacity, zoom ramps…
  title: 'Quaternary faults by type',
} satisfies StyleSpec;
```

Raster variant carries render params instead of a GL fragment (titiler renders these):

```ts
export const spec = {
  itemId: 'enmin_gravity', render: 'default', kind: 'raster', assets: ['cog'],
  archetype: 'continuous-raster', palette: 'viridis', rescale: [-120, 40],
} satisfies StyleSpec;
```

`build-json` reads `spec`, runs the generator, writes the GL JSON, and emits the manifest entry
(`itemId, render, kind, assets, path, …`) the warehouse joins on.

---

## 3. Archetypes (the only render logic, ~5 of them)

Each archetype is a function `(spec, domain) -> StyleLayer[]`. Add an archetype only when a real
layer doesn't fit an existing one.

| archetype | for | keys on | emits |
|---|---|---|---|
| `simple` | single-symbol layers | — | one fill/line/circle in a palette tone, geometry-agnostic |
| `categorical` | thematic classes (hazard class, fault type, purpose) | a string field | `match` expression field→palette color |
| `graduated` | ordinal/quantitative (susceptibility, depth) | a numeric field + breaks | `step`/`interpolate` over a sequential ramp |
| `point` | wells, sites, stations | optional category field | circle (or symbol) with zoom-scaled radius |
| `geologic-unit` | seamless units / map plates | `unit_symbol` | `match` on unit → FGDC color (+ pattern escape, §7) |
| `continuous-raster` | single-band COG | band value | colormap + rescale (render-extension params) |

Archetypes compose the existing `expressions/` helpers (`matchByField`, etc.). They own
zoom-scaling, default opacities, stroke conventions — so every layer of a kind looks consistent.

---

## 4. Palettes & tokens (one source for color)

`palettes/` holds **named** color sets, referenced by name from specs — never inline hex in a
spec. Three kinds:
- **categorical maps**: `Record<value, color>` (e.g. `qfaults`, `ucrc-purpose`, FGDC unit colors).
- **sequential/diverging ramps**: ordered stops for `graduated`/raster.
- **brand tokens**: line/stroke defaults, the burnt-orange brand, light/dark variants.

Benefits: consistent look, central theming (dark mode), and a palette can be reused across
layers that share a domain (all hazard layers → one `hazard` ramp).

---

## 5. Domain derivation (derive-from-truth)

Don't hand-list categories or class breaks — they rot. At build time, the generator resolves the
domain from the data:
- **categorical**: `SELECT DISTINCT <field>` over the layer's GeoParquet (DuckDB-WASM/CLI), or the
  enumerated values in `schema_registry`.
- **graduated**: quantiles/equal-interval computed from the column, or explicit `breaks` in the spec.

Unmapped values fall back to the palette's `Other` color (and the build **warns** — see §8).
Result: when the data gains a new hazard class, a rebuild picks it up; handwritten GL wouldn't.

> Source of the domain (live parquet vs `schema_registry`) is an open question (§10). Start with
> the parquet (always present); move to `schema_registry` if a build-time DB read is cheaper/cleaner.

---

## 6. Distribution & binding (fixed — see warehouse STYLING.md)

- `build-json` → `dist-json/styles/<layer>/<render>.json` (`{ layers: [...] }`) + `index.json`
  manifest keyed by **itemId**. CDN-only.
- The **warehouse** reads `index.json`, joins by item id, and attaches the render extension to the
  STAC item (vector → `style_url`; raster → colormap/rescale). Both viewers consume `item.renders`.
- This repo has **zero STAC knowledge** — it only emits styles + a manifest. (Already implemented:
  `core/styles.py` + `attach_renders` in the warehouse.)

---

## 7. Escape hatch — hand-authored GL

Some layers are genuinely bespoke (geologic plates with fill patterns, multi-rule symbology that
no archetype models). Allow a spec to provide raw `StyleLayer[]` instead of an archetype:

```ts
export const spec = { itemId: '…', render: 'default', kind: 'vector', assets: ['pmtiles'] };
export default [ /* hand-written StyleLayer[] */ ];   // overrides the generator
```

Default to archetype-config; drop to handwritten only when the data isn't archetypable. Keep these
rare — every handwritten style is future drift.

---

## 8. Validation (CI gate in build-json)

- `spec.itemId` present; `(itemId, render)` unique across the repo.
- `field` exists in the layer (check against the parquet schema / `schema_registry`).
- palette covers the derived domain → **warn + fallback** on unmapped values (don't fail; data leads).
- generated GL validates against the MapLibre style spec.
- Skip (don't fail) styles with no `spec`/binding — they're legacy, pending bind-or-delete (§9).

---

## 9. Migrating off the legacy SLD pile

**Stop translating SLDs.** They're a color reference, not a thing to port. Per layer, *as it
pipelines into the warehouse*:
1. Confirm the warehouse mints its item id (`{layer}` stem / `series_id`).
2. Write a `spec` — pick archetype + field + palette (glance at the old SLD only for color intent).
3. Build, eyeball, delete the legacy SLD + any `*_review`/`*_current`-named legacy dir.

Because the warehouse joins by item id, an unbound legacy style has **no item to attach to** → it's
inert and never autodiscovers. The migration ledger is mechanical:
`diff(warehouse item ids, manifest itemIds)` → items needing a style (to-do) and manifest entries
with no item (stale → delete). The unmigrated pile stays harmless and shrinks. This is the same
work as your "kill the non-production styles" goal — not a separate cleanup.

---

## 10. Open questions

- **Domain source**: live GeoParquet (always available, needs a build-time DuckDB read) vs
  `schema_registry` enumerations (cheaper, but must be populated). Start with parquet.
- **Where specs live**: this repo (cartographer-owned, decoupled) vs a `schema_registry` styles
  table (style travels with the data contract, but couples to the dbt/registry release cycle).
  Leaning: specs here, palettes here, domain pulled from data — keep styling cartographer-owned.
- **Generated-vs-committed JSON**: `dist-json/` is build output. Keep it git-ignored + CI-built, or
  commit for diff visibility? (CDN only needs the build artifact.)
- **Patterns/sprites** for `geologic-unit` fills — needs a sprite pipeline; out of scope for v1
  (use solid FGDC colors first).

---

## 11. Target directory layout

```
src/
  palettes/            named color sets + ramps + brand tokens
  expressions/         reusable MapLibre expression builders (match, step, interpolate, zoom-scale)
  archetypes/          categorical | graduated | simple | point | geologic-unit | continuous-raster
  styles/<layer>/<render>.ts   the per-(item,render) `spec` (or a handwritten escape-hatch fragment)
  types.ts             StyleLayer, Binding, StyleSpec
scripts/
  build-json.ts        spec -> generator -> dist-json/*.json + index.json (keyed by itemId), validated
dist-json/             build output -> CDN
legacy-sld/            reference only; deleted as each layer migrates
```

---

**TL;DR.** Style = `{ archetype, field, palette }`, generated, domain pulled from the data, bound
to the warehouse by STAC item id. A handful of archetypes + shared palettes replace hundreds of
hand-painted styles, stay consistent, and self-heal. Handwritten GL is the rare escape hatch.
Legacy SLDs are a color reference that evaporates as layers pipeline through.
