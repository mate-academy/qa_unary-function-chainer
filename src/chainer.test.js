'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const chained = chainer([]);

    expect(typeof chained).toBe('function');
  });

  it('should apply a single function', () => {
    const f = jest.fn(x => x + 1);
    const chained = chainer([f]);
    const result = chained(2);

    expect(result).toBe(3);
    expect(f).toHaveBeenCalledWith(2);
  });

  it('should chain multiple functions in correct order', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 3;
    const f3 = x => x - 1;
    const chained = chainer([f1, f2, f3]);

    const result = chained(5);

    expect(result).toBe(12);
  });

  it('should handle empty function array', () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42);
  });

  it('should call all functions exactly once', () => {
    const f1 = jest.fn(x => x + 1);
    const f2 = jest.fn(x => x * 2);
    const f3 = jest.fn(x => x - 3);
    const chained = chainer([f1, f2, f3]);

    chained(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });
});
