/**
 * Styling coverage — the ongoing worklist. Diffs the live STAC catalog (what's been piped into
 * the warehouse) against the bound styles in dist-json/index.json, and prints:
 *   - styled    : catalog items that have a bound style
 *   - UNSTYLED  : catalog items with no style  ← the to-do, grows as layers pipeline through
 *   - orphan    : bound styles with no catalog item (stale / not-yet-published → revisit)
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

  const manifest: { itemId: string }[] = JSON.parse(
    await readFile(resolve(__dirname, '..', 'dist-json', 'index.json'), 'utf8'),
  );
  const bound = new Set(manifest.map((e) => e.itemId));

  const styled = [...itemIds].filter((id) => bound.has(id)).sort();
  const unstyled = [...itemIds].filter((id) => !bound.has(id)).sort();
  const orphan = [...bound].filter((id) => !itemIds.has(id)).sort();

  const pct = itemIds.size ? Math.round((styled.length / itemIds.size) * 100) : 0;
  console.log(`\nSTAC catalog: ${itemIds.size} items · bound styles: ${bound.size}`);
  console.log(`Coverage: ${styled.length}/${itemIds.size} styled (${pct}%)\n`);
  console.log(`✓ styled (${styled.length}): ${styled.join(', ') || '—'}`);
  console.log(`\n☐ UNSTYLED (${unstyled.length}) — the worklist:`);
  for (const id of unstyled) console.log(`   - ${id}`);
  if (orphan.length) console.log(`\n! orphan styles (${orphan.length}, no catalog item): ${orphan.join(', ')}`);
  console.log();
};

try { await main(); } catch (err) { console.error(err); process.exit(1); }
