/**
 * hazards:hazards_qfaults_current
 * Hand-translated from SLD: hazards_qfaults_test_style
 * Symbolizer(s): LineSymbolizer | rules: 16
 *
 * Categorical line color on qffhazardunit. Width uniformly 2px.
 *
 * SLD encodes dash patterns per category that this translation does not yet model:
 *   *MC* (Moderately Constrained) → dasharray 8 2
 *   *I*  (Inferred)                → dasharray 3 3
 *   *WC* (Well Constrained)         → solid
 * U2600K* rules in SLD have no stroke color and rely on GeoServer's default black; using
 * #000000 here. To add dash support, split into 2–3 line layers filtered by suffix.
 *
 * No source declared (consumer attaches PMTiles via STAC).
 */

import type { StyleLayer } from '../../types';
import type { ExpressionSpecification } from 'maplibre-gl';

const lineColor: ExpressionSpecification = [
    'match',
    ['get', 'qffhazardunit'],
    'U150WCqff', '#e60000',
    'U15KWCqff', '#e69800',
    'U15KMCqff', '#e69800',
    'U15KIqff', '#e69800',
    'U130KWCqff', '#4ce600',
    'U130KMCqff', '#4ce600',
    'U130KIqff', '#4ce600',
    'U750KWCqff', '#005ce6',
    'U750KMCqff', '#005ce6',
    'U750KIqff', '#005ce6',
    'U2600KWCqff', '#000000',
    'U2600KMCqff', '#000000',
    'U2600KIqff', '#000000',
    'UDWCqff', '#a900e6',
    'UDMCqff', '#a900e6',
    'UDIqff', '#a900e6',
    'transparent',
];

export const layers: StyleLayer[] = [
    {
        id: 'hazards-qfaults-current-line',
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
