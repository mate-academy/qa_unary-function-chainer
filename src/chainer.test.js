'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should correctly chain and apply the given unary functions', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const composedFunction = chainer([f1, f2, f3]);

    expect(composedFunction(0)).toBe(4);
    expect(composedFunction(2)).toBe(36);
    expect(composedFunction(5)).toBe(144);
    expect(f1).toHaveBeenCalledTimes(3);
  });

  it('should return the input when given an empty array of functions', () => {
    const f1 = jest.fn((x) => x * 2);
    const composedFunction = chainer([]);

    expect(composedFunction(10)).toBe(10);
    expect(f1).not.toHaveBeenCalled();
  });

  it('should correctly handle multiple calls with the same input', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);

    const spyF1 = jest.fn(f1);
    const spyF2 = jest.fn(f2);

    const composedFunction = chainer([spyF1, spyF2]);

    expect(composedFunction(5)).toBe(12);
    expect(spyF1).toHaveBeenCalledTimes(1);
    expect(spyF2).toHaveBeenCalledTimes(1);

    expect(composedFunction(5)).toBe(12);
    expect(spyF1).toHaveBeenCalledTimes(2);
    expect(spyF2).toHaveBeenCalledTimes(2);
  });
});
