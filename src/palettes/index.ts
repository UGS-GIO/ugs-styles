/**
 * Palette registry — named color sets referenced by `spec.palette`. One source for color, so
 * layers that share a domain look consistent and theming is central. Never inline hex in a spec.
 *
 * A palette is `{ fill, stroke?, other? }` where fill/stroke map a data value -> color
 * (categorical), and `other` is the fallback for unmapped values.
 *
 * A ramp is an ordered `string[]` — sequential stops, low -> high — referenced the same way by
 * `spec.palette` from the `graduated` archetype (DESIGN.md §4). Two registries, one namespace:
 * an archetype looks in the one it needs, so a spec never says which kind it means.
 */
import { UCRC_PURPOSE_FILL, UCRC_PURPOSE_STROKE, WELLS_SPATIAL_PURPOSE_LABELS, pickPurpose } from './ucrc-purpose';
import { PFDF_DSI, PFDF_LIKELIHOOD } from './pfdf';

export type Palette = {
    fill: Record<string, string>;
    stroke?: Record<string, string>;
    other?: string;
};

export type Ramp = readonly string[];

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

// Wetland Plants EcoRegional Groups — EPA Omernik Level III ecoregions occurring in Utah
// (`us_l3name`). A fixed federal enumeration, not project-specific, so it's safe to hard-list
// rather than derive from a 7-row layer.
export const WETLAND_ECOREGIONS_FILL: Record<string, string> = {
    'Central Basin and Range': '#FDB863',
    'Colorado Plateaus': '#E66101',
    'Northern Basin and Range': '#B2ABD2',
    'Southern Rockies': '#5E3C99',
    'Wasatch and Uinta Mountains': '#1B9E77',
    'Wyoming Basin': '#66C2A5',
    'Mojave Basin and Range': '#A6D96A',
};

// All EPA Omernik Level III ecoregions in Utah, including boundary-edge regions
export const WETLANDS_ECOREGIONS_ALL_FILL: Record<string, string> = {
    ...WETLAND_ECOREGIONS_FILL,
    'Arizona/New Mexico Plateau': '#CAB2D6',
    'Middle Rockies': '#B15928',
    'Arizona/New Mexico Mountains': '#FB9A99',
    'Snake River Plain': '#E7298A',
};

// Wetlands (non-riverine) by wetland_type — matches legacy app colors
export const WETLANDS_TYPE_FILL = {
    'Freshwater Emergent Wetland': '#B4D79E',
    'Freshwater Forested/Shrub Wetland': '#FFD37F',
    'Freshwater Pond': '#BEE8FF',
    'Lake': '#73B2FF',
    'Other': '#D0D0D0',
} as const;

// Wetlands Project Metadata by decade — matches legacy app colors
export const WETLANDS_DECADE_FILL = {
    '1980s': '#C2523C',
    '1990s': '#F7DB07',
    '2000s': '#0EC445',
    '2010s': '#0B2C7A',
    '2020s': '#9900FF',
    'Unknown': '#CCCCCC',
} as const;

// Wetland Assessment Projects — matches legacy app colors
export const WETLANDS_ASSESSMENT_PROJECTS_FILL = {
    'Bear River URAP': '#E41A1C',
    'Jordan URAP': '#377EB8',
    'Uinta 2014': '#4DAF4A',
    'Weber URAP': '#984EA3',
    'GSL URAP': '#FFFF33',
    'SV URAP': '#F0027F',
    'Central Basin': '#A65628',
} as const;

// Wetland Assessment Study Results by project — matches legacy app colors
export const WETLANDS_STUDY_RESULTS_FILL = {
    'Bear River URAP': '#99233D',
    'Uinta 2014': '#3CA5BA',
    'Jordan URAP': '#4031C4',
    'Weber URAP': '#B08F2E',
    'Central Basin': '#3FC93C',
} as const;

// Wetland LLWW Descriptions — matches legacy app colors
export const WETLANDS_LLWW_FILL = {
    'Rivers, Streams, Canals': '#002673',
    'Lakes and Ponds': '#00C3FF',
    'Riverine Wetland': '#00A884',
    'Lacustrine Fringe Wetland': '#DE73FF',
    'Slope Wetland': '#FFFF73',
    'Depressional Wetland': '#E69900',
    'Riparian': '#A87000',
    'Flats Wetland': '#FFECBE',
} as const;

// Wetland Stressors ramp: None (0), Low (1), Moderate (2), High (3)
export const WETLANDS_STRESSORS_RAMP = [
    '#0070FF',
    '#3AFF00',
    '#FFAA00',
    '#FF0000',
] as const;

export const PALETTES: Record<string, Palette> = {
    'ucrc-purpose': { fill: UCRC_PURPOSE_FILL, stroke: UCRC_PURPOSE_STROKE, other: '#BDBDBD' },
    // Same colors, scoped to the older wells_spatial vocabulary — see ucrc-purpose.ts.
    'wells-purpose': { ...pickPurpose(WELLS_SPATIAL_PURPOSE_LABELS), other: '#BDBDBD' },
    'qfaults': { fill: QFAULTS_FILL, other: '#999999' },
    'pipelines': { fill: PIPELINES_FILL, other: '#888888' },
    'counties': { fill: COUNTIES_FILL, other: '#CCCCCC' },
    'ccus-regions': { fill: CCUS_REGIONS_FILL, other: '#E0E0E0' },
    'oilgasfields': { fill: OILGASFIELDS_FILL, other: '#888888' },
    'powerplants': { fill: POWERPLANTS_FILL, other: '#999999' },
    'transmission': { fill: TRANSMISSION_FILL, other: '#888888' },
    'basins': { fill: BASINS_FILL, other: '#D3D3D3' },
    'geolunits': { fill: GEOLUNITS_FILL, other: '#E5D8BD' },
    'wetland-ecoregions': { fill: WETLAND_ECOREGIONS_FILL, other: '#CCCCCC' },
    'wetlands-ecoregions': { fill: WETLANDS_ECOREGIONS_ALL_FILL, other: '#CCCCCC' },
    'wetlands-type': { fill: WETLANDS_TYPE_FILL, other: '#D0D0D0' },
    'wetlands-decade': { fill: WETLANDS_DECADE_FILL, other: '#CCCCCC' },
    'wetlands-assessment-projects': { fill: WETLANDS_ASSESSMENT_PROJECTS_FILL, other: '#BDBDBD' },
    'wetlands-study-results': { fill: WETLANDS_STUDY_RESULTS_FILL, other: '#BDBDBD' },
};

// Sequential ramps for `graduated` — ordered low -> high, one stop per class.
export const RAMPS: Record<string, Ramp> = {
    'pfdf-dsi': PFDF_DSI,
    'pfdf-likelihood': PFDF_LIKELIHOOD,
    'wetlands-stressors': WETLANDS_STRESSORS_RAMP,
};
