/**
 * Bake every style's icon sprite sheet — one discovery-based entry point.
 *
 * MapLibre draws circles natively but no other marker shape, so styles needing triangle / pie / …
 * icons declare a canvas-free `sprite: SpriteRecipe` next to their `spec` (see src/sprites.ts). This
 * walks src/styles/, bakes each recipe into dist-json/styles/<dir>/sprite.{png,json} (+@2x), and is
 * the single `gen:sprites` step in `preview` and the publish workflow — adding a new icon style
 * needs no change here, in package.json, or in the workflow, just the style file.
 *
 * Frame values come either from a fixed list in the recipe (reproducible — output is a function of
 * the commit) or from the item's live GeoParquet (open domains). Output is consumed by the viewer
 * via map.addSprite / addImage (preview/index.html mirrors it).
 *
 * Usage: npm run gen:sprites   (run after build:json, which wipes dist-json)
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { asyncBufferFromUrl, parquetReadObjects, parquetMetadataAsync } from 'hyparquet';
import { compressors } from 'hyparquet-compressors';
import { createCanvas, type SKRSContext2D } from '@napi-rs/canvas';
import type { SpriteCell, SpriteRecipe } from '../src/sprites';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const STYLES_DIR = resolve(ROOT, 'src', 'styles');
const OUT_ROOT = resolve(ROOT, 'dist-json', 'styles');
const GEOPARQUET_BASE = (process.env.GEOPARQUET_BASE
    ?? 'https://maps-assets.geology.utah.gov/warehouse').replace(/\/+$/, '');

const SIZE = 40;        // base cell px @1x — the shared marker footprint (matches the render icon-size stops)
const STROKE_W = 3;

// --- shape handlers: the only canvas code, one per SpriteRecipe['shape'] -------------------------

/** Upward triangle, fill + per-purpose stroke, inset so the round-join stroke stays in the cell. */
function drawTriangle(ctx: SKRSContext2D, ox: number, oy: number, cell: SpriteCell, scale: number): void {
    const size = SIZE * scale, sw = STROKE_W * scale, pad = sw;
    const x0 = ox + pad, y0 = oy + pad, x1 = ox + size - pad, y1 = oy + size - pad, cx = (x0 + x1) / 2;
    ctx.beginPath();
    ctx.moveTo(cx, y0);   // apex (top)
    ctx.lineTo(x1, y1);   // bottom-right
    ctx.lineTo(x0, y1);   // bottom-left
    ctx.closePath();
    ctx.fillStyle = cell.fill ?? '#BDBDBD';
    ctx.fill();
    ctx.lineWidth = sw;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = cell.stroke ?? '#858585';
    ctx.stroke();
}

// Pie disc split into equal wedges (one per group the well's codes touch), dark divider + ring.
// Geometry is a port of the UCRC map viewer's pie-wedge sprites; a single wedge draws as a solid disc.
const PIE_STROKE = '#1a1a1a';
function drawPie(ctx: SKRSContext2D, ox: number, oy: number, cell: SpriteCell, scale: number): void {
    const wedges = cell.wedges ?? [];
    if (wedges.length === 0) return;   // empty combo → transparent cell
    const size = SIZE * scale, sw = STROKE_W * scale;
    const cx = ox + size / 2, cy = oy + size / 2, rFill = size / 2, rStroke = size / 2 - sw / 2;
    const twoPi = Math.PI * 2, sweep = twoPi / wedges.length;
    let angle = Math.PI;   // start at 9 o'clock, sweep clockwise
    for (const color of wedges) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, rFill, angle, angle + sweep);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        angle += sweep;
    }
    ctx.strokeStyle = PIE_STROKE;
    ctx.lineWidth = sw;
    if (wedges.length > 1) {   // wedge dividers — none on a single-group disc, so it reads as solid
        let a = Math.PI;
        for (let i = 0; i < wedges.length; i++) {
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(a) * rStroke, cy + Math.sin(a) * rStroke);
            ctx.stroke();
            a += sweep;
        }
    }
    ctx.beginPath();   // outer ring (inset so it doesn't clip)
    ctx.arc(cx, cy, rStroke, 0, twoPi);
    ctx.stroke();
}

const SHAPES: Record<SpriteRecipe['shape'], (ctx: SKRSContext2D, ox: number, oy: number, cell: SpriteCell, scale: number) => void> = {
    triangle: drawTriangle,
    pie: drawPie,
};

