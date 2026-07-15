/**
 * Compile every TS style module under src/styles/ into CDN-shaped JSON.
 *
 * Output:
 *   dist-json/styles/{layer-name}/{render-id}.json   — layer fragments
 *   dist-json/index.json                             — manifest of all renders
 *
 * Consumed by STAC `renders` extension + bucket-listing-free clients.
 * Usage: npm run build:json
 */
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { generate } from '../src/archetypes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const STYLES_DIR = resolve(ROOT, 'src', 'styles');
const OUT_DIR = resolve(ROOT, 'dist-json');
const STYLES_OUT = resolve(OUT_DIR, 'styles');

// A `fill` layer with no fill-color / fill-pattern renders MapLibre's default OPAQUE BLACK — an
// artifact of SLD polygons that were stroke-only (no `<Fill>`). The SLD→GL seed emits an empty
// fill for those; drop it so the layer is outline-only as intended (we do NOT invent a fill
// color — see feedback-no-custom-styling). Stroke/label layers in the same style are kept.
type GLLayer = { type?: string; paint?: Record<string, unknown> };
const isPaintlessFill = (l: GLLayer): boolean =>
    l.type === 'fill' && !l.paint?.['fill-color'] && !l.paint?.['fill-pattern'];
const dropPaintlessFills = (layers: GLLayer[]): GLLayer[] =>
    Array.isArray(layers) ? layers.filter((l) => !isPaintlessFill(l)) : layers;

// Manifest entry keyed by STAC item id — what the warehouse joins on (docs/STYLING.md).
// `layer` (the dir name) is kept for human debugging only.
type ManifestEntry = {
    itemId: string; render: string; kind: 'vector' | 'raster';
    assets: string[]; path: string; layer: string; title?: string;
    colormap_name?: string; rescale?: [number, number];
    sprite?: string;   // CDN-relative sprite base (no extension) for icon renders (pie wedges)
    // Explicit legend: the render's symbology. `values` (grouped renders) = the specific field
    // values an entry rolls up, each with its own shade; `stroke` = optional swatch outline (flat
    // renders). Consumers derive colours from here verbatim.
    legend?: { label: string; color: string; values?: readonly { value: string; color: string }[]; stroke?: string }[];
    field?: string;    // the feature attribute this render symbolizes (lets consumers wire filters)
};

const main = async () => {
    await rm(OUT_DIR, { recursive: true, force: true });
    await mkdir(STYLES_OUT, { recursive: true });

    const manifest: ManifestEntry[] = [];
    const seen = new Set<string>();
    let errors = 0;
    const layers = await readdir(STYLES_DIR, { withFileTypes: true });

    for (const layer of layers) {
        if (!layer.isDirectory()) continue;
        const layerDir = resolve(STYLES_DIR, layer.name);
        const renders = (await readdir(layerDir)).filter(f => f.endsWith('.ts'));

        for (const render of renders) {
            const fileId = render.replace(/\.ts$/, '');
            const mod = await import(pathToFileURL(resolve(layerDir, render)).href);
            const spec = mod.spec;

            // Two authoring shapes: (1) a `spec` -> generate the GL fragment (standard); or
            // (2) a default/`layers` export of handwritten StyleLayer[] (bespoke escape hatch),
            // which still needs a `spec`/`binding` for the itemId join. No spec -> skip (not an
            // error): unbound styles just don't autodiscover until bound to a piped layer.
            if (!spec?.itemId) {
                console.warn(`· skip ${layer.name}/${fileId} — no 'spec' export yet (not in manifest)`);
                continue;
            }
            const layersOutput = dropPaintlessFills(mod.default ?? mod.layers ?? generate(spec));
            const renderId = spec.render ?? fileId;

            const dupKey = `${spec.itemId}/${renderId}`;
            if (seen.has(dupKey)) {
                console.error(`✗ duplicate render '${dupKey}' — itemId+render must be unique`);
                errors++;
                continue;
            }
            seen.add(dupKey);

            const relPath = `styles/${layer.name}/${renderId}.json`;
            const outFile = resolve(OUT_DIR, relPath);
            await mkdir(dirname(outFile), { recursive: true });
            await writeFile(outFile, JSON.stringify({ layers: layersOutput }, null, 2));
            manifest.push({
                itemId: spec.itemId,
                render: renderId,
                kind: spec.kind ?? 'vector',
                assets: spec.assets ?? ['pmtiles'],
                path: relPath,
                layer: layer.name,
                ...(spec.title ? { title: spec.title } : {}),
                ...(spec.colormap_name ? { colormap_name: spec.colormap_name } : {}),
                ...(spec.rescale ? { rescale: spec.rescale } : {}),
                ...(spec.sprite ? { sprite: spec.sprite } : {}),
                ...(spec.legend ? { legend: spec.legend } : {}),
                ...(spec.field ? { field: spec.field } : {}),
            });
            console.log(`+ ${relPath}  ->  ${spec.itemId}/${renderId} (${spec.archetype ?? spec.kind ?? 'vector'})`);
        }
    }

    manifest.sort((a, b) => a.path.localeCompare(b.path));
    await writeFile(resolve(OUT_DIR, 'index.json'), JSON.stringify(manifest, null, 2));
    console.log(`+ index.json (${manifest.length} bound renders)`);
    if (errors) {
        console.error(`\n${errors} duplicate render id(s) — itemId+render must be unique. Fix before release.`);
        process.exit(1);
    }
};

try { await main(); } catch (err) { console.error(err); process.exit(1); }
