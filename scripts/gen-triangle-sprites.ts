/**
 * Triangle sprite-sheet generator for the Non-Petroleum Wells `by-purpose` render.
 *
 * MapLibre draws circles natively but not triangles, so a triangle marker has to be an icon. Like
 * the UCRC wells `by-boxtype` discs, we pre-bake one triangle per purpose color into a MapLibre
 * sprite sheet here (ugs-styles is static CDN JSON) and publish it alongside the style; the render
 * stamps `icon-image = npwc-purpose-<code>` per well. Colors come from the shared NPWC purpose
 * palette (reused UCRC purpose tones), so a purpose is the same color as on the UCRC wells layer.
 *
 * Distinct codes are read from the live GeoParquet so the sheet self-heals when the data changes;
 * the Unknown stand-in (`npwc-purpose-U`) is always baked so a blank/missing purpose still draws.
 *
 * Output (consumed by the viewer via map.addSprite(url), same as gen-pie-sprites):
 *   dist-json/styles/enmin_non_petroleum_wells/sprite.{png,json}
 *   dist-json/styles/enmin_non_petroleum_wells/sprite@2x.{png,json}
 *
 * Usage: npm run gen:triangle-sprites   (reads distinct purpose codes from the live GeoParquet)
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { asyncBufferFromUrl, parquetReadObjects } from 'hyparquet';
import { compressors } from 'hyparquet-compressors';
import { createCanvas, type SKRSContext2D } from '@napi-rs/canvas';
import { NPWC_PURPOSE_NAMESPACE, NPWC_BLANK_CODE, npwcFill, npwcStroke } from '../src/palettes/npwc-purpose';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GEOPARQUET_BASE = (process.env.GEOPARQUET_BASE
    ?? 'https://maps-assets.geology.utah.gov/warehouse').replace(/\/+$/, '');
const ITEM = 'enmin_non_petroleum_wells';
const FIELD = 'purpose';
const OUT_DIR = resolve(__dirname, '..', 'dist-json', 'styles', 'enmin_non_petroleum_wells');

// Base cell size (px @1x). Matches the UCRC wells sprite so triangles and circles share a footprint
// at every zoom — the render's icon-size stops are (2 × the UCRC circle-radius) / SIZE.
const SIZE = 40;
const STROKE_W = 3;

const spriteName = (code: string) => `${NPWC_PURPOSE_NAMESPACE}-${code}`;

/** Draw one upward triangle (fill + per-purpose stroke) into ctx at (ox,oy) in a `scale`d space. */
function drawTriangle(ctx: SKRSContext2D, ox: number, oy: number, code: string, scale: number): void {
    const size = SIZE * scale, sw = STROKE_W * scale, pad = sw;  // inset so the stroke isn't clipped
    const x0 = ox + pad, y0 = oy + pad, x1 = ox + size - pad, y1 = oy + size - pad;
    const cx = (x0 + x1) / 2;
    ctx.beginPath();
    ctx.moveTo(cx, y0);   // apex (top)
    ctx.lineTo(x1, y1);   // bottom-right
    ctx.lineTo(x0, y1);   // bottom-left
    ctx.closePath();
    ctx.fillStyle = npwcFill(code);
    ctx.fill();
    ctx.lineWidth = sw;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = npwcStroke(code);
    ctx.stroke();
}

/** Pack one sheet at `scale` (1 or 2) → {png, index}. index maps sprite name → frame. */
function buildSheet(codes: string[], scale: number): { png: Buffer; index: Record<string, unknown> } {
    const cell = SIZE * scale;
    const cols = Math.ceil(Math.sqrt(codes.length));
    const rows = Math.ceil(codes.length / cols);
    const canvas = createCanvas(cols * cell, rows * cell);
    const ctx = canvas.getContext('2d');
    const index: Record<string, unknown> = {};
    codes.forEach((code, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const x = col * cell, y = row * cell;
        drawTriangle(ctx, x, y, code, scale);
        index[spriteName(code)] = { x, y, width: cell, height: cell, pixelRatio: scale };
    });
    return { png: canvas.toBuffer('image/png'), index };
}

async function distinctCodes(): Promise<string[]> {
    const url = `${GEOPARQUET_BASE}/geoparquet/${ITEM}/${ITEM}.parquet`;
    const file = await asyncBufferFromUrl({ url });
    const rows = await parquetReadObjects({ file, columns: [FIELD], compressors });
    const set = new Set<string>();
    for (const r of rows) {
        const v = r[FIELD];
        if (typeof v === 'string' && v.trim()) set.add(v.trim());
    }
    // Always bake the Unknown stand-in, even when the current extract has no blank/`U` wells — the
    // render points blank/missing purpose at it, and a missing sprite draws nothing.
    set.add(NPWC_BLANK_CODE);
    return [...set].sort();
}

async function main(): Promise<void> {
    const codes = await distinctCodes();
    console.log(`[triangle-sprites] ${codes.length} distinct ${FIELD} codes from ${ITEM}: ${codes.join(', ')}`);
    await mkdir(OUT_DIR, { recursive: true });
    for (const [suffix, scale] of [['', 1], ['@2x', 2]] as const) {
        const { png, index } = buildSheet(codes, scale);
        await writeFile(resolve(OUT_DIR, `sprite${suffix}.png`), png);
        await writeFile(resolve(OUT_DIR, `sprite${suffix}.json`), JSON.stringify(index, null, 2));
    }
    console.log(`[triangle-sprites] wrote sprite.{png,json} + sprite@2x.{png,json} → ${OUT_DIR}`);
}

try { await main(); } catch (err) { console.error(err); process.exit(1); }
