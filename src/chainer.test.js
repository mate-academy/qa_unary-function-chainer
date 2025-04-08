'use strict';

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
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(val);

    expect(f1).toHaveBeenCalledWith(val);
    expect(f2).toHaveBeenCalledWith(f1(val));
    expect(f3).toHaveBeenCalledWith(f2(f1(val)));
    expect(result).toBe(f3(f2(f1(val))));
  });
});
