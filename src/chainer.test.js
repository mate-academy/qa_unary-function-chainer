'use strict';

const { chainer } = require('./chainer');

function f1(x) {
  return x * 2;
}

function f2(x) {
  return x + 2;
}

function f3(x) {
  return Math.pow(x, 2);
}

describe('chainer', () => {
  test('applies a single function', () => {
    const chained = chainer([f1]);

    expect(chained(3)).toBe(6);
  });

  test('chains two functions correctly', () => {
    const chained = chainer([f1, f2]); // x * 2 + 2

    expect(chained(3)).toBe(8); // (3 * 2) + 2 = 8
  });

  test('chains three functions correctly', () => {
    const chained = chainer([f1, f2, f3]); // ((x * 2) + 2) ** 2

    expect(chained(0)).toBe(4); // (0 * 2 + 2)^2 = 4
  });

  test('works with no functions (identity)', () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42); // input should be returned unchanged
  });

  test('handles negative numbers', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(-1)).toBe(0); // (-1 * 2 + 2)^2 = 0^2 = 0
  });

  test('handles different function behavior', () => {
    const negate = (x) => -x;
    const increment = (x) => x + 1;
    const square = (x) => x * x;

    const chained = chainer([negate, increment, square]);

    expect(chained(2)).toBe(1); // -2 + 1 = -1, -1^2 = 1
  });
});
