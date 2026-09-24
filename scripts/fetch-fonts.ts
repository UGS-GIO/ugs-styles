/**
 * Stage the glyph set into dist-json/fonts/ so publish.yml syncs it to the CDN with the styles.
 * Regular/Bold/Italic from openmaptiles/fonts, Medium (for the Protomaps basemap styles) from
 * protomaps/basemaps-assets; both pinned by digest. Run AFTER build:json, which wipes dist-json.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONTSTACKS } from '../src/fonts';

const ZIP_URL = process.env.GLYPHS_ZIP
    ?? 'https://github.com/openmaptiles/fonts/releases/download/v2.0/noto-sans.zip';
const ZIP_SHA256 = process.env.GLYPHS_SHA256
    ?? 'd117316544b43a5dde7ee761b36e17701e9f85574e181d76a74814240fdbaf34';

const ASSETS = 'https://raw.githubusercontent.com/protomaps/basemaps-assets/028c18f713baecad011301ff7a69acc39bcc2ae7/fonts';
// sha256 over Medium's 256 ranges in order, then OFL.txt.
const ASSETS_SHA256 = '5a5f85d7c4fa6e94b942ac45fd46330fa5ec8b8b5cf235a763132fa99fb8396c';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist-json', 'fonts');
const tmp = mkdtempSync(join(tmpdir(), 'ugs-fonts-'));

try {
    const zip = join(tmp, 'fonts.zip');
    const bytes = new Uint8Array(await (await fetch(ZIP_URL)).arrayBuffer());
    const digest = createHash('sha256').update(bytes).digest('hex');
    if (digest !== ZIP_SHA256) throw new Error(`glyph archive digest ${digest} != pinned ${ZIP_SHA256}`);
    writeFileSync(zip, bytes);
    execFileSync('unzip', ['-q', zip, '-d', OUT]);

    const get = async (path: string) => {
        const r = await fetch(`${ASSETS}/${encodeURI(path)}`);
        if (!r.ok) throw new Error(`${path}: ${r.status}`);
        return new Uint8Array(await r.arrayBuffer());
    };
    const ranges = Array.from({ length: 256 }, (_, i) => `${i * 256}-${i * 256 + 255}.pbf`);
    const medium = await Promise.all(ranges.map(async (r) => [r, await get(`Noto Sans Medium/${r}`)] as const));
    const ofl = await get('OFL.txt');
    const hash = createHash('sha256');
    for (const [, b] of medium) hash.update(b);
    hash.update(ofl);
    const assetsDigest = hash.digest('hex');
    if (assetsDigest !== ASSETS_SHA256) throw new Error(`Medium glyphs digest ${assetsDigest} != pinned ${ASSETS_SHA256}`);
    mkdirSync(join(OUT, 'Noto Sans Medium'));
    for (const [r, b] of medium) writeFileSync(join(OUT, 'Noto Sans Medium', r), b);
    writeFileSync(join(OUT, 'OFL.txt'), ofl);   // every stack here is Noto Sans, SIL OFL 1.1

    // A moved archive layout would otherwise publish a fontless CDN that looks fine.
    for (const stack of FONTSTACKS) {
        if (!statSync(join(OUT, stack, '0-255.pbf'), { throwIfNoEntry: false })?.size) {
            throw new Error(`glyph archive has no ${stack}`);
        }
    }
    const stacks = readdirSync(OUT, { withFileTypes: true }).filter((d) => d.isDirectory());
    const count = stacks.reduce((n, d) => n + readdirSync(join(OUT, d.name)).length, 0);
    console.log(`+ dist-json/fonts (${stacks.length} stacks, ${count} ranges)`);
} finally {
    rmSync(tmp, { recursive: true, force: true });
}
