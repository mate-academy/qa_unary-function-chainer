'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  it('should chain multiple unary functions correctly', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it('should chain a single unary function correctly', () => {
    const f1 = (x) => x * 3;

    const result = chainer([f1])(2);

    expect(result).toBe(6);
  });

  it('should handle zero functions (identity function)', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  it('should chain two unary functions correctly', () => {
    const f1 = (x) => x + 1;
    const f2 = (x) => x * 2;

    const result = chainer([f1, f2])(3);

    expect(result).toBe(8);
  });

  it('should work with functions that return non-numerical values', () => {
    const f1 = (x) => x.toUpperCase();
    const f2 = (x) => x + ' World';

    const result = chainer([f1, f2])('hello');

    expect(result).toBe('HELLO World');
  });

  it('should return the correct value when no transformation is needed', () => {
    const f1 = (x) => x;

    const result = chainer([f1, f1, f1])(7);

    expect(result).toBe(7);
  });
});
