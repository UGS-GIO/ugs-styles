/**
 * UCRC well purpose categorical palette.
 * Mirrors the historical SLD `ucrc-wells-purpose` GeoServer style.
 * Source-of-truth lives here now; SLD exists only as legacy reference.
 *
 * Two vocabularies share this domain: the current UCRC inventory
 * (`enmin_ucrc_wells`, which says 'Metals' / 'Geotechnical') and the older
 * `wells_spatial` copy of the same wells (which says 'Mining' / 'Building or
 * Construction'). Both are keyed here — a renamed category keeps its colour, so
 * the same well looks the same on either layer. `UCRC_WELLS_PURPOSE_LABELS` is
 * the subset a render should put in its legend for the current inventory.
 */

const MINING = '#D7191C';
const CONSTRUCTION = '#FDB863';

export const UCRC_PURPOSE_FILL: Record<string, string> = {
    'Oil and Gas': '#2B83BA',
    'Metals': MINING,
    'Mining': MINING,                     // wells_spatial's name for Metals
    'Tar Sands': '#4B3621',
    'Water': '#41B6C4',
    'Potash': '#E66101',
    'Coal': '#333333',
    'Stratigraphy': '#7B68EE',
    'Geotechnical': CONSTRUCTION,
    'Building or Construction': CONSTRUCTION,   // wells_spatial's name for Geotechnical
    'Oil Shale': '#8C6D31',
    'Geothermal': '#E31A1C',
    'Teaching': '#A6D854',
    'Display': '#FF69B4',
    'Unknown': '#5B5B5B',
    'Other': '#BDBDBD',
};

const MINING_STROKE = '#922B21';
const CONSTRUCTION_STROKE = '#B08045';

export const UCRC_PURPOSE_STROKE: Record<string, string> = {
    'Oil and Gas': '#1A5276',
    'Metals': MINING_STROKE,
    'Mining': MINING_STROKE,
    'Tar Sands': '#2C1F13',
    'Water': '#2C7F8C',
    'Potash': '#A04500',
    'Coal': '#1A1A1A',
    'Stratigraphy': '#5548A6',
    'Geotechnical': CONSTRUCTION_STROKE,
    'Building or Construction': CONSTRUCTION_STROKE,
    'Oil Shale': '#5E4921',
    'Geothermal': '#9E1213',
    'Teaching': '#74963B',
    'Display': '#B3497E',
    'Unknown': '#333333',
    'Other': '#858585',
};

export const UCRC_PURPOSE_LABELS = Object.keys(UCRC_PURPOSE_FILL);

// The values actually present in `enmin_ucrc_wells.purpose` (live GeoParquet), in legend order.
// A render on that layer legends THIS list, not the whole palette — otherwise the legend shows
// wells_spatial-only swatches (Mining / Teaching / Display) that draw nothing on the inventory.
// 'Unknown' is synthesized by the style from blank/missing purpose; it is not a stored value.
/** Narrow the palette to one layer's vocabulary (unknown labels are skipped). */
export const pickPurpose = (labels: string[]): { fill: Record<string, string>; stroke: Record<string, string> } => {
    const fill: Record<string, string> = {};
    const stroke: Record<string, string> = {};
    for (const l of labels) {
        const f = UCRC_PURPOSE_FILL[l];
        const s = UCRC_PURPOSE_STROKE[l];
        if (f) fill[l] = f;
        if (s) stroke[l] = s;
    }
    return { fill, stroke };
};

export const UCRC_WELLS_PURPOSE_LABELS = [
    'Oil and Gas',
    'Metals',
    'Tar Sands',
    'Water',
    'Potash',
    'Coal',
    'Stratigraphy',
    'Geotechnical',
    'Oil Shale',
    'Geothermal',
    'Unknown',
    'Other',
];

// The older `wells_spatial` copy of the same wells, which kept the pre-rename vocabulary.
// Scoped so a style on that layer doesn't legend (or get validated against) UCRC-only names.
export const WELLS_SPATIAL_PURPOSE_LABELS = [
    'Oil and Gas',
    'Mining',
    'Tar Sands',
    'Water',
    'Potash',
    'Coal',
    'Stratigraphy',
    'Building or Construction',
    'Oil Shale',
    'Geothermal',
    'Teaching',
    'Display',
    'Unknown',
    'Other',
];
