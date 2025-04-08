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

  test('should apply all functions in order (example test)', () => {
    const chain = chainer([f1, f2, f3]);

    expect(chain(0)).toBe(4); // f1(0) → 0, f2(0) → 2, f3(2) → 4
  });

  test('should return the same value if functions array is empty', () => {
    const chain = chainer([]);

    expect(chain(5)).toBe(5);
  });

  test('should apply a single function', () => {
    const chain = chainer([f1]);

    expect(chain(3)).toBe(6); // f1(3) → 6
  });

  test('should correctly apply multiple functions', () => {
    const chain = chainer([f1, f2, f1]); // f1(2) → 4, f2(4) → 6, f1(6) → 12

    expect(chain(2)).toBe(12);
  });

  test('should handle negative numbers', () => {
    const chain = chainer([f2, f3]); // f2(-3) → -1, f3(-1) → 1

    expect(chain(-3)).toBe(1);
  });
});
