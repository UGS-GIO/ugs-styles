/**
 * Compile every TS style module under src/styles/ into CDN-shaped JSON.
 * Output goes to dist-json/{layer-name}/{render-id}.json — same path shape
 * the CDN will serve, so STAC items can reference predictable URLs.
 *
 * Usage: npm run build:json
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STYLES_DIR = resolve(__dirname, '..', 'src', 'styles');
const OUT_DIR = resolve(__dirname, '..', 'dist-json');

const main = async () => {
    const layers = await readdir(STYLES_DIR, { withFileTypes: true });
    let written = 0;
    for (const layer of layers) {
        if (!layer.isDirectory()) continue;
        const layerDir = resolve(STYLES_DIR, layer.name);
        const renders = (await readdir(layerDir)).filter(f => f.endsWith('.ts'));
        for (const render of renders) {
            const renderId = render.replace(/\.ts$/, '');
            const mod = await import(pathToFileURL(resolve(layerDir, render)).href);
            const layersOutput = (mod.default ?? mod.layers) as unknown;
            if (!layersOutput) {
                console.warn(`skip ${layer.name}/${renderId} — no default export or layers export`);
                continue;
            }
            const outFile = resolve(OUT_DIR, layer.name, `${renderId}.json`);
            await mkdir(dirname(outFile), { recursive: true });
            await writeFile(outFile, JSON.stringify({ layers: layersOutput }, null, 2));
            console.log(`✓ ${layer.name}/${renderId}.json`);
            written++;
        }
    }
    console.log(`\nDone. ${written} files written → dist-json/`);
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});
