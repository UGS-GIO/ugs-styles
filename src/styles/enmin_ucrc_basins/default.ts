/**
 * UCRC basins — two MultiPolygon features, `label` "Paradox Basin" and "Uinta Basin".
 * Outline and name only; the interiors stay transparent so the wells and boxes inside stay visible.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { matchByValue } from '../../expressions/categorical';

// Stored `label`, lowercased -> the name to draw. Keyed lowercase so a case change in the
// warehouse can't drop a basin to the grey fallback.
const BASIN_LABELS: Record<string, string> = {
    'paradox basin': 'Paradox Basin',
    'uinta basin': 'Uinta Basin',
};
const BASIN_COLORS: Record<string, string> = {
    'Paradox Basin': '#8400A8',
    'Uinta Basin': '#005CE6',
};
// Paint fallback for an unmapped value. A safety net, not a category — deliberately not legended.
const OTHER_COLOR = '#808080';

const storedLabel: ExpressionSpecification = ['downcase', ['to-string', ['coalesce', ['get', 'label'], '']]];
// Display name: the mapped one when known, else the stored label verbatim (a new basin still labels).
const displayLabel: ExpressionSpecification = [
    'coalesce', ['get', storedLabel, ['literal', BASIN_LABELS]], ['to-string', ['coalesce', ['get', 'label'], '']],
];
const color = matchByValue(displayLabel, BASIN_COLORS, OTHER_COLOR);

export const spec = {
    itemId: 'enmin_ucrc_basins',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'UCRC basins',
    field: 'label',   // the attribute this render symbolizes (consumers wire filters to it)
    legend: Object.entries(BASIN_COLORS).map(([label, c]) => ({ label, color: c })),
} satisfies Binding & { render: string; field: string };

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
            'text-font': ['Noto Sans Regular'],
            'text-size': 12,
            // The features are polygons, so 'point' gets an interior anchor per basin. 'line'
            // strings the name along the ring and drops it where the ring is dense.
            'symbol-placement': 'point',
            // Two anchors, far apart — nothing to declutter, and the basemap can't evict a name.
            'text-allow-overlap': true,
            'text-ignore-placement': true,
        },
        paint: {
            'text-color': color,
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 1.2,
        },
    },
];
export default layers;
