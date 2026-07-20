// Colors taken from the layer's live GeoServer default style ("Light Pink"), not invented.
// Unclassified: the data has no category field, only basin names (50 features), so one fill for all.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_aquifers_combined',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

const METADATA = {
    'ugs:rule': 'aquifer_combined',
    'ugs:title': 'Combined aquifer area',
    'ugs:zero': false,
};

const layers: StyleLayer[] = [
    {
        "id": "hazards_aquifers_combined-0",
        "type": "fill",
        "metadata": METADATA,
        "paint": { "fill-color": "#ffb6c1", "fill-opacity": 0.45 },
    },
    {
        "id": "hazards_aquifers_combined-1",
        "type": "line",
        "metadata": METADATA,
        "paint": { "line-color": "#cc8899", "line-width": 0.5 },
    },
] as unknown as StyleLayer[];

export default layers;
