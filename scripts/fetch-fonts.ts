/**
 * Stage the glyph set into dist-json/fonts/ (openmaptiles/fonts, pinned by digest) so publish.yml
 * syncs it to the CDN with the styles. Run AFTER build:json, which wipes dist-json.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, rmSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONTSTACKS } from '../src/fonts';

const ZIP_URL = process.env.GLYPHS_ZIP
    ?? 'https://github.com/openmaptiles/fonts/releases/download/v2.0/noto-sans.zip';
const ZIP_SHA256 = process.env.GLYPHS_SHA256
    ?? 'd117316544b43a5dde7ee761b36e17701e9f85574e181d76a74814240fdbaf34';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist-json', 'fonts');
const tmp = mkdtempSync(join(tmpdir(), 'ugs-fonts-'));

try {
    const zip = join(tmp, 'fonts.zip');
    const bytes = new Uint8Array(await (await fetch(ZIP_URL)).arrayBuffer());
    const digest = createHash('sha256').update(bytes).digest('hex');
    if (digest !== ZIP_SHA256) throw new Error(`glyph archive digest ${digest} != pinned ${ZIP_SHA256}`);
    writeFileSync(zip, bytes);
    execFileSync('unzip', ['-q', zip, '-d', OUT]);

    // A moved archive layout would otherwise publish a fontless CDN that looks fine.
    for (const stack of FONTSTACKS) {
        if (!statSync(join(OUT, stack, '0-255.pbf'), { throwIfNoEntry: false })?.size) {
            throw new Error(`glyph archive has no ${stack}`);
        }
    }
    const ranges = readdirSync(OUT).reduce((n, d) => n + readdirSync(join(OUT, d)).length, 0);
    console.log(`+ dist-json/fonts (${readdirSync(OUT).length} stacks, ${ranges} ranges)`);
} finally {
    rmSync(tmp, { recursive: true, force: true });
}
