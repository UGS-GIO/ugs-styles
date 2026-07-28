// Rebinned per Tara/Nate's 2026-07-28 data-error review: uniform 2in contours
// (..., [-3,-1), [-1,1), [1,3), ...) replacing the old asymmetric SLD-derived
// classes + separate +/-1.2in uncertainty band. Bins are contiguous and
// mutually exclusive so no exclusion filter is needed; the [-1,1) bin plays
// the role of the old "zero" uncertainty band (flagged via ugs:zero).
// GeoServer is retiring — this committed module is the source of truth; edit freely.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_displacement_contours',
    render: 'cumulative',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

// Uniform 2in bins, boundaries at odd integers so 0 falls inside the middle
// bin. Colors reuse the old diverging red (subsidence) -> white (near zero)
// -> blue/purple (uplift) palette, remapped by rank-distance-from-zero.
type Bin = {
    rule: string;
    title: string;
    color: string;
    zero: boolean;
    lo?: number;
    hi?: number;
};

const bins: Bin[] = [
    { rule: 'class_1', title: '< -13 in', color: '#d87070', zero: false, hi: -13 },
    { rule: 'class_2', title: '-13 – -11 in', color: '#e08878', zero: false, lo: -13, hi: -11 },
    { rule: 'class_3', title: '-11 – -9 in', color: '#e89888', zero: false, lo: -11, hi: -9 },
    { rule: 'class_4', title: '-9 – -7 in', color: '#f0aa94', zero: false, lo: -9, hi: -7 },
    { rule: 'class_5', title: '-7 – -5 in', color: '#f6ccb8', zero: false, lo: -7, hi: -5 },
    { rule: 'class_6', title: '-5 – -3 in', color: '#f9dccb', zero: false, lo: -5, hi: -3 },
    { rule: 'class_7', title: '-3 – -1 in', color: '#fce8da', zero: false, lo: -3, hi: -1 },
    { rule: 'class_8', title: '-1 – 1 in (near zero)', color: '#ffffff', zero: true, lo: -1, hi: 1 },
    { rule: 'class_9', title: '1 – 3 in', color: '#bea0d4', zero: false, lo: 1, hi: 3 },
    { rule: 'class_10', title: '3 – 5 in', color: '#c0a8d0', zero: false, lo: 3, hi: 5 },
    { rule: 'class_11', title: '5 – 7 in', color: '#a8b8d8', zero: false, lo: 5, hi: 7 },
    { rule: 'class_12', title: '7 – 9 in', color: '#88c0dc', zero: false, lo: 7, hi: 9 },
    { rule: 'class_13', title: '9 – 11 in', color: '#a8d4e8', zero: false, lo: 9, hi: 11 },
    { rule: 'class_14', title: '11 – 13 in', color: '#c4e2f0', zero: false, lo: 11, hi: 13 },
    { rule: 'class_15', title: '> 13 in', color: '#e0f0f8', zero: false, lo: 13 },
];

function filterFor(bin: Bin) {
    const field = ['get', 'value_inches'];
    if (bin.lo === undefined) {
        return ['<', field, bin.hi];
    }
    if (bin.hi === undefined) {
        return ['>=', field, bin.lo];
    }
    return ['all', ['>=', field, bin.lo], ['<', field, bin.hi]];
}

const layers: StyleLayer[] = bins.flatMap((bin, i) => {
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
}) as StyleLayer[];

export default layers;
