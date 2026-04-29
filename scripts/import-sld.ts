/**
 * Bulk-fetch SLD via GeoServer WMS GetStyles for each configured layer.
 * Saves to legacy-sld/ as XML files. Reference only — not authoritative.
 *
 * Usage: npm run import:sld
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './layers.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'legacy-sld');

const sanitize = (qualifiedName: string) => qualifiedName.replace(/[:/]/g, '__');

const fetchSld = async (qualifiedName: string): Promise<string> => {
    const params = new URLSearchParams({
        service: 'WMS',
        version: '1.1.1',
        request: 'GetStyles',
        layers: qualifiedName,
    });
    const url = `${config.geoserverUrl}/wms?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${qualifiedName}`);
    return res.text();
};

const main = async () => {
    await mkdir(OUT_DIR, { recursive: true });
    let ok = 0;
    let fail = 0;
    for (const layer of config.layers) {
        try {
            const sld = await fetchSld(layer);
            const file = resolve(OUT_DIR, `${sanitize(layer)}.sld`);
            await writeFile(file, sld);
            console.log(`✓ ${layer}`);
            ok++;
        } catch (err) {
            console.error(`✗ ${layer}: ${err instanceof Error ? err.message : err}`);
            fail++;
        }
    }
    console.log(`\nDone. ${ok} ok, ${fail} failed → legacy-sld/`);
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});
