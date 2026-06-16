// Library surface (palettes + expression helpers + archetypes). Styles themselves are NOT
// exported here — they're CDN JSON artifacts (dist-json/), discovered via STAC, not npm imports.
export * from './palettes';
export * from './expressions/categorical';
export * from './archetypes';
export type { Binding, Geom, StyleLayer, StyleSpec } from './types';
