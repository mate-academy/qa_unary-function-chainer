'use strict';

describe('unary_function', () => {
  const { chainer } = require('./chainer');

  test('the first callback should be called with correct value', () => {
    function f2(x) {
      return x + 2;
    };

    function f3(x) {
      return Math.pow(x, 2);
    };

    const f = jest.fn();

    chainer([f, f2, f3])(0);

    expect(f).toHaveBeenCalledWith(0);
    expect(f).toHaveBeenCalledTimes(1);
  });

  test('the second callback should be called with correct value', () => {
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

  test('the third callback should be called with correct value', () => {
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

  test('"chainer" should return correct value', () => {
    function f1(x) {
      return x * 2;
    };

    function f2(x) {
      return x + 2;
    };

    function f3(x) {
      return Math.pow(x, 2);
    };

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });
});
