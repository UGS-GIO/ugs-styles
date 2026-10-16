/**
 * Write an Esri renderer next to every vector render build-json emitted (src/esri.ts).
 *
 * Output: dist-json/esri/{layer}/{render}.json  — { renderer, labelingInfo?, minScale? }
 *         index.json entries gain `esri` (the path), so a FeatureServer finds it by item id.
 *
 * Reads only the styled columns of each layer's GeoParquet, for the distinct values to classify,
 * and the sprite sheets gen:sprites wrote, for icon renders. Run after build:json + gen:sprites.
 * A layer with no published GeoParquet (404) keeps its GL style and gets no renderer. Any other
 * read failure fails the build, so a CDN blip never publishes an index without a live renderer.
 *
 *   npm run build:esri
 *   GEOPARQUET_BASE=<url or dir> npm run build:esri
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { asyncBufferFromFile, asyncBufferFromUrl, parquetMetadataAsync, parquetReadObjects } from 'hyparquet';
import { compressors } from 'hyparquet-compressors';
import { loadImage, createCanvas } from '@napi-rs/canvas';
import { drawLayers, fieldsOf, toRenderer, type Geometry, type IconLookup, type Legend } from '../src/esri';
import type { GLLayer } from '../src/layers';
import { isMissing, withRetries } from './geoparquet';

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist-json');
const GEOPARQUET_BASE = (process.env.GEOPARQUET_BASE
    ?? 'https://maps-assets.geology.utah.gov/warehouse').replace(/\/+$/, '');

type Entry = { itemId: string; render: string; kind: string; path: string; layer: string;
    title?: string; sprite?: string; legend?: Legend; esri?: string; esriSource?: 'module' };
type Row = Record<string, string | number | boolean | null>;
type Sprite = Record<string, { x: number; y: number; width: number; height: number; pixelRatio?: number }>;

const GEOM = new Map<string, Geometry>([
    ['Point', 'point'], ['MultiPoint', 'point'], ['LineString', 'line'], ['MultiLineString', 'line'],
    ['Polygon', 'polygon'], ['MultiPolygon', 'polygon'],
]);

// GeoParquet `geo` metadata names the geometry type; fall back to what the style draws.
function geometryOf(kv: { key: string; value?: string }[] | undefined, layers: GLLayer[]): Geometry {
    const geo = kv?.find((m) => m.key === 'geo')?.value;
    if (geo) {
        const meta = JSON.parse(geo);
        const type = meta.columns?.[meta.primary_column]?.geometry_types?.[0];
        const found = typeof type === 'string' ? GEOM.get(type.replace(/ Z$/, '')) : undefined;
        if (found) return found;
    }
    const types = new Set(layers.map((l) => l.type));
    return types.has('fill') ? 'polygon' : types.has('circle') ? 'point' : 'line';
}

// Plain JSON values only: parquet hands back bigints and dates the evaluator can't compare.
const cell = (v: unknown): string | number | boolean | null =>
    typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' ? v
        : typeof v === 'bigint' ? Number(v) : v == null ? null : JSON.stringify(v);

async function readRows(itemId: string, fields: string[]) {
    const src = `${GEOPARQUET_BASE}/geoparquet/${itemId}/${itemId}.parquet`;
    try {
        return await withRetries(async () => {
            const file = src.startsWith('http') ? await asyncBufferFromUrl({ url: src }) : await asyncBufferFromFile(src);
            const meta = await parquetMetadataAsync(file);
            const cols = new Set(meta.schema.map((s) => s.name));
            const present = fields.filter((f) => cols.has(f));
            const raw = present.length ? await parquetReadObjects({ file, columns: present, compressors }) : [];
            const rows: Row[] = raw.map((r) => Object.fromEntries(present.map((f) => [f, cell(r[f])])));
            return { rows, kv: meta.key_value_metadata };
        });
    } catch (err) {
        if (!isMissing(err)) throw new Error(`${itemId}: GeoParquet unreadable at ${src}`, { cause: err });
        console.warn(`  ! ${itemId}: no published GeoParquet`);
        return null;
    }
}

// The icon's most common opaque color: what a legend swatch for it shows, so labels can match.
function dominant(data: Uint8ClampedArray): string | null {
    const counts = new Map<string, number>();
    for (let i = 0; i + 3 < data.length; i += 4) {
        if ((data[i + 3] ?? 0) < 250) continue;
        const key = [data[i], data[i + 1], data[i + 2]].map((v) => (v ?? 0).toString(16).padStart(2, '0')).join('');
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const [best] = [...counts].sort((a, b) => b[1] - a[1]);
    return best ? `#${best[0]}` : null;
}

// Crop each icon out of the sprite sheet gen:sprites wrote (dist-json/{sprite}.png + .json).
async function iconsFor(sprite: string | undefined): Promise<{ lookup?: IconLookup; px: number }> {
    if (!sprite) return { px: 0 };
    // No sprite = an icon render with no symbols at all, so fail rather than ship it.
    const index: Sprite = JSON.parse(await readFile(resolve(OUT_DIR, `${sprite}.json`), 'utf8')
        .catch(() => { throw new Error(`sprite ${sprite} missing: run gen:sprites after build:json`); }));
    const sheet = await loadImage(await readFile(resolve(OUT_DIR, `${sprite}.png`)));
    const lookup: IconLookup = (name) => {
        const i = index[name];
        if (!i) return null;
        const c = createCanvas(i.width, i.height);
        const ctx = c.getContext('2d');
        ctx.drawImage(sheet, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height);
        const ratio = i.pixelRatio ?? 1;
        return { imageData: c.toBuffer('image/png').toString('base64'), width: i.width / ratio, height: i.height / ratio,
            color: dominant(ctx.getImageData(0, 0, i.width, i.height).data) };
    };
    const first = Object.values(index)[0];
    return { lookup, px: first ? first.width / (first.pixelRatio ?? 1) : 0 };
}

const main = async () => {
    const indexPath = resolve(OUT_DIR, 'index.json');
    const manifest: Entry[] = JSON.parse(await readFile(indexPath, 'utf8'));
    let written = 0;
    for (const entry of manifest) {
        // Derived every run, so a rerun picks up style and data changes; a module's own is kept.
        if (entry.kind !== 'vector' || entry.esriSource === 'module') continue;
        const { layers }: { layers: GLLayer[] } = JSON.parse(await readFile(resolve(OUT_DIR, entry.path), 'utf8'));
        if (!drawLayers(layers).length) continue;
        const got = await readRows(entry.itemId, fieldsOf(layers));   // drawn + labelled fields
        if (!got) {
            delete entry.esri;
            continue;
        }
        const icons = await iconsFor(entry.sprite);
        const out = toRenderer(layers, geometryOf(got.kv, layers), got.rows, entry.legend, icons.lookup, icons.px);
        const rel = entry.path.replace(/^styles\//, 'esri/');
        await mkdir(dirname(resolve(OUT_DIR, rel)), { recursive: true });
        await writeFile(resolve(OUT_DIR, rel), JSON.stringify({
            renderer: out.renderer,
            ...(out.labelingInfo.length ? { labelingInfo: out.labelingInfo } : {}),
            ...(out.minScale ? { minScale: out.minScale } : {}),
        }));
        entry.esri = rel;
        written++;
        console.log(`+ ${rel}${out.warnings.map((w) => `\n  ! ${w}`).join('')}`);
    }
    await writeFile(indexPath, JSON.stringify(manifest, null, 2));
    console.log(`+ index.json (${written} derived Esri renderers)`);
};

try { await main(); } catch (err) { console.error(err); process.exit(1); }
