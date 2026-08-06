/**
 * 1:500,000 statewide geologic units — fill by `unitsymbol`, colors ported
 * verbatim from the legacy GeoServer SLD (Geology_poly). Stratigraphic order
 * preserved so the legend reads youngest -> oldest. NULL/unmapped symbol ->
 * transparent (the SLD drew it as nothing); the data has exactly one such polygon.
 *
 * Field name is `unitsymbol` (no underscore) — the serving-table column that the
 * pipeline carries through to the PMTiles, NOT the SLD's `unit_symbol`. Verified
 * against the published tile metadata (vector_layers[0].fields).
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

// unitsymbol -> fill, verbatim from the GeoServer SLD, youngest -> oldest.
const UNIT_FILL = {
    Qa: '#fdfced', Qao: '#ead3ce', Qe: '#fefc9a', Qg: '#fefdda', Ql: '#f3fdf3',
    Qm: '#f9feef', Qs: '#fefbfb', Qls: '#f5feda', Qb: '#9b86c5', Qr: '#f7a092', QT: '#fef989',
    T5: '#efc46b', T4: '#eac39e', T3: '#fdf7a5', T2: '#f1b44c', T1: '#fdfa68',
    Tpb: '#6c5d61', Tmb: '#a35c64', Tpr: '#f58d92', Tmr: '#f6a5a7', Tma: '#f8b0bf',
    Tmv: '#fedfdf', Tov: '#f696af', Tvu: '#f4e9e7', Ti: '#fd9fda', TK: '#b4d57a',
    K3: '#90a979', K2: '#b3c493', K1: '#7fa572',
    J2: '#6f8873', J1: '#a39c8c', Jg: '#b29523', Ji: '#f94f6f',
    Tr2: '#6faa8c', Tr1: '#519089',
    P2: '#e0fcfe', P1: '#cedff9', PP: '#a1bfef', P: '#8780b2',
    M3: '#51528e', M2: '#a7a29a', M1: '#746765',
    D: '#974035', S: '#a44952', O: '#6e4e52',
    C3: '#fd786a', C2: '#fd4a42', C1: '#f92d28',
    PCs: '#642b28', PCm: '#48323b', PCi: '#f93b5a',
    water: '#ffffff', playa: '#ffffff',
} satisfies Record<string, string>;

export const spec = {
    itemId: 'geolmap_geolunits_500k',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Geologic units (1:500,000)',
    field: 'unitsymbol',
    // Flat legend: label IS the unit symbol (matches the SLD), swatch is its fill.
    legend: Object.entries(UNIT_FILL).map(([label, color]) => ({ label, color })),
} satisfies Binding & { render: string; field: string; legend: { label: string; color: string }[] };

const layers: StyleLayer[] = [
    {
        id: 'geolmap_geolunits_500k-fill',
        type: 'fill',
        paint: {
            // Exact match on unitsymbol; NULL/unmapped -> transparent (the SLD's empty rule).
            'fill-color': matchByField('unitsymbol', UNIT_FILL, 'rgba(0,0,0,0)'),
            'fill-opacity': 0.6, // initial only; the viewer's opacity slider overrides this
        },
    },
];

export default layers;
