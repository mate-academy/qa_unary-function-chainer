'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  test('should chain functions correctly', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(0)).toBe(4);
    expect(chainedFunction(2)).toBe(36);
  });

  test('should work with an empty array of functions', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(5)).toBe(5);
  });

  test('should work with a single function in the array', () => {
    function f1(x) {
      return x * 3;
    }

    const chainedFunction = chainer([f1]);

    expect(chainedFunction(5)).toBe(15);
  });

  test('should chain a large number of functions', () => {
    function add1(x) {
      return x + 1;
    }

    const functions = Array(100).fill(add1);
    const chainedFunction = chainer(functions);

    expect(chainedFunction(0)).toBe(100);
  });
});
