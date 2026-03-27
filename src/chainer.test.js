'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  it(`calls functions in correct order with correct argument`, () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    const fn = chainer([f1, f2, f3]);

    const result = fn(5);

    expect(result).toBe(144);
    
    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(10);
    expect(f3).toHaveBeenCalledWith(12);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('returns input unchanged when no functions provided', () => {
    const fn = chainer([]);
    expect(fn(42)).toBe(42);
  });

  it(`works with a single function`, () => {
    const f1 = jest.fn(x => x + 2);

    const fn = chainer([f1]);

    const result = fn(5);

    expect(result).toBe(7);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(5);
  })
});