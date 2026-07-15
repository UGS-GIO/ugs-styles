/**
 * Deterministic shade generator: given a group's base colour, produce N distinct shades
 * (same hue, varied lightness). Used to give each specific box_type token its own shade of the
 * group's colour. Pure + order-stable — the i-th shade is always the same for a given (base, n, i),
 * so callers MUST pass tokens in a FIXED order (not by feature count) to keep a token's shade
 * stable as data changes. Darkest → lightest.
 */

type Hsl = { h: number; s: number; l: number };

const hexToHsl = (hex: string): Hsl => {
    const m = hex.replace('#', '');
    const r = parseInt(m.slice(0, 2), 16) / 255;
    const g = parseInt(m.slice(2, 4), 16) / 255;
    const b = parseInt(m.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const d = max - min;
    if (d === 0) return { h: 0, s: 0, l };
    const s = d / (1 - Math.abs(2 * l - 1));
    let h: number;
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
    return { h, s, l };
};

const hslToHex = ({ h, s, l }: Hsl): string => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const mm = l - c / 2;
    const [r, g, b] =
        h < 60 ? [c, x, 0] :
        h < 120 ? [x, c, 0] :
        h < 180 ? [0, c, x] :
        h < 240 ? [0, x, c] :
        h < 300 ? [x, 0, c] :
        [c, 0, x];
    const to = (v: number) => Math.round((v + mm) * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${to(r)}${to(g)}${to(b)}`;
};

/** N shades of `baseHex` (same hue), darkest → lightest. `n <= 1` returns just the base. */
export const shades = (baseHex: string, n: number): string[] => {
    if (n <= 1) return [baseHex];
    const { h, s, l } = hexToHsl(baseHex);
    const lo = Math.max(0.18, l - 0.22), hi = Math.min(0.82, l + 0.22);
    return Array.from({ length: n }, (_, i) => hslToHex({ h, s, l: lo + (hi - lo) * (i / (n - 1)) }));
};
