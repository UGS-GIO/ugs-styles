/**
 * hazards:quaternaryfaults_review
 * Hand-translated from SLD: hazards_qFaults_style
 * Symbolizer(s): LineSymbolizer | rules: 16
 *
 * Compound filter: color depends on `faultage`, dash pattern depends on
 * `mappingconstraint`. Width uniformly 2px.
 *
 * SLD encodes dash patterns per mappingconstraint that this translation does not yet model:
 *   "well constrained"        → solid
 *   "moderately constrained"  → dasharray 8 2
 *   "inferred"                → dasharray 3 3
 * To add dash support, split into 3 line layers filtered by mappingconstraint.
 *
 * `<2,600,000` rules in SLD have no stroke color and rely on GeoServer's default black;
 * using #000000 here.
 *
 * No source declared (consumer attaches PMTiles via STAC).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const lineColor: ExpressionSpecification = [
    'match',
    ['get', 'faultage'],
    '<150', '#e60000',
    '<15,000', '#e69800',
    '<130,000', '#4ce600',
    '<750,000', '#005ce6',
    '<2,600,000', '#000000',
    'undetermined', '#a900e6',
    'transparent',
];

export const layers: StyleLayer[] = [
    {
        id: 'quaternaryfaults-review-line',
        type: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': lineColor,
            'line-width': 2,
        },
    },
];

export default layers;
