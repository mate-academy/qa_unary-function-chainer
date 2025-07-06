'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  function f1(x) {
    return x * 2;
  }

  function f2(x) {
    return x + 2;
  }

  function f3(x) {
    return Math.pow(x, 2);
  }

  test('should chain functions left-to-right', () => {
    const chained = chainer([f1, f2, f3]);

    // Calculation: f3(f2(f1(0))) => f3(f2(0)) => f3(2) => 4
    expect(chained(0)).toBe(4);
  });

  test('should return original value if function list is empty', () => {
    const identity = chainer([]);

    expect(identity(5)).toBe(5);
  });

  test('should handle single function', () => {
    const single = chainer([f1]);

    expect(single(3)).toBe(6);
  });

  test('should chain multiple functions correctly', () => {
    const chained = chainer([f1, f2, f3]);

    // f3(f2(f1(2))) => f3(f2(4)) => f3(6) => 36
    expect(chained(2)).toBe(36);
  });

  test('should work with different unary functions', () => {
    const negate = x => -x;
    const abs = x => Math.abs(x);
    const increment = x => x + 1;

    const chained = chainer([negate, abs, increment]);

    expect(chained(-5)).toBe(6);
  });
});
