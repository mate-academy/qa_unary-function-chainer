'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should return the input unchanged if no functions are provided', () => {
    const fn = chainer([]);

    expect(fn(5)).toBe(5);
    expect(fn('test')).toBe('test');
  });

  it('should chain a single function', () => {
    const f1 = x => x * 2;
    const fn = chainer([f1]);

    expect(fn(3)).toBe(6);
  });

  it('should chain multiple functions from left to right', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => x * x;
    const fn = chainer([f1, f2, f3]);

    expect(fn(0)).toBe(4);

    expect(fn(1)).toBe(16);
  });
});
