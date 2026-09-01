/**
 * UCRC basins — colored boundary + name per basin. Seeded from GeoServer
 * (energy_mineral:enmin_ucrc_basins_current); GeoServer is retiring, so this module is now the
 * source of truth.
 *
 * Verified against live WFS/GetStyles: the layer holds exactly two MultiPolygon features, spelled
 * "Paradox Basin" and "Uinta Basin", and the SLD draws them with a 2px LineSymbolizer plus a
 * PointPlacement TextSymbolizer. We add a translucent fill on top of that: the SLD's outline-only
 * treatment left the basins un-hittable and hard to read as areas on a busy basemap.
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { matchByValue } from '../../expressions/categorical';

// Stored `label` (lowercased) -> the name the map should draw. Keyed lowercase so a case change in
// the warehouse can't silently drop a basin to the grey fallback. "complete paradox basin" is a
// spelling the layer used to carry; kept so a rollback of that rename still colors and labels.
const BASIN_LABELS: Record<string, string> = {
    'complete paradox basin': 'Paradox Basin',
    'paradox basin': 'Paradox Basin',
    'uinta basin': 'Uinta Basin',
};
const BASIN_COLORS: Record<string, string> = {
    'Paradox Basin': '#8400A8',
    'Uinta Basin': '#005CE6',
};
// Paint-time fallback for an unmapped value — the SLD's <ElseFilter/> rule. It is a safety net, not
// a category: no feature in the layer takes it, so it is deliberately NOT a legend entry.
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
    // Legend = the source of truth for this render's symbology. Labels are the DISPLAY names —
    // what the map actually draws. Two basins, two entries; the grey else-branch is not one.
    legend: Object.entries(BASIN_COLORS).map(([label, c]) => ({ label, color: c })),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        // Kept light: these are regional extents drawn over the wells/boxes they contain, so the
        // fill has to read as a wash, not as a layer that hides what sits inside it.
        id: 'enmin_ucrc_basins-fill',
        type: 'fill',
        paint: {
            'fill-color': color,
            'fill-opacity': 0.12,
        },
    },
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
            // 'point', NOT 'line'. The features are MultiPolygons, so GL computes an interior
            // anchor (pole of inaccessibility) per basin and the name sits inside its own outline.
            // The previous 'line' placement — and the symbol-spacing / text-max-angle / text-offset
            // scaffolding that propped it up — assumed MultiLineString geometry this layer does not
            // have; it strung repeated names along the boundary and dropped them on dense stretches.
            'symbol-placement': 'point',
            // Both basins MUST stay named. Their anchors are far apart so there is nothing to
            // declutter between them, but opting out of collision keeps a busy basemap from
            // evicting one name and not the other.
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
