import type { ExpressionSpecification } from 'maplibre-gl';

/**
 * Build a maplibre `match` expression mapping a feature property's string
 * value to a color (or any string). Falls back to defaultValue when no match.
 */
export const matchByField = (
    field: string,
    matches: Record<string, string>,
    defaultValue: string,
): ExpressionSpecification => {
    const expr: unknown[] = ['match', ['coalesce', ['get', field], ''], ...Object.entries(matches).flat(), defaultValue];
    return expr as unknown as ExpressionSpecification;
};

/**
 * Build a maplibre `interpolate` expression on zoom — common pattern for
 * scaling icon-size or circle-radius across zoom levels.
 */
export const interpolateByZoom = (
    stops: Array<[number, number]>,
): ExpressionSpecification => {
    const expr: unknown[] = ['interpolate', ['linear'], ['zoom'], ...stops.flat()];
    return expr as unknown as ExpressionSpecification;
};
