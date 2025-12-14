'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it(`should call first function in arg array with input like arg`, () => {
    const f = jest.fn();

    chainer([f])(8);
    expect(f).toHaveBeenCalledWith(8);
  });

  it(`should call second function in arg array
     with first fnction in this array like arg`, () => {
    const f = jest.fn();
    const f2 = jest.fn();

    chainer([f, f2])(8);
    expect(f).toHaveBeenCalledWith(8);
    expect(f2).toHaveBeenCalledWith(f(8));
  });

  it('should return define value with real call', () => {
    const f1 = jest.fn((x) => {
      return x * 2;
    });

    const f2 = jest.fn((x) => {
      return x + 2;
    });

    const f3 = jest.fn((x) => {
      return Math.pow(x, 2);
    });

    const result = chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(f1(0));
    expect(f3).toHaveBeenCalledWith(f2(f1(0)));
    expect(result).toBe(4);
  });
});
