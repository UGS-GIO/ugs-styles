/**
 * Geologic-hazard study areas — where UGS has mapped hazards, plus the project-area gaps that were
 * NOT mapped. Ported from the retiring GeoServer SLD hazards:studyareas, which keys on
 * `mapped_hazards` with two rules:
 *   - else-rule "Mapped Areas": fill-opacity 0 (no fill) + red stroke #a80000, width 3.
 *   - "NA" rule (mapped_hazards = 'NA'): solid grey fill #969696 + grey stroke.
 * So an 'NA' polygon reads as a filled grey gap; every mapped area reads as a red outline only.
 *
 * Bespoke escape hatch (default-export StyleLayer[]), not the `categorical` archetype: that archetype
 * bakes a single fill with a hairline outline, whereas this needs a separate stroke AND a fill that
 * only paints for 'NA'. Color still uses the repo's `matchByField` helper. One faithful simplification:
 * the SLD gave the NA stroke the renderer default width (~1) and mapped stroke width 3; here both
 * strokes are width 3 (the NA edge sits on its own grey fill, so the width is cosmetically moot) —
 * the distinguishing red-vs-grey stroke and grey-fill-vs-none are preserved exactly.
 */
import type { Binding, StyleLayer } from '../../types';
import { matchByField } from '../../expressions/categorical';

const FIELD = 'mapped_hazards';
const MAPPED_RED = '#a80000';        // SLD else-rule stroke — mapped hazard areas
const NA_GREY = '#969696';           // SLD 'NA' rule fill + stroke — project-area gaps not yet mapped
const NO_FILL = 'rgba(0,0,0,0)';     // mapped areas draw outline-only (SLD fill-opacity 0)

const strokeColor = matchByField(FIELD, { NA: NA_GREY }, MAPPED_RED);

export const spec = {
    itemId: 'hazards_studyareas',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Geologic Hazard Study Areas',
    field: FIELD,   // the attribute this render symbolizes (consumers wire filters to it)
    legend: [
        { label: 'Mapped hazard area', color: MAPPED_RED },
        { label: 'Not mapped (within project area)', color: NA_GREY },
    ],
} satisfies Binding & { render: string; field: string };

const layers: StyleLayer[] = [
    {
        id: 'hazards_studyareas-fill',
        type: 'fill',
        // Only 'NA' gets a solid grey fill; every mapped value falls through to transparent.
        paint: { 'fill-color': matchByField(FIELD, { NA: NA_GREY }, NO_FILL), 'fill-opacity': 1 },
    },
    {
        id: 'hazards_studyareas-line',
        type: 'line',
        paint: { 'line-color': strokeColor, 'line-width': 3 },
    },
];

export default layers;
