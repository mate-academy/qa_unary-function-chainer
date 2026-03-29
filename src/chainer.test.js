'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('chains multiple unary functions correctly', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 3;
    const f3 = x => x - 1;

    const chained = chainer([f1, f2, f3]);

    expect(chained(1)).toBe(4); // f1(1) = 2 → f2(2) = 5 → f3(5) = 4
  });

  it('returns the input if no functions provided', () => {
    const identity = chainer([]);

    expect(identity(42)).toBe(42);
  });

  it('works correctly with a single function', () => {
    const square = x => x * x;
    const single = chainer([square]);

    expect(single(5)).toBe(25);
  });

  it('chains functions with Math operations', () => {
    const func = chainer([
      x => x + 1,
      x => Math.pow(x, 2),
      x => x - 5,
    ]);

    expect(func(2)).toBe(4); // (2 + 1)^2 - 5 = 9 - 5 = 4
  });

  it('works with negative numbers', () => {
    const negate = x => -x;
    const double = x => x * 2;
    const chained = chainer([negate, double]);

    expect(chained(3)).toBe(-6); // -3 * 2 = -6
  });
});
