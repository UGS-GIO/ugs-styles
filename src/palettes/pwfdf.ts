/**
 * USGS post-fire debris-flow (PWFDF) cartography. The assessment ships its own colours in
 * `cartography.txt`, so these are transcribed, not designed — see hazards issue #20.
 *
 * Likelihood (`p_<i15>`) is stored 0-1, five bins. The published ramp errata: the `[0, 0.2)` class
 * lists RGB (256, 252, 195); 256 is out of range for an 8-bit channel, so the HEX wins.
 */

/** Likelihood bins, low -> high. `lo` is inclusive, `hi` exclusive (the top bin includes 1.0). */
export const PWFDF_LIKELIHOOD_BINS = [
    { lo: 0, hi: 0.2, color: '#fffbc2', label: '0-20%' },
    { lo: 0.2, hi: 0.4, color: '#fed572', label: '20-40%' },
    { lo: 0.4, hi: 0.6, color: '#fd8d3c', label: '40-60%' },
    { lo: 0.6, hi: 0.8, color: '#e51f1d', label: '60-80%' },
    { lo: 0.8, hi: 1.01, color: '#8d0026', label: '80-100%' },
] as const;

/** The 15-minute rainfall intensities (mm/h) the assessment models, one render each. */
export const PWFDF_INTENSITIES = [16, 20, 24, 28, 30, 32, 36, 40] as const;

/**
 * Runout areas (PWFDF-R), coloured by the debris-flow simulation index threshold each polygon was
 * built at. Lower threshold = larger area, so classes draw low -> high and the tightest extent ends
 * up on top. Errata in the published table: the 0.6 class lists RGB (158, 154, 20) against HEX
 * `#3f007d`; they aren't the same colour and the HEX completes the purple ramp, so the HEX wins.
 */
// `lo`/`hi` are the match window, written out rather than derived from `thr` — computing them
// yields 0.6 - 0.15 = 0.44999999999999996 in the published JSON. The top class is open-ended so a
// threshold above the current maximum still draws instead of silently vanishing.
export const PWFDF_RUNOUT_CLASSES = [
    { thr: 0, color: '#9e9ac8', label: 'DFSI threshold 0', lo: null, hi: 0.15 },
    { thr: 0.3, color: '#6f4da3', label: 'DFSI threshold 0.3', lo: 0.15, hi: 0.45 },
    { thr: 0.6, color: '#3f007d', label: 'DFSI threshold 0.6', lo: 0.45, hi: null },
] as const;

/** The design storms (15-min rainfall intensity, mm/h) the runout assessment models. */
export const PWFDF_RUNOUT_INTENSITIES = [20, 40, 60, 80] as const;

/** Legend for a likelihood render — the bins verbatim, so consumers never re-derive the ramp. */
export const likelihoodLegend = () =>
    PWFDF_LIKELIHOOD_BINS.map((b) => ({ label: b.label, color: b.color }));
