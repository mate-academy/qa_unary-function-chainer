'use strict'

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should call methods', () => {
    const fn = jest.fn((x) => x);

    chainer([fn])(0);
    expect(fn).toHaveBeenCalled();
  });

  it('should pass arguments', () => {
    const fn = jest.fn((x) => x);
    const args = [0, 1, 2];

    chainer([fn])(args);
    expect(fn).toHaveBeenCalledWith(args);
  });

  it('should chain methods together', () => {
    const val = 0;
    const arr = [
      jest.fn((x) => x * 2),
      jest.fn((x) => x + 2),
      jest.fn((x) => Math.pow(x, 2)),
    ];

    const result = chainer(arr)(val);

    expect(arr[0]).toHaveBeenCalledWith(val);
    expect(arr[1]).toHaveBeenCalledWith(arr[0](val));
    expect(arr[2]).toHaveBeenCalledWith(arr[1](arr[0](val)));
    expect(result).toBe(4); // ((0 * 2) + 2) ^ 2 = 4
  });
});
