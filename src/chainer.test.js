'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should return a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should return the input when no functions are provided', () => {
    const result = chainer([])(10);

    expect(result).toBe(10);
  });

  it('should chain a single function', () => {
    const f1 = (x) => x * 2;
    const result = chainer([f1])(5);

    expect(result).toBe(10);
  });

  it('should chain multiple functions', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it('should handle different input types', () => {
    const f1 = (x) => String(x);
    const f2 = (x) => x + 'abc';
    const result = chainer([f1, f2])(123);

    expect(result).toBe('123abc');
  });

  it('should handle functions that return different types', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => String(x);
    const f3 = (x) => x + 'def';
    const result = chainer([f1, f2, f3])(5);

    expect(result).toBe('10def');
  });

  it('should correctly chain functions in the specified order', () => {
    const f1 = (x) => x + 1;
    const f2 = (x) => x * 3;
    const result1 = chainer([f1, f2])(2);
    const result2 = chainer([f2, f1])(2);

    expect(result1).toBe(9);
    expect(result2).toBe(7);
  });
});
