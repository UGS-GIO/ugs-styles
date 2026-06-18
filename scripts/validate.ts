/**
 * Validate styles against the LIVE data — catch field/value drift that renders nothing.
 *
 * For every bound style this checks, against the layer's GeoParquet on the CDN:
 *   - the styled attribute (spec.field, or fields referenced in bespoke filters) EXISTS  → hard error
 *   - the values it keys on (palette keys / filter literals) are PRESENT in the data     → warning
 *     (also reports data values not covered by a categorical palette → they fall to `other`)
 *
 * Why: a style can build + typecheck cleanly yet draw nothing if it keys on a column that was
 * renamed, or a value whose case/spelling drifted (e.g. SLD `well constrained` vs data
 * `Well Constrained`). Preview catches it by eye; this catches it in CI.
 *
 *   npm run validate              # warns on value drift, fails on missing fields
 *   npm run validate -- --strict  # value drift is also a failure
 *   GEOPARQUET_BASE=<url> npm run validate
 */
import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { asyncBufferFromUrl, parquetReadObjects, parquetMetadataAsync } from 'hyparquet';
import { compressors } from 'hyparquet-compressors';
import { PALETTES } from '../src/palettes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STYLES_DIR = resolve(__dirname, '..', 'src', 'styles');
const GEOPARQUET_BASE = (process.env.GEOPARQUET_BASE
  ?? 'https://maps-assets.geology.utah.gov/warehouse').replace(/\/+$/, '');
const strict = process.argv.includes('--strict');

type Ref = { field: string; value?: string; ci?: boolean };

// Pull (field, value) requirements out of a GL filter (expression or legacy), incl. the
// case-insensitive `["==", ["downcase",["to-string",["get",f]]], v]` shape the seeder emits.
function refsFromFilter(f: any, out: Ref[]): void {
  if (!Array.isArray(f)) return;
  const [op, ...rest] = f;
  if (op === 'all' || op === 'any' || op === 'none' || op === '!') {
    rest.forEach((r) => refsFromFilter(r, out));
    return;
  }
  if (op === '==' || op === '!=') {
    const [lhs, val] = rest;
    const g = getField(lhs);
    if (g && typeof val === 'string') out.push({ field: g.field, value: val, ci: g.ci });
    else if (g) out.push({ field: g.field });
    else if (typeof lhs === 'string' && !lhs.startsWith('$')) out.push({ field: lhs, value: String(val) });
  }
}
function getField(node: any): { field: string; ci: boolean } | null {
  if (Array.isArray(node) && node[0] === 'get' && typeof node[1] === 'string') return { field: node[1], ci: false };
  if (Array.isArray(node) && (node[0] === 'downcase' || node[0] === 'to-string')) {
    const inner = getField(node[1]);
    return inner ? { field: inner.field, ci: node[0] === 'downcase' || inner.ci } : null;
  }
  return null;
}

async function main() {
  // Load each style module's spec (+ bespoke layers), like build-json.
  type Style = { itemId: string; render: string; field?: string; paletteKeys?: string[];
    layers?: any[]; kind: string };
  const styles: Style[] = [];
  for (const layer of await readdir(STYLES_DIR, { withFileTypes: true })) {
    if (!layer.isDirectory()) continue;
    for (const f of (await readdir(resolve(STYLES_DIR, layer.name))).filter((x) => x.endsWith('.ts'))) {
      const mod = await import(pathToFileURL(resolve(STYLES_DIR, layer.name, f)).href);
      const spec = mod.spec;
      if (!spec?.itemId) continue;
      const pal = spec.palette ? PALETTES[spec.palette] : undefined;
      styles.push({
        itemId: spec.itemId, render: spec.render ?? f.replace(/\.ts$/, ''),
        kind: spec.kind ?? 'vector', field: spec.field,
        paletteKeys: pal ? Object.keys(pal.fill) : undefined,
        layers: mod.default ?? mod.layers,
      });
    }
  }

  let errors = 0, warnings = 0;
  // Group by itemId — one parquet read per layer, covering every field its styles reference.
  const byItem = new Map<string, Style[]>();
  for (const s of styles) (byItem.get(s.itemId) ?? byItem.set(s.itemId, []).get(s.itemId)!).push(s);

  for (const [itemId, group] of byItem) {
    if (group.every((s) => s.kind === 'raster')) { console.log(`· ${itemId}: raster — skipped`); continue; }

    // Collect every (field, value) the item's styles depend on.
    const refs: Ref[] = [];
    for (const s of group) {
      if (s.field && s.paletteKeys) for (const v of s.paletteKeys) refs.push({ field: s.field, value: v });
      else if (s.field) refs.push({ field: s.field });
      for (const l of s.layers ?? []) if (l?.filter) refsFromFilter(l.filter, refs);
    }
    const fields = [...new Set(refs.map((r) => r.field))];
    if (!fields.length) { console.log(`· ${itemId}: no field-keyed styling — ok`); continue; }

    const url = `${GEOPARQUET_BASE}/geoparquet/${itemId}/${itemId}.parquet`;
    let cols: string[]; let rows: Record<string, unknown>[];
    try {
      const file = await asyncBufferFromUrl({ url });
      const meta = await parquetMetadataAsync(file);
      cols = meta.schema.filter((s) => s.num_children == null).map((s) => s.name);
      const present = fields.filter((f) => cols.includes(f));
      rows = present.length ? await parquetReadObjects({ file, columns: present, compressors }) : [];
    } catch (e) {
      console.log(`✗ ${itemId}: cannot read ${url} — ${String((e as Error).message).slice(0, 80)}`);
      errors++; continue;
    }

    const distinct = new Map<string, Set<string>>();
    for (const f of fields) {
      if (!cols.includes(f)) { console.log(`✗ ${itemId}: field '${f}' not in data (cols: ${cols.length})`); errors++; continue; }
      distinct.set(f, new Set(rows.map((r) => String(r[f]))));
    }

    // Value coverage (warnings).
    const seenMiss = new Set<string>();
    for (const r of refs) {
      if (!r.value || !distinct.has(r.field)) continue;
      const vals = distinct.get(r.field)!;
      const hit = r.ci
        ? [...vals].some((v) => v.toLowerCase() === r.value!.toLowerCase())
        : vals.has(r.value);
      const key = `${r.field}=${r.value}`;
      if (!hit && !seenMiss.has(key)) { seenMiss.add(key); console.log(`  ! ${itemId}: '${r.field}' value ${JSON.stringify(r.value)} not in data`); warnings++; }
    }
    // Uncovered data values for categorical palettes (info).
    for (const s of group) {
      if (!s.field || !s.paletteKeys || !distinct.has(s.field)) continue;
      const keys = new Set(s.paletteKeys.map((k) => k.toLowerCase()));
      const uncovered = [...distinct.get(s.field)!].filter((v) => v && !keys.has(v.toLowerCase()) && v !== 'null');
      if (uncovered.length) console.log(`  · ${itemId}/${s.render}: ${uncovered.length} data value(s) fall to 'other': ${uncovered.slice(0, 6).join(', ')}${uncovered.length > 6 ? '…' : ''}`);
    }
    if (!seenMiss.size && fields.every((f) => cols.includes(f))) console.log(`✓ ${itemId}: fields + values OK`);
  }

  console.log(`\n${errors} error(s), ${warnings} value warning(s)`);
  if (errors || (strict && warnings)) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
