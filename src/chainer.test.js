'use strict';

describe('chainer function', () => {
  const { chainer } = require('./chainer');
  let f1, f2, f3;

  beforeEach(() => {
    f1 = jest.fn((x) => x * 2);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => Math.pow(x, 2));
  });

  it('should return a function', () => {
    expect(chainer([f1, f2, f3])).toBeInstanceOf(Function);
  });

  it('should call all callbacks', () => {
    chainer([f1, f2, f3])(1);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should correctly chain functions', () => {
    const chainerFunction = chainer([f1, f2, f3]);

    expect(chainerFunction(0)).toBe(4);
    expect(chainerFunction(1)).toBe(16);
    expect(chainerFunction(2)).toBe(36);
  });
});
