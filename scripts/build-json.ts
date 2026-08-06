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
import { auditDraw, normalizeFills } from '../src/layers';

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
    sprite?: string;   // CDN-relative sprite base (no extension) for icon renders (pie wedges)
    // Explicit legend: the render's symbology. `values` (grouped renders) = the specific field
    // values an entry rolls up, each with its own shade; `stroke` = optional swatch outline (flat
    // renders). Consumers derive colors from here verbatim.
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
            const layersOutput = normalizeFills(mod.default ?? mod.layers ?? generate(spec));
            const renderId = spec.render ?? fileId;

            const dupKey = `${spec.itemId}/${renderId}`;
            if (seen.has(dupKey)) {
                console.error(`✗ duplicate render '${dupKey}' — itemId+render must be unique`);
                errors++;
                continue;
            }
            seen.add(dupKey);

            const relPath = `styles/${layer.name}/${renderId}.json`;

            // A vector style that draws no geometry is indistinguishable from a MISSING style on the
            // map — MapLibre activates nothing and never even requests a tile — yet it passes every
            // id-based check we have (#34). Labels alone are not a style; fail the build.
            const draw = auditDraw(layersOutput);
            if ((spec.kind ?? 'vector') !== 'raster' && !draw.draws) {
                console.error(`✗ ${relPath} — no layer draws geometry (labels/icons alone don't); the map would show nothing`);
                errors++;
                continue;
            }
            // Not an error: scale gating is real cartography (81k PLSS sections at z5 is mush) and
            // most of these gates are faithful to the source SLD's MaxScaleDenominator. But a layer
            // that only appears deep in the zoom range LOOKS unstyled to anyone opening the map at
            // z5, so say so out loud rather than let it read as a silent no-op.
            if (draw.minzoom > 0) {
                console.warn(`  ! ${relPath} — draws only at z≥${draw.minzoom.toFixed(2)}; below that the layer looks unstyled`);
            }
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
        console.error(`\n${errors} build error(s) — see the ✗ lines above. Fix before release.`);
        process.exit(1);
    }
};

try { await main(); } catch (err) { console.error(err); process.exit(1); }
