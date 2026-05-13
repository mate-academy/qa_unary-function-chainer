'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should return function', () => {
    const f1 = (x) => {
      return x * 2;
    };
    const f2 = (x) => {
      return x + 2;
    };
    const f3 = (x) => {
      return Math.pow(x, 2);
    };

    const result = chainer([f1, f2, f3]);

    expect(typeof result).toBe('function');
  });

  it('should chain functions from left to right', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(4);

    expect(f1).toHaveBeenCalledWith(4);
    expect(f2).toHaveBeenCalledWith(8);
    expect(f3).toHaveBeenCalledWith(10);

    expect(result).toBe(100);
  });

  it('should call functions once', () => {
    const f1 = jest.fn((x) => x);
    const f2 = jest.fn((x) => x);
    const f3 = jest.fn((x) => x);

    chainer([f1, f2, f3])(1);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should return input if function list is empty', () => {
    const result = chainer([])(4);

    expect(result).toBe(4);
  });
});
