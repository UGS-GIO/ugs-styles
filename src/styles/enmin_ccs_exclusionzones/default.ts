import type { FilterSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { interpolateByZoom } from '../../expressions/categorical';
import type { SpriteRecipe } from '../../sprites';

const HATCH_COLORS: Record<string, string> = {
    'no-ccus-zone': '#ff0000',
    'no-ccus-zone-geo': '#000000',
};

export const spec = {
    itemId: 'enmin_ccs_exclusionzones',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'CCS Exclusion Areas',
    field: 'grade',
    sprite: 'styles/enmin_ccs_exclusionzones/sprite',
    legend: [
        { label: 'Exclusion Zones - Land Management', value: 'No-CCUS-Zone', values: [{ value: 'No-CCUS-Zone', color: '#ff0000' }], color: '#ff0000', stroke: '#000000', shape: 'hatch' as const },
        { label: 'Exclusion Zones - Geology', value: 'No-CCUS-Zone-Geo', values: [{ value: 'No-CCUS-Zone-Geo', color: '#000000' }], color: '#000000', stroke: '#000000', shape: 'hatch' as const },
    ],
} satisfies Binding & { render: string; field: string; sprite: string };

export const sprite: SpriteRecipe = {
    shape: 'slash',
    values: { constant: Object.keys(HATCH_COLORS) },
    cells: (grades) => grades.map((g) => ({
        names: [`slash-${g}`],
        stroke: HATCH_COLORS[g],
    })),
};

const gradeFilter = (value: string): FilterSpecification => ['==', ['downcase', ['to-string', ['get', 'grade']]], value];
const hatchOpacity = interpolateByZoom([[6, 0.55], [10, 0.85], [14, 1]]);

// Handwritten layers for diagonal slash fill-pattern sprites + dark polygon outline.
const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_exclusionzones-land-fill',
        type: 'fill',
        filter: gradeFilter('no-ccus-zone'),
        paint: {
            'fill-pattern': 'slash-no-ccus-zone',
            'fill-opacity': hatchOpacity,
        },
    },
    {
        id: 'enmin_ccs_exclusionzones-geo-fill',
        type: 'fill',
        filter: gradeFilter('no-ccus-zone-geo'),
        paint: {
            'fill-pattern': 'slash-no-ccus-zone-geo',
            'fill-opacity': hatchOpacity,
        },
    },
    {
        id: 'enmin_ccs_exclusionzones-outline',
        type: 'line',
        paint: {
            'line-color': '#000000',
            'line-width': 1.2,
        },
        layout: {
            'line-cap': 'square',
            'line-join': 'bevel',
        },
    },
];

export default layers;
