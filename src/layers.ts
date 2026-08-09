/**
 * GL layer predicates shared by the build (the gate) and coverage (the report).
 *
 * These two live together because both scripts must judge the SAME layers: coverage reports on
 * what build-json emitted, so a predicate that drifted between them would report on a shape that
 * never shipped.
 *
 *   normalizeFills — the published shape of a stroke-only SLD polygon
 *   auditDraw      — can this fragment put the feature's geometry on the map, and from what zoom
 */

// Loose shape: bespoke modules default-export hand-written GL, so treat a layer as JSON.
export type GLLayer = {
    id?: string;
    type?: string;
    minzoom?: number;
    maxzoom?: number;
    filter?: unknown;
    paint?: Record<string, unknown>;
    layout?: Record<string, unknown>;
};

// Layer types that draw the feature's own geometry. `symbol` counts ONLY when it places an icon
// (the sprite renders — UCRC wells by-boxtype): a text-only symbol layer labels geometry that
// something else has to draw, which is exactly the failure this guards against.
const DRAW_TYPES = new Set(['fill', 'line', 'circle', 'fill-extrusion', 'heatmap']);

export const drawsGeometry = (l: GLLayer): boolean =>
    DRAW_TYPES.has(l.type ?? '')
    || (l.type === 'symbol' && l.layout?.['icon-image'] != null);

/**
 * Stroke-only SLD polygons.
 *
 * A `fill` layer with no fill-color / fill-pattern renders MapLibre's default OPAQUE BLACK, so it
 * cannot ship as-is — the SLD→GL seed emits one for every polygon whose `<Fill>` was transparent.
 * When such a fill carries `fill-outline-color`, that color IS the SLD stroke: republish it as a
 * `line` layer. Dropping it instead (what this used to do) threw the outline away silently and left
 * label-only styles that draw nothing — see #34.
 *
 * A fill with no paint at all has no stroke to recover, so it stays dropped and is reported by the
 * caller; we do NOT invent a color (see feedback-no-custom-styling). Stroke/label layers in the
 * same style are untouched.
 */
export const normalizeFills = (layers: GLLayer[]): GLLayer[] => {
    if (!Array.isArray(layers)) return layers;
    const out: GLLayer[] = [];
    for (const l of layers) {
        const paint = l.paint ?? {};
        const isFill = l.type === 'fill';
        if (!isFill || paint['fill-color'] != null || paint['fill-pattern'] != null) {
            out.push(l);
            continue;
        }
        const outline = paint['fill-outline-color'];
        if (outline == null) continue;   // nothing to recover — drop (audited by the caller)
        // Carry only the geometry gates and the stroke color. `fill-opacity` is deliberately NOT
        // mapped to `line-opacity`: in these seeds it is the 0 that meant "no fill", and copying it
        // would publish an invisible line.
        out.push({
            ...(l.id ? { id: l.id } : {}),
            type: 'line',
            ...(l.minzoom != null ? { minzoom: l.minzoom } : {}),
            ...(l.maxzoom != null ? { maxzoom: l.maxzoom } : {}),
            ...(l.filter != null ? { filter: l.filter } : {}),
            paint: { 'line-color': outline },
        });
    }
    return out;
};

export type DrawAudit = {
    draws: boolean;          // ≥1 layer draws the feature geometry
    minzoom: number;         // lowest zoom at which any of them appears (0 = always)
};

/** Judge a published fragment: can it draw at all, and from what zoom. */
export const auditDraw = (layers: GLLayer[]): DrawAudit => {
    const drawing = (Array.isArray(layers) ? layers : []).filter(drawsGeometry);
    return {
        draws: drawing.length > 0,
        minzoom: drawing.length ? Math.min(...drawing.map((l) => l.minzoom ?? 0)) : 0,
    };
};
