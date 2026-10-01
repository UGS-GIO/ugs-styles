/**
 * LLWW Descriptions — compound classification combining `landform_waterbody` and `hgm_class`.
 * Uses the handwritten StyleLayer[] escape hatch because categorization requires compound logic
 * across two distinct fields matching the legacy app's symbology (ALL-6056).
 */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';
import { WETLANDS_LLWW_FILL } from '../../palettes';

export const spec = {
    itemId: 'wetlands_llww_descriptions',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'LLWW Descriptions',
    legend: [
        { label: 'Rivers, Streams, Canals', color: WETLANDS_LLWW_FILL['Rivers, Streams, Canals'] },
        { label: 'Lakes and Ponds', color: WETLANDS_LLWW_FILL['Lakes and Ponds'] },
        { label: 'Riverine Wetland', color: WETLANDS_LLWW_FILL['Riverine Wetland'] },
        { label: 'Lacustrine Fringe Wetland', color: WETLANDS_LLWW_FILL['Lacustrine Fringe Wetland'] },
        { label: 'Slope Wetland', color: WETLANDS_LLWW_FILL['Slope Wetland'] },
        { label: 'Depressional Wetland', color: WETLANDS_LLWW_FILL['Depressional Wetland'] },
        { label: 'Riparian', color: WETLANDS_LLWW_FILL['Riparian'] },
        { label: 'Flats Wetland', color: WETLANDS_LLWW_FILL['Flats Wetland'] },
    ],
} satisfies Binding & { render: string; legend: { label: string; color: string }[] };

const landform: ExpressionSpecification = ['coalesce', ['get', 'landform_waterbody'], ''];
const hgm: ExpressionSpecification = ['coalesce', ['get', 'hgm_class'], ''];

const isRiverStreamCanal: ExpressionSpecification = [
    'any',
    ['==', landform, 'RV1'],
    ['==', landform, 'ST2'],
    ['==', landform, 'ST3'],
    ['==', landform, 'ST4'],
    ['==', landform, 'ST5'],
];

const isLakePond: ExpressionSpecification = [
    'any',
    ['==', landform, 'PD'],
    ['==', landform, 'LK'],
];

const isRiverineWetland: ExpressionSpecification = [
    'all',
    ['any', ['==', landform, 'BA'], ['==', landform, 'FP'], ['==', landform, 'FR']],
    ['==', hgm, 'Riverine'],
];

const isLacustrineFringe: ExpressionSpecification = [
    'all',
    ['any', ['==', landform, 'BA'], ['==', landform, 'FP'], ['==', landform, 'FR']],
    ['==', hgm, 'Lacustrine Fringe'],
];

const isSlopeWetland: ExpressionSpecification = [
    'all',
    ['==', landform, 'SL'],
    ['==', hgm, 'Slope'],
];

const isDepressionalWetland: ExpressionSpecification = [
    'all',
    ['any', ['==', landform, 'BA'], ['==', landform, 'FR']],
    ['==', hgm, 'Depressional'],
];

const isFlatsWetland: ExpressionSpecification = [
    'all',
    ['==', landform, 'FL'],
    ['==', hgm, 'Flats'],
];

const layers: StyleLayer[] = [
    {
        id: 'wetlands_llww_descriptions-fill',
        type: 'fill',
        'source-layer': 'wetlands_llww_descriptions',
        paint: {
            'fill-color': [
                'case',
                isRiverStreamCanal, WETLANDS_LLWW_FILL['Rivers, Streams, Canals'],
                isLakePond, WETLANDS_LLWW_FILL['Lakes and Ponds'],
                isRiverineWetland, WETLANDS_LLWW_FILL['Riverine Wetland'],
                isLacustrineFringe, WETLANDS_LLWW_FILL['Lacustrine Fringe Wetland'],
                isSlopeWetland, WETLANDS_LLWW_FILL['Slope Wetland'],
                isDepressionalWetland, WETLANDS_LLWW_FILL['Depressional Wetland'],
                isFlatsWetland, WETLANDS_LLWW_FILL['Flats Wetland'],
                WETLANDS_LLWW_FILL['Riparian'],
            ],
            'fill-opacity': 0.75,
            'fill-outline-color': '#808080',
        },
    },
];

export default layers;
