'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared ', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer([])).toEqual(expect.any(Function));
  });
  it('should apply functions from left to right', () => {
    const input = 5;
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);
    const chained = chainer([f1, f2, f3]);
    expect(chained(input)).toBe(144);
  });

  it('should handle an empty array of functions', () => {
    const input = 10;
    const chained = chainer([]);
    expect(chained(input)).toBe(input);
  });

  it('should work with a single function', () => {
    const input = 4;
    const f = (x) => x * 3;
    const chained = chainer([f]);
    expect(chained(input)).toBe(12);
  });

  it('should work with non-numeric values', () => {
    const input = 'hello';
    const f1 = (x) => x.toUpperCase();
    const f2 = (x) => `${x} WORLD`;
    const chained = chainer([f1, f2]);
    expect(chained(input)).toBe('HELLO WORLD');
  });
});
