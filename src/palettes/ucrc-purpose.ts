/**
 * UCRC well purpose categorical palette.
 * Mirrors the historical SLD `ucrc-wells-purpose` GeoServer style.
 * Source-of-truth lives here now; SLD exists only as legacy reference.
 */

export const UCRC_PURPOSE_FILL: Record<string, string> = {
    'Oil and Gas': '#2B83BA',
    'Mining': '#D7191C',
    'Tar Sands': '#4B3621',
    'Water': '#41B6C4',
    'Potash': '#E66101',
    'Coal': '#333333',
    'Stratigraphy': '#7B68EE',
    'Building or Construction': '#FDB863',
    'Oil Shale': '#8C6D31',
    'Geothermal': '#E31A1C',
    'Teaching': '#A6D854',
    'Display': '#FF69B4',
    'Other': '#BDBDBD',
};

export const UCRC_PURPOSE_STROKE: Record<string, string> = {
    'Oil and Gas': '#1A5276',
    'Mining': '#922B21',
    'Tar Sands': '#2C1F13',
    'Water': '#2C7F8C',
    'Potash': '#A04500',
    'Coal': '#1A1A1A',
    'Stratigraphy': '#5548A6',
    'Building or Construction': '#B08045',
    'Oil Shale': '#5E4921',
    'Geothermal': '#9E1213',
    'Teaching': '#74963B',
    'Display': '#B3497E',
    'Other': '#858585',
};

export const UCRC_PURPOSE_LABELS = Object.keys(UCRC_PURPOSE_FILL);
