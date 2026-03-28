'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const f1 = x => x * 2;
  const f2 = x => x + 3;
  const f3 = x => x * x;

  it('should return a function', () => {
    const result = chainer([f1, f2]);

    expect(typeof result).toBe('function');
  });

  it('should return correct result with one function', () => {
    const result = chainer([f1])(5); // 5 * 2 = 10

    expect(result).toBe(10);
  });

  it('should apply multiple functions in order (left to right)', () => {
    const chained = chainer([f1, f2, f3]); // ((x * 2) + 3)^2

    expect(chained(1)).toBe(25); // (1*2 + 3)^2 = 5^2 = 25
    expect(chained(0)).toBe(9); // (0*2 + 3)^2 = 3^2 = 9
  });

  it('should return the same value if no functions are provided', () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42);
  });

  it('should work with identity function', () => {
    const id = x => x;
    const chained = chainer([id, id, id]);

    expect(chained(99)).toBe(99);
  });
});
