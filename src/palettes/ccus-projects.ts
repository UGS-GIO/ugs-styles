/**
 * CCUS Past and Ongoing Projects palettes.
 *
 * Polygons are styled as borders with no fill.
 * Regional projects use an orange scale ramp; site-specific projects use a blue scale ramp.
 * Keyed by `namealias` with title-cased labels for legend display.
 */

// Regional projects — orange scale ramp (light to dark)
export const CCUS_REGIONAL_PROJECTS_FILL: Record<string, string> = {
    'CO2 Storage in Saline Aquifers of the Colorado Plateau': '#fdb462',
    'Rocky Mountain CarbonSAFE Phase 1': '#fd8d3c',
    'Great Basin CarbonSAFE Phase II': '#e6550d',
    'Uinta-Piceance RITAP': '#a63603',
};

// Site-specific projects — blue scale ramp (light to dark)
export const CCUS_SITESPECIFIC_PROJECTS_FILL: Record<string, string> = {
    'Greater Aneth EOR Test': '#9ecae1',
    'CUSP West Iron Mountain': '#4292c6',
    'Uinta Basin CarbonSAFE Phase II': '#08519c',
    'Rocky Mountain CarbonSAFE Phase II': '#08306b',
};

// All past/ongoing projects including statewide projects
export const CCUS_ALL_PROJECTS_FILL: Record<string, string> = {
    ...CCUS_REGIONAL_PROJECTS_FILL,
    ...CCUS_SITESPECIFIC_PROJECTS_FILL,
    'CUSP West CO2 Storage Potential': '#807dba',
    'NATCARB': '#6a51a3',
    'Utah Statewide Carbon Storage Assessment': '#4a1486',
};

export const CCUS_REGIONAL_RAMP = [
    '#fdb462',
    '#fd8d3c',
    '#e6550d',
    '#a63603',
] as const;

export const CCUS_SITESPECIFIC_RAMP = [
    '#9ecae1',
    '#4292c6',
    '#08519c',
    '#08306b',
] as const;
