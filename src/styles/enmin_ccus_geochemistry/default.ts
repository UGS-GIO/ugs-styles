// Seeded from live GeoServer: energy_mineral:enmin_ccus_geochemistry_current (WMS GetStyles → geostyler, one-time capture).
// GeoServer is retiring — this committed module is now the source of truth; edit freely.
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';

// `datatype` class -> fill, straight from the SLD. Average matches as a substring because the
// data carries both 'Average' and 'Average '.
const DATATYPE_FILL = {
    'Core Analysis': '#7B1FA2',
    'Average': '#AB47BC',
    'Salinity Only': '#CE93D8',
} satisfies Record<string, string>;
const STROKE = '#4A148C';

export const spec = {
    itemId: 'enmin_ccus_geochemistry',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wells by rock property data type',
    legend: Object.entries(DATATYPE_FILL).map(([label, color]) => ({ label, color, stroke: STROKE })),
} satisfies Binding & { render: string };

const datatype: ExpressionSpecification = ['downcase', ['to-string', ['get', 'datatype']]];

const circle = (i: number, color: string, filter: ExpressionSpecification): StyleLayer => ({
    id: `enmin_ccus_geochemistry-${i}`,
    type: 'circle',
    paint: {
        'circle-radius': 3.5,
        'circle-color': color,
        'circle-stroke-width': 0.5,
        'circle-stroke-color': STROKE,
    },
    filter,
});

const layers: StyleLayer[] = [
    circle(0, DATATYPE_FILL['Core Analysis'], ['==', datatype, 'core analysis']),
    circle(1, DATATYPE_FILL.Average, ['in', 'average', datatype]),
    circle(2, DATATYPE_FILL['Salinity Only'], ['==', datatype, 'salinity only']),
];
export default layers;
