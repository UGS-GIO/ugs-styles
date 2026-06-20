/**
 * Pie-wedge sprite-sheet generator for the UCRC wells `by-boxtype` render.
 *
 * `box_type_codes` is a comma-delimited multi-value field, so it can't be a single fill color —
 * the authoritative ugs-map-viewer draws a pie disc split into colored wedges per box type, at
 * RUNTIME via canvas. ugs-styles is static CDN JSON, so we pre-bake the same discs into a
 * MapLibre sprite sheet here (one sprite per distinct combo present in the live data), published
 * alongside the style. The wedge drawing is a faithful port of
 * ugs-map-viewer/src/lib/map/pie-wedge-sprites.ts (same geometry + colors).
 *
 * Output (consumed by the viewer via map.addSprite(url)):
 *   dist-json/styles/enmin_ucrc_wells_current/sprite.{png,json}
 *   dist-json/styles/enmin_ucrc_wells_current/sprite@2x.{png,json}
 *
 * Usage: npm run gen:sprites   (reads distinct combos from the live GeoParquet)
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { asyncBufferFromUrl, parquetReadObjects } from 'hyparquet';
import { compressors } from 'hyparquet-compressors';
import { createCanvas, type SKRSContext2D } from '@napi-rs/canvas';
import { UCRC_BOX_TYPE_CODES, UCRC_BOX_TYPE_COLORS, UCRC_BOX_TYPE_NAMESPACE } from '../src/palettes/ucrc-boxtype';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GEOPARQUET_BASE = (process.env.GEOPARQUET_BASE
    ?? 'https://maps-assets.geology.utah.gov/warehouse').replace(/\/+$/, '');
const ITEM = 'enmin_ucrc_wells';
const FIELD = 'box_type_codes';
const OUT_DIR = resolve(__dirname, '..', 'dist-json', 'styles', 'enmin_ucrc_wells_current');

const SIZE = 40;          // base disc size (px @1x) — matches the viewer's DEFAULT_SIZE
const STROKE_W = 3;
const STROKE_COLOR = '#1a1a1a';

const spriteName = (combo: string) => `${UCRC_BOX_TYPE_NAMESPACE}-${combo}`;

/** Draw one combo's pie disc into ctx at (ox,oy) in a `scale`d coordinate space (1 or 2). */
function drawCombo(ctx: SKRSContext2D, ox: number, oy: number, combo: string, scale: number): void {
    const size = SIZE * scale;
    const sw = STROKE_W * scale;
    const present = new Set(combo.split(',').map((s) => s.trim()).filter(Boolean));
    const codes = UCRC_BOX_TYPE_CODES.filter((c) => present.has(c));
    if (codes.length === 0) return;  // no wedge → transparent cell (matches viewer)

    const cx = ox + size / 2, cy = oy + size / 2;
    const rFill = size / 2, rStroke = size / 2 - sw / 2;
    const twoPi = Math.PI * 2, sweep = twoPi / codes.length;
    let angle = Math.PI;  // start at 9 o'clock, sweep clockwise (viewer parity)

    for (const code of codes) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, rFill, angle, angle + sweep);
        ctx.closePath();
        ctx.fillStyle = UCRC_BOX_TYPE_COLORS[code] ?? '#BDBDBD';
        ctx.fill();
        angle += sweep;
    }
    ctx.strokeStyle = STROKE_COLOR;
    ctx.lineWidth = sw;
    if (codes.length > 1) {  // wedge dividers
        let a = Math.PI;
        for (let i = 0; i < codes.length; i++) {
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(a) * rStroke, cy + Math.sin(a) * rStroke);
            ctx.stroke();
            a += sweep;
        }
    }
    ctx.beginPath();  // outer ring (inset so it doesn't clip)
    ctx.arc(cx, cy, rStroke, 0, twoPi);
    ctx.stroke();
}

/** Pack one sheet at `scale` (1 or 2) → {png, index}. index maps sprite name → frame. */
function buildSheet(combos: string[], scale: number): { png: Buffer; index: Record<string, unknown> } {
    const cell = SIZE * scale;
    const cols = Math.ceil(Math.sqrt(combos.length));
    const rows = Math.ceil(combos.length / cols);
    const canvas = createCanvas(cols * cell, rows * cell);
    const ctx = canvas.getContext('2d');
    const index: Record<string, unknown> = {};
    combos.forEach((combo, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const x = col * cell, y = row * cell;
        drawCombo(ctx, x, y, combo, scale);
        index[spriteName(combo)] = { x, y, width: cell, height: cell, pixelRatio: scale };
    });
    return { png: canvas.toBuffer('image/png'), index };
}

async function distinctCombos(): Promise<string[]> {
    const url = `${GEOPARQUET_BASE}/geoparquet/${ITEM}/${ITEM}.parquet`;
    const file = await asyncBufferFromUrl({ url });
    const rows = await parquetReadObjects({ file, columns: [FIELD], compressors });
    const set = new Set<string>();
    for (const r of rows) {
        const v = (r as Record<string, unknown>)[FIELD];
        if (typeof v === 'string' && v.trim()) set.add(v.trim());
    }
    return [...set].sort();
}

async function main(): Promise<void> {
    const combos = await distinctCombos();
    console.log(`[pie-sprites] ${combos.length} distinct ${FIELD} combos from ${ITEM}`);
    await mkdir(OUT_DIR, { recursive: true });
    for (const [suffix, scale] of [['', 1], ['@2x', 2]] as const) {
        const { png, index } = buildSheet(combos, scale);
        await writeFile(resolve(OUT_DIR, `sprite${suffix}.png`), png);
        await writeFile(resolve(OUT_DIR, `sprite${suffix}.json`), JSON.stringify(index, null, 2));
    }
    console.log(`[pie-sprites] wrote sprite.{png,json} + sprite@2x.{png,json} → ${OUT_DIR}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
