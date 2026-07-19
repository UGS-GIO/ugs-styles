// Hand-authored: no GeoServer style exists for this layer to seed from (no such layer is published), so
// unlike the other hazards styles this one has no upstream source of truth.
//
// PROVISIONAL COLORS — chosen, not derived from a published symbology spec. `EFZgdc` is an earth-fissure-
// zone variant, so this reads as related to hazards_earthfissure (red/brown/green lines) without colliding
// with it: a muted ochre area fill + darker outline. Swap freely once the cartographic spec exists.
//
// The single class is filtered explicitly rather than left unfiltered, so a new gdchazardunit value shows
// up as unclassified (grey fallback) instead of being silently drawn as if it were this class.
import type { Binding, StyleLayer } from '../../types';

export const spec = {
    itemId: 'hazards_giantdesiccationcrack',
    render: 'default',
    kind: 'vector',
    assets: ['pmtiles'],
    title: "polygon",
} satisfies Binding & { render: string };

const CLASS_FILTER = ['all', ['==', ['get', 'gdchazardunit'], 'EFZgdc']];
const METADATA = {
    'ugs:rule': 'EFZgdc',
    'ugs:title': 'Generalized Area of Giant Desiccation Cracks',
    'ugs:zero': false,
};

const layers: StyleLayer[] = [
    {
        "id": "hazards_giantdesiccationcrack-0",
        "type": "fill",
        "metadata": METADATA,
        "paint": {
            "fill-color": "#d9a441",
            "fill-opacity": 0.35,
        },
        "filter": CLASS_FILTER,
    },
    {
        "id": "hazards_giantdesiccationcrack-1",
        "type": "line",
        "metadata": METADATA,
        "paint": {
            "line-color": "#8a6a1f",
            "line-width": 1,
        },
        "filter": CLASS_FILTER,
    },
] as unknown as StyleLayer[];

export default layers;
