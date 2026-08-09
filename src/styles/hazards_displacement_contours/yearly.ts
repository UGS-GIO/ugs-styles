// Rebinned per Tara/Nate's 2026-07-28 data-error review: uniform 1in contours
// (..., [-2,-1), [-1,0), [0,1), [1,2), ...) replacing the old asymmetric
// SLD-derived classes + separate +/-1.2in uncertainty band. Bins are
// contiguous and mutually exclusive so no exclusion filter is needed; the
// [-1,0) and [0,1) bins together play the role of the old "zero" uncertainty
// band (flagged via ugs:zero, both rendered white to read as one band).
// GeoServer is retiring — this committed module is the source of truth; edit freely.
import type { ExpressionSpecification, FilterSpecification } from 'maplibre-gl';
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_displacement_contours',
    render: 'yearly',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

// Uniform 1in bins, boundaries at integers so 0 is a bin edge, not a
// midpoint. Colors reuse the old diverging red (subsidence) -> white (near
// zero) -> blue/purple (uplift) palette, remapped by rank-distance-from-zero.
type Bin = {
    rule: string;
    title: string;
    color: string;
    zero: boolean;
    lo?: number;
    hi?: number;
};

const bins: Bin[] = [
    { rule: 'class_1', title: '< -4 in', color: '#d87070', zero: false, hi: -4 },
    { rule: 'class_2', title: '-4 – -3 in', color: '#e89888', zero: false, lo: -4, hi: -3 },
    { rule: 'class_3', title: '-3 – -2 in', color: '#f0aa94', zero: false, lo: -3, hi: -2 },
    { rule: 'class_4', title: '-2 – -1 in', color: '#f6ccb8', zero: false, lo: -2, hi: -1 },
    { rule: 'class_5', title: '-1 – 0 in (near zero)', color: '#ffffff', zero: true, lo: -1, hi: 0 },
    { rule: 'class_6', title: '0 – 1 in (near zero)', color: '#ffffff', zero: true, lo: 0, hi: 1 },
    { rule: 'class_7', title: '1 – 2 in', color: '#e0f0f8', zero: false, lo: 1, hi: 2 },
    { rule: 'class_8', title: '2 – 3 in', color: '#a8d4e8', zero: false, lo: 2, hi: 3 },
    { rule: 'class_9', title: '3 – 4 in', color: '#88c0dc', zero: false, lo: 3, hi: 4 },
    { rule: 'class_10', title: '> 4 in', color: '#bea0d4', zero: false, lo: 4 },
];

// Half-open [lo, hi): open-ended tails carry only the bound they have.
function filterFor({ lo, hi }: Bin): FilterSpecification {
    const field: ExpressionSpecification = ['get', 'value_inches'];
    if (lo === undefined && hi !== undefined) return ['<', field, hi];
    if (hi === undefined && lo !== undefined) return ['>=', field, lo];
    if (lo !== undefined && hi !== undefined) return ['all', ['>=', field, lo], ['<', field, hi]];
    throw new Error('bin needs at least one bound');
}

const layers: StyleLayer[] = bins.flatMap((bin, i): StyleLayer[] => {
    const metadata = { 'ugs:rule': bin.rule, 'ugs:title': bin.title, 'ugs:zero': bin.zero };
    const filter = filterFor(bin);
    return [
        {
            id: `hazards_displacement_contours-${i * 2}`,
            type: 'fill',
            metadata,
            paint: { 'fill-color': bin.color, 'fill-opacity': 0.85 },
            filter,
        },
        {
            id: `hazards_displacement_contours-${i * 2 + 1}`,
            type: 'line',
            metadata,
            paint: bin.zero
                ? { 'line-color': '#cccccc', 'line-width': 0.5 }
                : { 'line-color': '#444444', 'line-width': 0.3 },
            filter,
        },
    ];
});

export default layers;