// --- packing (shared) ---------------------------------------------------------------------------

/** Pack one sheet at `scale` (1 or 2) → {png, index}. index maps every cell name → its frame. */
function buildSheet(cells: SpriteCell[], shape: SpriteRecipe['shape'], scale: number): { png: Buffer; index: Record<string, unknown> } {
    const cell = SIZE * scale;
    const cols = Math.ceil(Math.sqrt(cells.length));
    const rows = Math.ceil(cells.length / cols);
    const canvas = createCanvas(cols * cell, rows * cell);
    const ctx = canvas.getContext('2d');
    const draw = SHAPES[shape];
    const index: Record<string, unknown> = {};
    cells.forEach((c, i) => {
        const col = i % cols, row = Math.floor(i / cols), x = col * cell, y = row * cell;
        draw(ctx, x, y, c, scale);
        for (const name of c.names) index[name] = { x, y, width: cell, height: cell, pixelRatio: scale };
    });
    return { png: canvas.toBuffer('image/png'), index };
}

/** Distinct non-blank string values of `field` in the item's live GeoParquet. */
async function distinct(itemId: string, field: string): Promise<string[]> {
    const url = `${GEOPARQUET_BASE}/geoparquet/${itemId}/${itemId}.parquet`;
    const file = await asyncBufferFromUrl({ url });
    // Fail loud on column drift: hyparquet silently ignores a missing PROJECTION column (unlike a
    // filter column), which would bake a degenerate sheet and exit 0 — a renamed field draws nothing.
    const meta = await parquetMetadataAsync(file);
    const cols = meta.schema.filter((s) => s.num_children == null).map((s) => s.name);
    if (!cols.includes(field)) throw new Error(`${itemId}: sprite field '${field}' not in the GeoParquet schema (renamed or dropped?)`);
    const rows = await parquetReadObjects({ file, columns: [field], compressors });
    const set = new Set<string>();
    for (const r of rows) {
        const v = r[field];
        if (typeof v === 'string' && v.trim()) set.add(v.trim());
    }
    return [...set];
}

async function main(): Promise<void> {
    let baked = 0, errors = 0;
    const bakedDirs = new Set<string>();   // one sprite sheet per style dir — the CDN path is per-dir
    for (const dir of await readdir(STYLES_DIR, { withFileTypes: true })) {
        if (!dir.isDirectory()) continue;
        for (const f of (await readdir(resolve(STYLES_DIR, dir.name))).filter((x) => x.endsWith('.ts'))) {
            const mod = await import(pathToFileURL(resolve(STYLES_DIR, dir.name, f)).href);
            const recipe: SpriteRecipe | undefined = mod.sprite;
            if (!recipe) continue;
            const itemId: string | undefined = mod.spec?.itemId;
            if (!itemId) {
                console.error(`✗ ${dir.name}/${f}: has a sprite recipe but no spec.itemId to key on`);
                errors++;
                continue;
            }
            if (bakedDirs.has(dir.name)) {
                console.error(`✗ ${dir.name}/${f}: a second sprite recipe in this dir would overwrite ${dir.name}/sprite.* — one icon render per style dir`);
                errors++;
                continue;
            }
            bakedDirs.add(dir.name);
            const values = 'constant' in recipe.values ? recipe.values.constant : await distinct(itemId, recipe.values.field);
            const cells = recipe.cells(values);
            const outDir = resolve(OUT_ROOT, dir.name);
            await mkdir(outDir, { recursive: true });
            for (const [suffix, scale] of [['', 1], ['@2x', 2]] as const) {
                const { png, index } = buildSheet(cells, recipe.shape, scale);
                await writeFile(resolve(outDir, `sprite${suffix}.png`), png);
                await writeFile(resolve(outDir, `sprite${suffix}.json`), JSON.stringify(index, null, 2));
            }
            console.log(`+ ${dir.name} (${recipe.shape}): ${cells.length} cell(s) from ${values.length} value(s)`);
            baked++;
        }
    }
    console.log(`\nbaked ${baked} sprite sheet(s)`);
    if (errors) { console.error(`${errors} error(s)`); process.exit(1); }
}

try { await main(); } catch (err) { console.error(err); process.exit(1); }
