/**
 * CCUS Past and Ongoing Projects palettes.
 *
 * Polygons are styled as borders with no fill.
 * Regional projects use distinct greens; site-specific projects use distinct blues and purples.
 * Keyed by `namealias` with title-cased labels for legend display.
 */

// Regional projects — distinct greens
export const CCUS_REGIONAL_PROJECTS_FILL: Record<string, string> = {
    'CO2 Storage in Saline Aquifers of the Colorado Plateau': '#1b9e77',
    'Rocky Mountain CarbonSAFE Phase 1': '#4daf4a',
    'Great Basin CarbonSAFE Phase II': '#66a61e',
    'Uinta-Piceance RITAP': '#005a32',
};

// Site-specific projects — distinct blues and purples
export const CCUS_SITESPECIFIC_PROJECTS_FILL: Record<string, string> = {
    'Greater Aneth EOR Test': '#1f78b4',
    'CUSP West Iron Mountain': '#7b2cbf',
    'Uinta Basin CarbonSAFE Phase II': '#08306b',
    'Rocky Mountain CarbonSAFE Phase II': '#4a1486',
};

// All past/ongoing projects including statewide projects
export const CCUS_ALL_PROJECTS_FILL: Record<string, string> = {
    ...CCUS_REGIONAL_PROJECTS_FILL,
    ...CCUS_SITESPECIFIC_PROJECTS_FILL,
    'CUSP West CO2 Storage Potential': '#807dba',
    'NATCARB': '#6a51a3',
    'Utah Statewide Carbon Storage Assessment': '#3f007d',
};

export const CCUS_REGIONAL_RAMP = [
    '#1b9e77',
    '#4daf4a',
    '#66a61e',
    '#005a32',
] as const;

export const CCUS_SITESPECIFIC_RAMP = [
    '#1f78b4',
    '#7b2cbf',
    '#08306b',
    '#4a1486',
] as const;
