/**
 * Styling coverage — the ongoing worklist. Diffs the live STAC catalog (what's been piped into
 * the warehouse) against the bound styles in dist-json/index.json, and prints:
 *   - styled    : catalog items that have a bound style (annotated `z≥N` when every render of the
 *                 item is scale-gated — bound, but blank on a map opened above that zoom)
 *   - UNSTYLED  : catalog items with no style  ← the to-do, grows as layers pipeline through
 *   - orphan    : bound styles with no catalog item (stale / not-yet-published → revisit)
 *   - CANNOT DRAW : bound styles whose fragment draws no geometry. build-json fails on these, so
 *                 this only fires against a stale or hand-edited dist-json — but "bound" meaning
 *                 "styled" with no look at the layers is what let #34 hide in this report.
 *
 * Catalog item ids are read from each collection.json's item links (no per-item fetch).
 * Run `npm run build:json` first so dist-json/index.json is current.
 *
 *   npm run coverage                 # against prod STAC
 *   STAC_CATALOG=<url> npm run coverage
 */
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditDraw, type GLLayer } from '../src/layers';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG = process.env.STAC_CATALOG
  ?? 'https://maps-assets.geology.utah.gov/warehouse/stac/catalog.json';

const getJson = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${url}`);
  return r.json();
};
const abs = (href: string, base: string) => new URL(href, base).href;
// item link href is `./<id>/<id>.json` (or absolute) -> the id is the folder name
const idOf = (href: string) => href.replace(/\/[^/]+\.json$/, '').split('/').pop() ?? href;

const main = async () => {
  const catalog = await getJson(CATALOG);
  const collLinks = (catalog.links ?? []).filter((l: { rel: string }) => l.rel === 'child');

  // Collections whose items are vector layers needing a GL style. Pubs (ugs-publications) are
  // COG map-plates — pre-styled in the pixels — so they're not part of the vector worklist.
  const SKIP = new Set((process.env.STAC_SKIP ?? 'ugs-publications').split(',').filter(Boolean));

  const itemIds = new Set<string>();
  for (const cl of collLinks) {
    const collId = cl.href.replace(/\/collection\.json$/, '').split('/').pop() ?? '';
    if (SKIP.has(collId)) continue;
    const coll = await getJson(abs(cl.href, CATALOG));
    for (const l of coll.links ?? []) {
      if (l.rel === 'item') itemIds.add(idOf(l.href));
    }
  }

  const DIST = resolve(__dirname, '..', 'dist-json');
  const manifest: { itemId: string; render: string; path: string; kind?: string }[] = JSON.parse(
    await readFile(resolve(DIST, 'index.json'), 'utf8'),
  );
  const bound = new Set(manifest.map((e) => e.itemId));

  // What each bound render actually draws. An item id in the manifest says a style is BOUND; only
  // the fragment says whether it can put anything on the map.
  const blank: string[] = [];                 // `${itemId}/${render}` — draws no geometry
  const gate = new Map<string, number>();     // itemId -> lowest zoom any of its renders draws at
  for (const e of manifest) {
    if ((e.kind ?? 'vector') === 'raster') { gate.set(e.itemId, 0); continue; }
    let layers: GLLayer[];
    try {
      layers = JSON.parse(await readFile(resolve(DIST, e.path), 'utf8')).layers ?? [];
    } catch (err) {
      // index.json promising a file the build didn't emit would be invisible everywhere else.
      console.error(`! ${e.itemId}/${e.render}: index path unreadable — ${e.path} (${err instanceof Error ? err.message : String(err)})`);
      blank.push(`${e.itemId}/${e.render}`);
      continue;
    }
    const draw = auditDraw(layers);
    if (!draw.draws) { blank.push(`${e.itemId}/${e.render}`); continue; }
    gate.set(e.itemId, Math.min(gate.get(e.itemId) ?? Infinity, draw.minzoom));
  }

  // Bound is not styled: an item whose every render draws nothing reads as "✓ styled" here while
  // the map shows blank space, which is the whole of #34. Say it on the item, not just in a footer.
  const label = (id: string) => {
    const z = gate.get(id);
    if (z == null) return `${id} ✗ CANNOT DRAW`;
    return z ? `${id} (z≥${z.toFixed(2)})` : id;
  };

  const styled = [...itemIds].filter((id) => bound.has(id)).sort();
  const unstyled = [...itemIds].filter((id) => !bound.has(id)).sort();
  const orphan = [...bound].filter((id) => !itemIds.has(id)).sort();
  const gated = styled.filter((id) => gate.get(id));

  const pct = itemIds.size ? Math.round((styled.length / itemIds.size) * 100) : 0;
  console.log(`\nSTAC catalog: ${itemIds.size} items · bound styles: ${bound.size}`);
  console.log(`Coverage: ${styled.length}/${itemIds.size} styled (${pct}%)\n`);
  console.log(`✓ styled (${styled.length}): ${styled.map(label).join(', ') || '—'}`);
  console.log(`\n☐ UNSTYLED (${unstyled.length}) — the worklist:`);
  for (const id of unstyled) console.log(`   - ${id}`);
  if (gated.length) {
    console.log(`\n· scale-gated (${gated.length}) — styled, but blank on a map opened above the zoom shown: ${gated.map(label).join(', ')}`);
  }
  if (orphan.length) console.log(`\n! orphan styles (${orphan.length}, no catalog item): ${orphan.join(', ')}`);
  if (blank.length) {
    console.log(`\n✗ CANNOT DRAW (${blank.length}) — bound but no geometry layer, so the map shows nothing: ${blank.join(', ')}`);
  }
  console.log();
  if (blank.length) process.exit(1);
};

try { await main(); } catch (err) { console.error(err); process.exit(1); }
