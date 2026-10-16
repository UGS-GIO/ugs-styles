/** Reading a layer's published GeoParquet in the build scripts (build:esri, validate). */

/** Whether a read failed because the layer has no published GeoParquet, a fair reason to skip it. */
export const isMissing = (err: unknown): boolean =>
    /\b404\b|ENOENT/.test(err instanceof Error ? err.message : String(err));

/** Runs `read`, retrying any failure but a missing file after 1, 2 and 4 seconds. */
export async function withRetries<T>(read: () => Promise<T>): Promise<T> {
    for (let wait = 1000; ; wait *= 2) {
        try {
            return await read();
        } catch (err) {
            if (isMissing(err) || wait > 4000) throw err;
            await new Promise((done) => setTimeout(done, wait));
        }
    }
}
