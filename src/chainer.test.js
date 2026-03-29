'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  function f1(x) { return x * 2; }
  function f2(x) { return x + 2; }
  function f3(x) { return Math.pow(x, 2); }

  it('should apply functions in left-to-right order', () => {
    const chained = chainer([f1, f2, f3]);
    const result = chained(0);
    expect(result).toBe(4);
  });

  it('should return input if no functions are provided', () => {
    const chained = chainer([]);
    const result = chained(5);
    expect(result).toBe(5);
  });

  it('should work with a single function', () => {
    const chained = chainer([f1]);
    expect(chained(3)).toBe(6);
  });

  it('should correctly chain multiple functions', () => {
    const chained = chainer([f1, f2, f3]);
    const result = chained(1);
    expect(result).toBe(16);
  });

  it('should work with negative input', () => {
    const chained = chainer([f2, f1]);
    expect(chained(-3)).toBe(-2);
  });
});
