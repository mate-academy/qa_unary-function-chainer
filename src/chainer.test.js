'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer)
      .toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer())
      .toBeInstanceOf(Function);
  });

  it('should call a function with the input argument in the brackets', () => {
    const f = jest.fn(x => x * 2);

    chainer([f])(5);

    expect(f)
      .toHaveBeenCalledWith(5);
  });

  it('should call all functions from an array in special order', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    chainer([f1, f2, f3])(1);

    expect(f1)
      .toHaveBeenCalledWith(1);

    expect(f2)
      .toHaveBeenCalledWith(2);

    expect(f3)
      .toHaveBeenCalledWith(4);
  });

  it('should return correct result', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(1);

    expect(result)
      .toBe(16);
  });

  it('should return input argument if no function was passed', () => {
    expect(chainer([])(2))
      .toBe(2);
  });

  it('should return undefined if nothing was passed', () => {
    expect(chainer([])())
      .toBeUndefined();
  });
});
