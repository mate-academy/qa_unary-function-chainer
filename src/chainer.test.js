'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer)
      .toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer())
      .toBeInstanceOf(Function);
  });

  it('should call a function with the input passed into brackets', () => {
    const func = jest.fn((x) => x * 2);

    chainer([func])(2);

    expect(func)
      .toHaveBeenCalledWith(2);
  });

  it('should call all functions with proper values', () => {
    const func1 = jest.fn((x) => x * 2);
    const func2 = jest.fn((x) => x + 2);
    const func3 = jest.fn((x) => Math.pow(x, 2));

    chainer([func1, func2, func3])(2);

    expect(func1)
      .toHaveBeenCalledWith(2);

    expect(func2)
      .toHaveBeenCalledWith(4);

    expect(func3)
      .toHaveBeenCalledWith(6);
  });

  it('should return correct result', () => {
    const func1 = jest.fn((x) => x * 2);
    const func2 = jest.fn((x) => x + 2);
    const func3 = jest.fn((x) => Math.pow(x, 2));

    expect(chainer([func1, func2, func3])(2))
      .toBe(36);
  });

  it('should return undefined if nothing was passed', () => {
    expect(chainer([])())
      .toBeUndefined();
  });
});
