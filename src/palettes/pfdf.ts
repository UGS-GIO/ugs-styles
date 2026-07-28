/**
 * USGS post-wildfire debris-flow (PWFDF-R) ramps — sequential, ordered low → high hazard.
 *
 * NOT authored here. These are the publisher's own recommended colors, lifted verbatim from
 * `cartography.txt` shipped inside the data release (GeoJSON.zip / Shapefile.zip), e.g.
 * ScienceBase 6a5e3d6b1ba49b09079379c4 (Cottonwood 2026-06-22 v1.0.0), collection DOI
 * 10.5066/P18RMZBB. Spec: https://ghsc.code-pages.usgs.gov/lhp/ursa/src/data-spec/archive/1.0.0/
 *
 * Every PWFDF-R assessment ships the same cartography, so these ramps are shared across fires —
 * a new fire reuses them by name and inherits any correction made here.
 *
 * NOTE: cartography.txt's RGB column for DSI 0.6 reads (158, 154, 20), which is a copy-paste of
 * the 0.0 row and disagrees with its own hex. The hex (#3f007d = 63, 0, 125) is authoritative.
 */

/** Runout `dfsi_thr` — debris-flow simulation index threshold (0.0 / 0.3 / 0.6). */
export const PFDF_DSI: readonly string[] = ['#9e9ac8', '#6f4da3', '#3f007d'];

/** Source-basin `P_<I15>` — likelihood a debris flow leaves the basin, 5 bins over [0, 1]. */
export const PFDF_LIKELIHOOD: readonly string[] = [
    '#fffbc2', '#fed572', '#fd8d3c', '#e51f1d', '#8d0026',
];
