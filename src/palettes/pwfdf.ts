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

/** Legend for a likelihood render — the bins verbatim, so consumers never re-derive the ramp. */
export const likelihoodLegend = () =>
    PWFDF_LIKELIHOOD_BINS.map((b) => ({ label: b.label, color: b.color }));
