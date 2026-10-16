import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRenderer, type Json } from './esri';
import type { GLLayer } from './layers';

const obj = (j: Json | undefined): Record<string, Json> =>
    j !== null && typeof j === 'object' && !Array.isArray(j) ? j : {};
const arr = (j: Json | undefined): Json[] => (Array.isArray(j) ? j : []);
const num = (j: Json | undefined): number => (typeof j === 'number' ? j : NaN);

// Esri: a value belongs to the class whose (min, max] holds it, the first class from minValue.
const symbolAt = (renderer: Json, v: number): Json | undefined => {
    const r = obj(renderer);
    return arr(r.classBreakInfos).map(obj).find((c, i) =>
        (i === 0 ? v >= num(r.minValue) : v > num(c.classMinValue)) && v <= num(c.classMaxValue))?.symbol;
};

void test('a value on a class break draws like GL, which puts it above the break', () => {
    const fill: GLLayer = { id: 'f', type: 'fill',
        paint: { 'fill-color': ['step', ['get', 'v'], '#aa0000', -1.5, '#00aa00', 0, '#0000aa'] } };
    const rows = Array.from({ length: 80 }, (_, i) => ({ v: -4 + i * 0.1 })).concat([{ v: -1.5 }, { v: 0 }]);
    const { renderer } = toRenderer([fill], 'polygon', rows, undefined);
    assert.equal(obj(renderer).type, 'classBreaks');
    assert.deepEqual(symbolAt(renderer, -1.5), symbolAt(renderer, -1));
    assert.deepEqual(symbolAt(renderer, 0), symbolAt(renderer, 1));
    assert.notDeepEqual(symbolAt(renderer, -1.6), symbolAt(renderer, -1.5));
});

void test('a size by scale lists its stops in ascending scale', () => {
    const circle: GLLayer = { id: 'c', type: 'circle',
        paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 2, 10, 4, 14, 8] } };
    const size = obj(arr(obj(toRenderer([circle], 'point', [{}], undefined).renderer).visualVariables)[0]);
    assert.equal(size.valueExpression, '$view.scale');
    const stops = arr(size.stops).map(obj);
    const scales = stops.map((s) => num(s.value));
    assert.deepEqual(scales, [...scales].sort((a, b) => a - b));
    assert.ok(num(stops[0]?.size) > num(stops.at(-1)?.size), 'largest at the smallest scale');
});
