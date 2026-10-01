import type { Binding, StyleSpec } from '../../types';
import { WETLANDS_ASSESSMENT_PROJECTS_FILL } from '../../palettes';

export const spec = {
    itemId: 'wetlands_assessment_projects',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: 'Wetland Assessment Projects',
    archetype: 'categorical',
    field: 'project',
    palette: 'wetlands-assessment-projects',
    legend: [
        { label: 'Bear River URAP', color: WETLANDS_ASSESSMENT_PROJECTS_FILL['Bear River URAP'] },
        { label: 'Jordan URAP', color: WETLANDS_ASSESSMENT_PROJECTS_FILL['Jordan URAP'] },
        { label: 'Uinta 2014', color: WETLANDS_ASSESSMENT_PROJECTS_FILL['Uinta 2014'] },
        { label: 'Weber URAP', color: WETLANDS_ASSESSMENT_PROJECTS_FILL['Weber URAP'] },
        { label: 'GSL URAP', color: WETLANDS_ASSESSMENT_PROJECTS_FILL['GSL URAP'] },
        { label: 'SV URAP', color: WETLANDS_ASSESSMENT_PROJECTS_FILL['SV URAP'] },
        { label: 'Central Basin', color: WETLANDS_ASSESSMENT_PROJECTS_FILL['Central Basin'] },
    ],
} satisfies StyleSpec & Binding;
