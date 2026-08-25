/**
 * Wetland survey sites — color by `privacystatus`. Matches the legacy app's symbology
 * (ALL-3726): yellow for exact locations, red for confidential/approximate ones.
 *
 * Bespoke (not the `point` archetype): the archetype shares one `other` fallback color
 * between fill AND stroke, which would give the common (non-confidential) case a
 * yellow-on-yellow circle with no visible outline. This needs an independent dark
 * stroke for both categories, so it's hand-authored — still declares `spec` for the
 * itemId join per the escape hatch (DESIGN.md §7).
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';

const EXACT_FILL = '#FFD700';
const EXACT_STROKE = '#8A6D00';
const CONFIDENTIAL_FILL = '#D7191C';
const CONFIDENTIAL_STROKE = '#8B1213';

export const spec = {
    itemId: 'wetlands_plants_site',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wetland survey sites',
    field: 'privacystatus',   // the attribute this render symbolizes (consumers wire filters to it)
    legend: [
        { label: 'Exact location', color: EXACT_FILL, stroke: EXACT_STROKE },
        { label: 'Confidential (approximate)', color: CONFIDENTIAL_FILL, stroke: CONFIDENTIAL_STROKE },
    ],
} satisfies Binding & {
    render: string;
    field: string;
    legend: { label: string; color: string; stroke: string }[];
};

const isConfidential: ExpressionSpecification = ['==', ['coalesce', ['get', 'privacystatus'], ''], 'Confidential'];

const layers: StyleLayer[] = [
    {
        id: 'wetlands_plants_site-circle',
        type: 'circle',
        paint: {
            'circle-radius': 4,
            'circle-color': ['case', isConfidential, CONFIDENTIAL_FILL, EXACT_FILL],
            'circle-stroke-color': ['case', isConfidential, CONFIDENTIAL_STROKE, EXACT_STROKE],
            'circle-stroke-width': 1,
        },
    },
];
export default layers;
