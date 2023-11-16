'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return input argument if an empty array of functions', () => {
    const result = chainer([])(2);

    expect(result).toEqual(2);
  });

  it('should return error if nothing was passed to chainer', () => {
    const result = chainer();

    expect(result).toThrow();
  });

  it('should return result a single function in the array', () => {
    const func1 = jest.fn(x => x * 2);

    const result = chainer([func1])(5);

    expect(func1).toHaveBeenCalledWith(5);

    expect(result).toEqual(10);
  });

  it('should return chain functions result', () => {
    const func1 = jest.fn(x => x * 2);
    const func2 = jest.fn(x => x + 2);
    const func3 = jest.fn(x => Math.pow(x, 2));
    const result = chainer([func1, func2, func3])(1);

    expect(func1).toHaveBeenCalledWith(1);
    expect(func2).toHaveBeenCalledWith(2);
    expect(func3).toHaveBeenCalledWith(4);

    expect(result).toEqual(16);
  });
});
