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

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const STYLES_DIR = resolve(ROOT, 'src', 'styles');
const OUT_DIR = resolve(ROOT, 'dist-json');
const STYLES_OUT = resolve(OUT_DIR, 'styles');

// Manifest entry keyed by STAC item id — what the warehouse joins on (docs/STYLING.md).
// `layer` (the dir name) is kept for human debugging only.
type ManifestEntry = {
    itemId: string; render: string; kind: 'vector' | 'raster';
    assets: string[]; path: string; layer: string; title?: string;
    colormap_name?: string; rescale?: [number, number];
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
            const renderId = render.replace(/\.ts$/, '');
            const mod = await import(pathToFileURL(resolve(layerDir, render)).href);
            const layersOutput = mod.default ?? mod.layers;
            if (!layersOutput) {
                console.warn(`skip ${layer.name}/${renderId} — no default export or named 'layers' export`);
                continue;
            }

            // Binding ties the style to a warehouse STAC item id. Without it the warehouse
            // can't join (the dir name is NOT the item id, e.g. *_current), so the style is
            // skipped — not an error: most legacy styles get bound (or deleted) only as their
            // layer lands in the warehouse. Skipped styles just don't autodiscover yet.
            const binding = mod.binding;
            if (!binding?.itemId) {
                console.warn(`· skip ${layer.name}/${renderId} — no 'binding' export yet (not in manifest)`);
                continue;
            }
            const dupKey = `${binding.itemId}/${renderId}`;
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
                itemId: binding.itemId,
                render: renderId,
                kind: binding.kind ?? 'vector',
                assets: binding.assets ?? ['pmtiles'],
                path: relPath,
                layer: layer.name,
                ...(binding.title ? { title: binding.title } : {}),
                ...(binding.colormap_name ? { colormap_name: binding.colormap_name } : {}),
                ...(binding.rescale ? { rescale: binding.rescale } : {}),
            });
            console.log(`+ ${relPath}  ->  ${binding.itemId}/${renderId} (${binding.kind ?? 'vector'})`);
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

main().catch(err => {
    console.error(err);
    process.exit(1);
});
