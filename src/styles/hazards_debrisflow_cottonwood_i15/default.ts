/**
 * Post-wildfire debris-flow runout — Cottonwood fire (Fishlake NF, started 2026-06-22).
 *
 * Upstream: USGS PWFDF-R data release, ScienceBase 6a5e3d6b1ba49b09079379c4, collection DOI
 * 10.5066/P18RMZBB, assessment v1.0.0 (ursa 1.0.0). Colors and the pairing rule below are the
 * publisher's own, from `cartography.txt` in the release — nothing here is invented.
 *
 * `dfsi_thr` is the debris-flow simulation index threshold each polygon was cut at, so the three
 * polygons are *cumulative and nested*: DSI > 0 contains DSI > 0.3 contains DSI > 0.6. That's an
 * enumerated field (exactly these three values), hence `values`, not `breaks` — and it's why the
 * `graduated` archetype's one-layer-per-class draw order matters here.
 *
 * The item also carries all four I15 rainfall scenarios (20/40/60/80 mm/h) in one layer, 12
 * features total. `field: 'i15'` tells consumers which attribute to wire a scenario selector to;
 * without filtering, all four scenarios draw stacked. Upstream's cartography pairs each scenario
 * with source basins colored by the matching `P_<I15>` — that half needs `basins.shp` ingested.
 */
import type { StyleSpec } from '../../types';

export const spec = {
    itemId: 'hazards_debrisflow_cottonwood_i15',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],

    archetype: 'graduated',
    field: 'dfsi_thr',
    palette: 'pfdf-dsi',
    values: [0.0, 0.3, 0.6],

    title: 'Debris-flow runout extent (simulation index)',
    // Explicit legend: the derived labels would read "0", "0.3", "0.6", which loses the meaning —
    // each polygon is the area *at or above* that index, not a bin equal to it.
    legend: [
        { label: 'DSI > 0.0 — any simulated debris flow', color: '#9e9ac8' },
        { label: 'DSI > 0.3', color: '#6f4da3' },
        { label: 'DSI > 0.6 — hazardous under most conditions', color: '#3f007d' },
    ],
} satisfies StyleSpec & { field: string; legend: { label: string; color: string }[] };
