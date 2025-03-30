'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return the same value if no functions are provided', () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42);
  });

  it('should apply a single function', () => {
    const double = (x) => x * 2;
    const chained = chainer([double]);

    expect(chained(3)).toBe(6);
  });

  it('should apply multiple functions in order', () => {
    const addOne = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const chained = chainer([addOne, double, square]);

    expect(chained(3)).toBe(64);
  });

  it('should work with identity function', () => {
    const identity = (x) => x;
    const chained = chainer([identity, identity, identity]);

    expect(chained(10)).toBe(10);
  });
});
