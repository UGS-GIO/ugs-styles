/**
 * Palette registry — named color sets referenced by `spec.palette`. One source for color, so
 * layers that share a domain look consistent and theming is central. Never inline hex in a spec.
 *
 * A palette is `{ fill, stroke?, other? }` where fill/stroke map a data value -> color
 * (categorical), and `other` is the fallback for unmapped values.
 */
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE } from './ucrc-purpose';

export type Palette = {
    fill: Record<string, string>;
    stroke?: Record<string, string>;
    other?: string;
};

// Hazards - Quaternary Faults palette
const QFAULTS_FILL: Record<string, string> = {
    'Historical (<150)': '#D73027',
    'Holocene (<15,000)': '#FF4500',
    'Late Quaternary (<130,000)': '#FE7F0C',
    'Middle to Late Quaternary (<750,000)': '#FDBE62',
    'Quaternary (<2,600,000)': '#4DAF4A',
    'Undetermined': '#777777',
};

// Energy & Minerals - Pipelines by Commodity palette
const PIPELINES_FILL: Record<string, string> = {
    'Natural Gas': '#1F78B4',
    'Petroleum': '#A65628',
    'Crude Oil': '#774411',
    'Liquified Petroleum Gases (LPG)': '#984EA3',
};

// Counties - 4-color map palette
const COUNTIES_FILL: Record<string, string> = {
    '1': '#8DD3C7',
    '2': '#FFFFB3',
    '3': '#BEBADA',
    '4': '#FB8072',
};

// CCUS Geologic Regions palette
const CCUS_REGIONS_FILL: Record<string, string> = {
    'Paradox Basin': '#A6CEE3',
    'Uinta Basin': '#FDB462',
    'Green River': '#B2DF8A',
    'Wasatch': '#CAB2D6',
};

// Oil and Gas Fields palette
const OILGASFIELDS_FILL: Record<string, string> = {
    'Active': '#4DAF4A',
    'Abandoned': '#999999',
    'Depleted': '#555555',
};

// Power Plants by Primary Fuel palette
const POWERPLANTS_FILL: Record<string, string> = {
    'Coal': '#333333',
    'Natural Gas': '#1F78B4',
    'Solar': '#FFD700',
    'Hydro': '#41B6C4',
    'Wind': '#A6D854',
    'Geothermal': '#E31A1C',
};

// Transmission Lines by Voltage palette
const TRANSMISSION_FILL: Record<string, string> = {
    '345': '#E31A1C',
    '230': '#FF7F00',
    '138': '#1F78B4',
    '69': '#4DAF4A',
};

// UCRC Basins palette
const BASINS_FILL: Record<string, string> = {
    'Uinta Basin': '#A6CEE3',
    'Paradox Basin': '#1F78B4',
    'Green River Basin': '#B2DF8A',
};

// Geologic Units palette
const GEOLUNITS_FILL: Record<string, string> = {
    'Q': '#FFF7BC',
    'Qa': '#FFF7BC',
    'Qaf': '#FEE391',
    'T': '#FEC44F',
    'K': '#984EA3',
    'J': '#4DAF4A',
    'P': '#377EB8',
};

export const PALETTES: Record<string, Palette> = {
    'ucrc-purpose': { fill: UCRC_PURPOSE_FILL, stroke: UCRC_PURPOSE_STROKE, other: '#BDBDBD' },
    'qfaults': { fill: QFAULTS_FILL, other: '#999999' },
    'pipelines': { fill: PIPELINES_FILL, other: '#888888' },
    'counties': { fill: COUNTIES_FILL, other: '#CCCCCC' },
    'ccus-regions': { fill: CCUS_REGIONS_FILL, other: '#E0E0E0' },
    'oilgasfields': { fill: OILGASFIELDS_FILL, other: '#888888' },
    'powerplants': { fill: POWERPLANTS_FILL, other: '#999999' },
    'transmission': { fill: TRANSMISSION_FILL, other: '#888888' },
    'basins': { fill: BASINS_FILL, other: '#D3D3D3' },
    'geolunits': { fill: GEOLUNITS_FILL, other: '#E5D8BD' },
};
