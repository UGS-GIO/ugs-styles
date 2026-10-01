import type { Binding, StyleSpec } from '../../types';
import { WETLANDS_STUDY_RESULTS_FILL } from '../../palettes';

export const spec = {
    itemId: 'wetlands_assessment_study_results',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wetland Assessment Study Results',
    archetype: 'categorical',
    field: 'project',
    palette: 'wetlands-study-results',
    legend: [
        { label: 'Bear River URAP', color: WETLANDS_STUDY_RESULTS_FILL['Bear River URAP'] },
        { label: 'Jordan URAP', color: WETLANDS_STUDY_RESULTS_FILL['Jordan URAP'] },
        { label: 'Uinta 2014', color: WETLANDS_STUDY_RESULTS_FILL['Uinta 2014'] },
        { label: 'Weber URAP', color: WETLANDS_STUDY_RESULTS_FILL['Weber URAP'] },
        { label: 'Central Basin', color: WETLANDS_STUDY_RESULTS_FILL['Central Basin'] },
    ],
} satisfies StyleSpec & Binding;
