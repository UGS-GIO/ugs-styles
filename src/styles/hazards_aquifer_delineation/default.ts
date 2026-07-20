// PROVISIONAL colors — GeoServer only has the `generic` placeholder for this layer (grey #AAAAAA), so
// there is no upstream symbology to port. Blue reads as groundwater and stays distinct from the pink
// combined-aquifer layer it overlaps. Swap when a cartographic spec exists.
// Unclassified: the data has no category field, only basin names (38 features), so one fill for all.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_aquifer_delineation',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

const METADATA = {
    'ugs:rule': 'aquifer_delineation',
    'ugs:title': 'Delineated aquifer',
    'ugs:zero': false,
};

const layers: StyleLayer[] = [
    {
        "id": "hazards_aquifer_delineation-0",
        "type": "fill",
        "metadata": METADATA,
        "paint": { "fill-color": "#7fb3d5", "fill-opacity": 0.35 },
    },
    {
        "id": "hazards_aquifer_delineation-1",
        "type": "line",
        "metadata": METADATA,
        "paint": { "line-color": "#2e6da4", "line-width": 0.8 },
    },
] as unknown as StyleLayer[];

export default layers;
