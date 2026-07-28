/**
 * Pie-wedge sprite-sheet generator for the UCRC wells `by-boxtype` render.
 *
 * `box_type_codes` is a comma-delimited multi-value field, so it can't be a single fill color —
 * a well's icon is a disc split into colored wedges. Wedges are per GROUP (Core / Cuttings /
 * Other), not per box type, so a disc carries at most 3 slices however many types the well holds.
 * ugs-styles is static CDN JSON, so we pre-bake the discs into a MapLibre sprite sheet here (one
 * sprite name per distinct combo in the live data, sharing a frame with every other combo that
 * resolves to the same groups), published alongside the style. Geometry is a port of
 * ugs-map-viewer/src/lib/map/pie-wedge-sprites.ts; the per-type shading it does is intentionally
 * dropped here.
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
import type { UcrcBoxGroup } from '../src/palettes/ucrc-boxtype';
import { UCRC_BOX_GROUP_COLORS, UCRC_BOX_GROUP_ORDER, boxTypeGroup, UCRC_BOX_TYPE_NAMESPACE, UCRC_BOX_NO_CODES } from '../src/palettes/ucrc-boxtype';

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

/**
 * The groups a combo touches, in fixed group order — the disc's wedges. Color is per GROUP, so a
 * combo of five CORE types is ONE purple wedge, not five: a disc never has more than 3 slices.
 * Unknown tokens fall into OTHER via boxTypeGroup.
 */
function groupsOf(combo: string): UcrcBoxGroup[] {
    const present = combo.split(',').map((s) => s.trim()).filter(Boolean);
    const hit = new Set(present.map(boxTypeGroup));
    return UCRC_BOX_GROUP_ORDER.filter((g) => hit.has(g));
}

/** Draw one disc into ctx at (ox,oy) in a `scale`d coordinate space (1 or 2). */
function drawDisc(ctx: SKRSContext2D, ox: number, oy: number, groups: UcrcBoxGroup[], scale: number): void {
    const size = SIZE * scale;
    const sw = STROKE_W * scale;
    if (groups.length === 0) return;  // empty combo → transparent cell

    const cx = ox + size / 2, cy = oy + size / 2;
    const rFill = size / 2, rStroke = size / 2 - sw / 2;
    // Equal sweep per group present: token counts are "how many box types were recorded", not a
    // quantity of material, so weighting wedges by them would imply a proportion that isn't there.
    const twoPi = Math.PI * 2, sweep = twoPi / groups.length;
    let angle = Math.PI;  // start at 9 o'clock, sweep clockwise (viewer parity)

    for (const g of groups) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, rFill, angle, angle + sweep);
        ctx.closePath();
        ctx.fillStyle = UCRC_BOX_GROUP_COLORS[g];
        ctx.fill();
        angle += sweep;
    }
    ctx.strokeStyle = STROKE_COLOR;
    ctx.lineWidth = sw;
    if (groups.length > 1) {  // wedge dividers — none on a single-group disc, so it reads as solid
        let a = Math.PI;
        for (let i = 0; i < groups.length; i++) {
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

/**
 * Pack one sheet at `scale` (1 or 2) → {png, index}. index maps sprite name → frame.
 * Every combo that resolves to the same set of groups draws the same disc, so the sheet holds one
 * cell per distinct group-set (≤ 7) and the index points every combo name at the shared frame —
 * icon-image still resolves by exact code string, the pixels behind it are just deduped.
 */
function buildSheet(combos: string[], scale: number): { png: Buffer; index: Record<string, unknown> } {
    const cell = SIZE * scale;
    const byKey = new Map<string, { groups: UcrcBoxGroup[]; combos: string[] }>();
    for (const combo of combos) {
        const groups = groupsOf(combo);
        const key = groups.join('+');
        const entry = byKey.get(key);
        if (entry) entry.combos.push(combo);
        else byKey.set(key, { groups, combos: [combo] });
    }
    const cells = [...byKey.values()];
    const cols = Math.ceil(Math.sqrt(cells.length));
    const rows = Math.ceil(cells.length / cols);
    const canvas = createCanvas(cols * cell, rows * cell);
    const ctx = canvas.getContext('2d');
    const index: Record<string, unknown> = {};
    cells.forEach(({ groups, combos: names }, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const x = col * cell, y = row * cell;
        drawDisc(ctx, x, y, groups, scale);
        for (const combo of names) index[spriteName(combo)] = { x, y, width: cell, height: cell, pixelRatio: scale };
    });
    return { png: canvas.toBuffer('image/png'), index };
}

async function distinctCombos(): Promise<string[]> {
    const url = `${GEOPARQUET_BASE}/geoparquet/${ITEM}/${ITEM}.parquet`;
    const file = await asyncBufferFromUrl({ url });
    const rows = await parquetReadObjects({ file, columns: [FIELD], compressors });
    const set = new Set<string>();
    for (const r of rows) {
        const v = r[FIELD];
        if (typeof v === 'string' && v.trim()) set.add(v.trim());
    }
    // Always bake the stand-in disc, even when the current extract has no code-less wells —
    // the render points blank/missing codes at it, and a missing sprite draws nothing.
    set.add(UCRC_BOX_NO_CODES);
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

try { await main(); } catch (err) { console.error(err); process.exit(1); }
