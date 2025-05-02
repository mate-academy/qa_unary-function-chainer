'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should chain unary functions correctly (basic)', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const fn = chainer([f1, f2, f3]);

    expect(fn(0)).toBe(4);
    expect(fn(1)).toBe(16);
  });

  test('should return input unchanged if no functions provided', () => {
    const fn = chainer([]);

    expect(fn(42)).toBe(42);
  });

  test('should handle single function', () => {
    const fn = chainer([Math.sqrt]);

    expect(fn(9)).toBe(3);
  });

  test('should handle multiple identity functions', () => {
    const identity = x => x;
    const fn = chainer([identity, identity, identity]);

    expect(fn(123)).toBe(123);
  });

  test('should work with negative numbers', () => {
    const negate = x => -x;
    const abs = x => Math.abs(x);
    const fn = chainer([negate, abs]);

    expect(fn(5)).toBe(5);
  });
});
