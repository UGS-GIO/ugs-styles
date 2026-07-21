/**
 * UCRC basins — outline + label per basin. Seeded from GeoServer
 * (energy_mineral:enmin_ucrc_basins_current); GeoServer is retiring, so this module is now the
 * source of truth.
 *
 * The seeded SLD filtered on `label == 'paradox basin'`, but the live data spells it
 * "Complete Paradox Basin" — so Paradox matched nothing, drew the grey fallback, and labelled
 * itself "Complete Paradox Basin". Colour + text now come from BASIN_LABELS, keyed on the real
 * stored values, so the map reads "Paradox Basin" in the right purple.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { matchByValue } from '../../expressions/categorical';

// Stored `label` (lowercased) -> the name the map should draw. Keyed lowercase so a case change
// in the warehouse can't silently drop a basin back to the grey fallback.
const BASIN_LABELS: Record<string, string> = {
    'complete paradox basin': 'Paradox Basin',
    'paradox basin': 'Paradox Basin',
    'uinta basin': 'Uinta Basin',
};
const BASIN_COLORS: Record<string, string> = {
    'Paradox Basin': '#8400A8',
    'Uinta Basin': '#005CE6',
};
const OTHER_COLOR = '#808080';

const storedLabel: ExpressionSpecification = ['downcase', ['to-string', ['coalesce', ['get', 'label'], '']]];
// Display name: the mapped one when known, else the stored label verbatim (a new basin still labels).
const displayLabel: ExpressionSpecification = [
    'coalesce', ['get', storedLabel, ['literal', BASIN_LABELS]], ['to-string', ['coalesce', ['get', 'label'], '']],
];
const color = matchByValue(displayLabel, BASIN_COLORS, OTHER_COLOR);

// Which way each name is nudged off its own boundary. Now that the glyphs are viewport-aligned
// this is plain screen space — negative y is up, positive is down. Opposite signs because the two
// basins meet near Price/Grand Junction, where their midpoint labels would otherwise stack.
const textOffset: ExpressionSpecification = [
    'match', displayLabel,
    'Paradox Basin', ['literal', [0, 1.4]],   // nudged down
    'Uinta Basin', ['literal', [0, -1.4]],    // nudged up
    ['literal', [0, -1.2]],
];

export const spec = {
    itemId: 'enmin_ucrc_basins',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC basins',
    field: 'label',   // the attribute this render symbolizes (consumers wire filters to it)
    // Legend = the source of truth for this render's symbology. Labels are the DISPLAY names —
    // what the map actually draws — not the raw warehouse spelling ("Complete Paradox Basin").
    legend: [
        ...Object.entries(BASIN_COLORS).map(([label, c]) => ({ label, color: c })),
        { label: 'Other', color: OTHER_COLOR },
    ],
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'enmin_ucrc_basins-line',
        type: 'line',
        paint: {
            'line-color': color,
            'line-width': 2,
        },
    },
    {
        id: 'enmin_ucrc_basins-label',
        type: 'symbol',
        layout: {
            'text-field': displayLabel,
            'text-font': ['Arial'],
            'text-size': 12,
            // The layer is outlines (MultiLineString), not polygons — there's no interior for a
            // centred label and GL can't compute a centroid, so the name rides the boundary. A
            // truly interior label needs centroid points from the warehouse.
            // 'line', NOT 'line-center'. line-center anchors at the midpoint of the geometry as it
            // exists in each tile, and Paradox — dense and spanning several tiles — produced no
            // anchor at all and went unlabelled. 'line' offers anchors all along the boundary, so
            // no basin can silently lose its name; symbol-spacing below controls the repeats.
            'symbol-placement': 'line',
            // Candidate-anchor interval. Kept tight because text-max-angle below rejects anchors
            // on the kinked stretches — too wide and a whole basin ends up with no usable anchor.
            'symbol-spacing': 600,
            // NON-NEGOTIABLE for Paradox. It is digitized ~10x denser than Uinta (1810 vs 180
            // verts, 0.18 vs 3.1 km segments) and its vertex-to-vertex turn is 52° at p90, so the
            // DEFAULT 45° ceiling silently drops its label everywhere — the map draws a purple
            // outline with no name. Deleting this line is how that regression comes back.
            'text-max-angle': 90,
            // Both basins MUST stay named. They share a boundary near Price/Grand Junction, and
            // with default collision culling whichever basin got more valid placements evicted
            // the other's label outright — Uinta labelled and Paradox didn't, then exactly the
            // reverse once the angle ceiling changed. Opting out of collision makes labelling
            // deterministic; the per-basin offsets below keep the two names from stacking.
            'text-allow-overlap': true,
            'text-ignore-placement': true,
            // Lift the text clear of the stroke it sits on, per basin — see the match above.
            'text-offset': textOffset,
            // 'viewport', not 'map'. Map-aligned text follows the boundary's heading, so a label
            // that lands on a north-south stretch reads sideways, and one whose line is digitized
            // south-to-north reads upside down — both basins did exactly this. Viewport-aligned
            // glyphs stay horizontal no matter which way the boundary runs.
            'text-rotation-alignment': 'viewport',
            'text-pitch-alignment': 'viewport',
        },
        paint: {
            'text-color': color,
            'text-opacity': 1,
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 1.2,
        },
    },
];
export default layers;
