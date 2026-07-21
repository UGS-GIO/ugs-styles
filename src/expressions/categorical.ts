import type { ExpressionSpecification } from 'maplibre-gl';

/**
 * Map a feature property's string value to a color (or any string) via a
 * palette object, falling back to `defaultValue` when the value is missing or
 * not in the palette.
 *
 * Built as a fixed-arity object lookup (`get <value> from a literal palette`)
 * rather than a variadic `match`: the lookup form is fully type-checkable, so
 * this stays cast-free. Behaviour matches `match` for string→string maps.
 */
export const matchByField = (
    field: string,
    matches: Record<string, string>,
    defaultValue: string,
): ExpressionSpecification => matchByValue(['coalesce', ['get', field], ''], matches, defaultValue);

/**
 * As `matchByField`, but keyed on an arbitrary expression instead of a raw
 * property — for when the lookup key is derived (normalized case, blank folded
 * to an explicit category, two columns coalesced) rather than stored.
 */
export const matchByValue = (
    value: ExpressionSpecification,
    matches: Record<string, string>,
    defaultValue: string,
): ExpressionSpecification => [
    'coalesce',
    ['get', value, ['literal', matches]],
    defaultValue,
];

/**
 * Build a maplibre `interpolate` expression on zoom — common pattern for
 * scaling icon-size or circle-radius across zoom levels.
 */
export const interpolateByZoom = (
    stops: Array<[number, number]>,
): ExpressionSpecification => ['interpolate', ['linear'], ['zoom'], ...stops.flat()];
