'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  test('should call functions from 1st to 3d', () => {
    const f1 = jest.fn((x) => {
      return x * 2;
    });
    const f2 = jest.fn((x) => {
      return x + 2;
    });
    const f3 = jest.fn((x) => {
      return x + 2;
    });

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  test('should call functions only one time', () => {
    const f1 = jest.fn((x) => {
      return x * 2;
    });
    const f2 = jest.fn((x) => {
      return x + 2;
    });
    const f3 = jest.fn((x) => {
      return x + 2;
    });

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  test('should return undefined when empty conditions', () => {
    expect(chainer([])(42)).toBe(42)
  });
});
