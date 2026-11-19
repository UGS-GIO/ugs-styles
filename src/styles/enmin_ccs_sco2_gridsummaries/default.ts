import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'enmin_ccs_sco2_gridsummaries',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Statewide Storage Resource Estimates',
    legend: [
        { label: 'High Cap / Low Cost', value: 'bivariate_0_0', color: '#64acbe' },
        { label: 'High Cap / Mid Cost', value: 'bivariate_0_1', color: '#627f8c' },
        { label: 'High Cap / High Cost', value: 'bivariate_0_2', color: '#574249' },
        { label: 'Mid Cap / Low Cost', value: 'bivariate_1_0', color: '#b0d5df' },
        { label: 'Mid Cap / Mid Cost', value: 'bivariate_1_1', color: '#ad9ea5' },
        { label: 'Mid Cap / High Cost', value: 'bivariate_1_2', color: '#985356' },
        { label: 'Low Cap / Low Cost', value: 'bivariate_2_0', color: '#e8e8e8' },
        { label: 'Low Cap / Mid Cost', value: 'bivariate_2_1', color: '#e4acac' },
        { label: 'Low Cap / High Cost', value: 'bivariate_2_2', color: '#c85a5a' },
        { label: 'Not Evaluated', value: 'bivariate_nodata', color: '#ffffff', stroke: '#999999' },
    ],
} satisfies Binding & { render: string };

const hasPercentiles = (): ['all', ['has', string], ['has', string]] => ['all', ['has', 'capacity_percentile'], ['has', 'cost_percentile']];
const missingPercentiles = (): ['any', ['!', ['has', string]], ['!', ['has', string]]] => ['any', ['!', ['has', 'capacity_percentile']], ['!', ['has', 'cost_percentile']]];
const cap = (): ['to-number', ['get', string]] => ['to-number', ['get', 'capacity_percentile']];
const cost = (): ['to-number', ['get', string]] => ['to-number', ['get', 'cost_percentile']];

const layers: StyleLayer[] = [
    {
        id: 'enmin_ccs_sco2_gridsummaries-nodata-fill',
        type: 'fill',
        filter: missingPercentiles(),
        paint: {
            'fill-color': '#ffffff',
            'fill-opacity': 0.3,
        },
    },
    {
        id: 'enmin_ccs_sco2_gridsummaries-nodata-outline',
        type: 'line',
        filter: missingPercentiles(),
        paint: {
            'line-color': '#999999',
            'line-width': 0.5,
            'line-dasharray': [4, 2],
        },
    },
    {
        id: 'enmin_ccs_sco2_gridsummaries-fill',
        type: 'fill',
        filter: hasPercentiles(),
        paint: {
            'fill-color': [
                'case',
                ['all', ['>=', cap(), 0.67], ['>=', cost(), 0.67]], '#64acbe',
                ['all', ['>=', cap(), 0.67], ['>=', cost(), 0.33]], '#627f8c',
                ['>=', cap(), 0.67], '#574249',
                ['all', ['>=', cap(), 0.33], ['>=', cost(), 0.67]], '#b0d5df',
                ['all', ['>=', cap(), 0.33], ['>=', cost(), 0.33]], '#ad9ea5',
                ['>=', cap(), 0.33], '#985356',
                ['>=', cost(), 0.67], '#e8e8e8',
                ['>=', cost(), 0.33], '#e4acac',
                '#c85a5a',
            ],
            'fill-opacity': 0.8,
        },
    },
    {
        id: 'enmin_ccs_sco2_gridsummaries-outline',
        type: 'line',
        filter: hasPercentiles(),
        paint: {
            'line-color': '#444444',
            'line-width': 0.5,
        },
    },
    {
        id: 'enmin_ccs_sco2_gridsummaries-label',
        type: 'symbol',
        filter: ['>', ['coalesce', ['to-number', ['get', 'formation_count']], 0], 0],
        layout: {
            'text-field': ['concat', ['to-string', ['get', 'formation_count']], ' Fms'],
            'text-font': ['Noto Sans Bold'],
            'text-size': 13,
        },
        paint: {
            'text-color': '#ffffff',
            'text-halo-color': '#000000',
            'text-halo-width': 2.5,
        },
    },
];

export default layers;
