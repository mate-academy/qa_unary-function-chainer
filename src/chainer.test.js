'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should correctly chain multiple functions', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(0)).toBe(4); // f1(0) → f2(0) → f3(0) = 4
    expect(chainedFunction(1)).toBe(16); // f1(1) → 2, f2(2) → 4, f3(4) → 16
  });

  it('should return the input if no functions are provided', () => {
    const identityFunction = chainer([]);

    expect(identityFunction(42)).toBe(42); // No transformation
  });

  it('should handle a single function', () => {
    const f1 = x => x * 3;
    const singleFunction = chainer([f1]);

    expect(singleFunction(5)).toBe(15); // f1(5) = 15
  });

  it('should correctly apply functions in order', () => {
    const f1 = x => x - 1;
    const f2 = x => x * 10;
    const f3 = x => x + 3;

    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(5)).toBe(43); // f1(5) → f2(4) → f3(40) = 43
  });
});
