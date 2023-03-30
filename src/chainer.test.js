'use strict';

const { chainer } = require('./chainer');

describe(`function 'chainer'`, () => {
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
});
