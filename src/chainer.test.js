'use strict';

describe(`function 'chainer'`, () => {
  const { chainer } = require('./chainer');

  it('should return function', () => {
    const result = chainer();

    expect(result)
      .toBeInstanceOf(Function);
  });

  it('should calls all functions in args', () => {
    const a = jest.fn();
    const b = jest.fn();
    const c = jest.fn();
    const d = jest.fn();

    const result = chainer([a, b, c, d])(5);

    expect(a).toBeCalled();
    expect(b).toBeCalled();
    expect(c).toBeCalled();
    expect(d).toBeCalled();
    expect(result).toBe(undefined);
    expect(result).toBeUndefined();
  });

  it('should return result after funcs chaine', () => {
    function f1(x) {
      return x * 2;
    };

    function f2(x) {
      return x + 2;
    };

    function f3(x) {
      return Math.pow(x, 2);
    };

    const result = chainer([f1, f2, f3])(2);

    expect(result)
      .toBe(36);
  });

  it('should call every callback with'
  + 'correct arguments', () => {
    const a = jest.fn((x) => x + 2);
    const b = jest.fn((x) => x * 2);
    const c = jest.fn((x) => x ** 2);
    const d = jest.fn((x) => x - 10);

    const result = chainer([a, b, c, d])(2);

    expect(result).toBe(54);
    expect(a).toHaveBeenCalledWith(2);
    expect(b).toHaveBeenCalledWith(4);
    expect(c).toHaveBeenCalledWith(8);
    expect(d).toHaveBeenCalledWith(64);
  });
});
