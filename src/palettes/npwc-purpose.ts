/**
 * Non-Petroleum Well Catalog (NPWC) purpose palette — for `enmin_non_petroleum_wells`.
 *
 * `purpose` is stored as short Esri coded-value-domain codes (C, SH, T, …). The domain's label
 * decode is dropped during ingest, so it arrives bare; codes + descriptions here come from the UGS
 * NPWC ArcGIS lookup table `UGS_Core_Center_Purpose`.
 *
 * Colors are REUSED from the UCRC wells purpose palette (ucrc-purpose.ts) by matching each NPWC
 * purpose to its UCRC-vocabulary equivalent, so a purpose is the SAME color on both wells layers
 * (only the marker shape differs — UCRC wells are circles, non-petroleum wells are triangles).
 * Purpose colors come from `ucrc-purpose` (the single source of color truth); only the neutral
 * `other` fallback is defined here, and it reuses that palette's `Other` tone.
 */
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE } from './ucrc-purpose';

/** Sprite-name prefix shared by the generator (scripts/gen-triangle-sprites.ts) and the render. */
export const NPWC_PURPOSE_NAMESPACE = 'npwc-purpose';

// The closed set of NPWC purpose codes (UGS_Core_Center_Purpose lookup, 12 rows).
export const NPWC_PURPOSE_CODES = ['C', 'SH', 'T', 'W', 'U', 'M', 'X', 'O', 'S', 'E', 'R', 'D'] as const;
export type NpwcCode = typeof NPWC_PURPOSE_CODES[number];

// code → official NPWC description (UGS_Core_Center_Purpose). The human label a legend shows.
export const NPWC_PURPOSE_DESC: Record<NpwcCode, string> = {
    C: 'Coal',
    SH: 'Oil Shale',
    T: 'Tar Sands',
    W: 'Water/Geothermal',
    U: 'Unknown',
    M: 'Mining',
    X: 'Potash/Uranium',
    O: 'Petroleum',
    S: 'Stratigraphic',
    E: 'Engineering',
    R: 'Research - Training',
    D: 'Documents',
};

// code → the ucrc-purpose label whose color it reuses, so both wells layers agree on color for the
// same purpose. `D` (Documents) has no drilling-purpose analog in the UCRC vocabulary → OTHER.
const CODE_TO_UCRC_LABEL: Record<string, string> = {
    C: 'Coal',
    SH: 'Oil Shale',
    T: 'Tar Sands',
    W: 'Water',           // NPWC combines Water/Geothermal; take the Water tone
    U: 'Unknown',
    M: 'Metals',
    X: 'Potash',          // NPWC combines Potash/Uranium
    O: 'Oil and Gas',
    S: 'Stratigraphy',
    E: 'Geotechnical',    // engineering ≈ geotechnical
    R: 'Teaching',        // research / training
};

// Neutral fallback fill/stroke for a code with no purpose mapping (D = Documents, or a code the
// ingest gains later): the generator bakes a grey triangle for such a code. Reused from the UCRC
// `Other` tone (not re-inlined) so it stays consistent with that palette's neutral bucket; the
// literal is only a last resort for the impossible case that `Other` is dropped upstream.
export const NPWC_PURPOSE_OTHER = UCRC_PURPOSE_FILL.Other ?? '#BDBDBD';
export const NPWC_PURPOSE_OTHER_STROKE = UCRC_PURPOSE_STROKE.Other ?? '#858585';

/** Fill color for a purpose code — reused UCRC tone, or the grey `other` fallback. */
export const npwcFill = (code: string): string =>
    UCRC_PURPOSE_FILL[CODE_TO_UCRC_LABEL[code] ?? ''] ?? NPWC_PURPOSE_OTHER;

/** Stroke color for a purpose code — reused UCRC tone, or the grey `other` fallback. */
export const npwcStroke = (code: string): string =>
    UCRC_PURPOSE_STROKE[CODE_TO_UCRC_LABEL[code] ?? ''] ?? NPWC_PURPOSE_OTHER_STROKE;

// A blank/missing `purpose` is a real class in the data, not an error, so it renders as Unknown
// rather than silently vanishing. The render coalesces '' → this code; the generator always bakes
// its frame so the stand-in exists even when the current extract has no blank/`U` wells.
export const NPWC_BLANK_CODE = 'U';

// The codes actually present in enmin_non_petroleum_wells.purpose, in legend order (meaningful
// classes by count, Unknown last). Verified against the live serving table 2026-08-13:
// C 2355, SH 99, T 17, W 1, U 1. The render legends THIS list. The generator re-reads the live data
// on every publish and bakes a frame per code it finds (+ the Unknown stand-in), so a code the
// ingest adds later is picked up and colored on the NEXT publish — until then it has no baked frame
// and its wells don't draw (static-CDN sprites don't self-heal between publishes).
export const NPWC_PRESENT_CODES: readonly NpwcCode[] = ['C', 'SH', 'T', 'W', 'U'];
