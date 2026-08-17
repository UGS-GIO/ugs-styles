/**
 * Sprite-recipe contract — the discovery surface for baked icon sprites.
 *
 * MapLibre draws circles natively but no other marker shape, so a style that needs triangle / pie /
 * … icons declares `sprite: SpriteRecipe` next to its `spec`. scripts/gen-sprites.ts walks the
 * styles, bakes every recipe into dist-json/styles/<dir>/sprite.{png,json} (+@2x), and is the single
 * `gen:sprites` step in preview + the publish workflow — so a NEW icon style needs no change to
 * package.json, the workflow, or any generator, just its own style file with a recipe.
 *
 * This contract is deliberately CANVAS-FREE (plain data + pure functions, no @napi-rs/canvas import):
 * build-json.ts imports each style module for its `spec`, and coupling that to the build-time canvas
 * dependency would be gratuitous. The drawing lives entirely in gen-sprites.ts, keyed by `shape`.
 */

// One packed cell of a sprite sheet. `names` are every icon-image name that resolves to this cell —
// many→one when several inputs share pixels. Dedup is each recipe's own job inside `cells()` (see
// the pie's group-set merge); this array is taken as-is, one drawn cell per element. The rest is
// plain color data the shape handler in gen-sprites reads; no geometry, no canvas here.
export type SpriteCell = {
    names: string[];                 // icon-image names pointing at this cell
    fill?: string;                   // `triangle`: fill + stroke
    stroke?: string;
    wedges?: readonly string[];      // `pie`: ordered wedge colors (a single color = a solid disc)
};

export type SpriteRecipe = {
    shape: 'triangle' | 'pie';
    // Where the frame values come from: a fixed list (output is a function of the commit —
    // reproducible, no build-time network) or the distinct values of a field read from the item's
    // live GeoParquet (for genuinely open domains, e.g. the pie's box-type combos).
    values: { constant: readonly string[] } | { field: string };
    // Map the (distinct) input values → the sheet's cells. Pure + canvas-free: dedup, naming, and
    // color resolution live here; gen-sprites just draws each cell with the `shape` handler.
    cells: (values: readonly string[]) => SpriteCell[];
};
