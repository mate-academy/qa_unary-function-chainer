'use strict';

describe('unary_function', () => {
  const { chainer } = require('./chainer');

  it('first callback should be called with correct value', () => {
    function f2(x) {
      return x + 2;
    };

    function f3(x) {
      return Math.pow(x, 2);
    };

    const f1 = jest.fn();

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f1).toHaveBeenCalledTimes(1);
  });

  it('second callback should be called with correct value', () => {
    function f1(x) {
      return x * 2;
    };

    function f3(x) {
      return Math.pow(x, 2);
    };

    const f2 = jest.fn();

    chainer([f1, f2, f3])(0);

    expect(f2).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledTimes(1);
  });

  it('third callback should be called with correct value', () => {
    function f1(x) {
      return x * 2;
    };

    function f2(x) {
      return x + 2;
    };

    const f3 = jest.fn();

    chainer([f1, f2, f3])(0);

    expect(f3).toHaveBeenCalledWith(2);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it(`'chainer' function should return correct value`, () => {
    function f1(x) {
      return x * 2;
    };

    function f2(x) {
      return x + 2;
    };

    function f3(x) {
      return Math.pow(x, 2);
    };

    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });
});
