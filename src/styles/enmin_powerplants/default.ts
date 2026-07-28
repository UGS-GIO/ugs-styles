/** Power plants — color by `primsource`, radius graduated on `total_mw` (capacity). */
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';

// `other` is a real value in the data AND the catch-all for anything unmapped — same grey either way.
const SOURCE_FILL = {
    'coal': '#000000',
    'natural gas': '#e31a1c',
    'petroleum': '#b15928',
    'hydroelectric': '#1f78b4',
    'wind': '#a6cee3',
    'solar': '#ff7f00',
    'geothermal': '#fb9a99',
    'biomass': '#33a02c',
    'other': '#999999',
} satisfies Record<string, string>;
const FALLBACK = SOURCE_FILL.other;

export const spec = {
    itemId: 'enmin_powerplants',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Power Plants',
    field: 'primsource',   // the attribute this render symbolizes (consumers wire filters to it)
    // Flat legend: each entry's label IS the field value, so consumers can join swatch -> feature.
    // Values stay lowercase because that's what `primsource` holds. Radius encodes total_mw and has
    // no swatch — a size legend isn't expressible here.
    legend: Object.entries(SOURCE_FILL).map(([label, color]) => ({ label, color })),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

// Downcased so a stray 'Coal' doesn't fall through to grey.
const source: ExpressionSpecification = ['downcase', ['to-string', ['get', 'primsource']]];

// `number` (not `to-number`) so a null/absent capacity yields 0 instead of erroring the whole layer.
const capacity: ExpressionSpecification = ['number', ['get', 'total_mw'], 0];

const layers: StyleLayer[] = [
    {
        id: 'enmin_powerplants-circle',
        type: 'circle',
        paint: {
            'circle-radius': [
                'interpolate', ['linear'], capacity,
                0, 2,
                100, 4,
                500, 7,
                1000, 10,
                3000, 17,
            ],
            'circle-color': [
                'match', source,
                'coal', SOURCE_FILL.coal,
                'natural gas', SOURCE_FILL['natural gas'],
                'petroleum', SOURCE_FILL.petroleum,
                'hydroelectric', SOURCE_FILL.hydroelectric,
                'wind', SOURCE_FILL.wind,
                'solar', SOURCE_FILL.solar,
                'geothermal', SOURCE_FILL.geothermal,
                'biomass', SOURCE_FILL.biomass,
                FALLBACK,
            ],
            'circle-opacity': 0.8,
            'circle-stroke-width': 0.5,
            'circle-stroke-color': '#000000',
        },
    },
];
export default layers;
