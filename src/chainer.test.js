'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should chain functions correctly in the specified order', () => {
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

    expect(chainedFunction(0)).toBe(4); // f3(f2(f1(0))) = f3(f2(0)) = f3(2) = 4
    // eslint-disable-next-line max-len
    expect(chainedFunction(1)).toBe(16); // f3(f2(f1(1))) = f3(f2(2)) = f3(4) = 16
    // eslint-disable-next-line max-len
    expect(chainedFunction(2)).toBe(36); // f3(f2(f1(2))) = f3(f2(4)) = f3(6) = 36
  });

  test('should return the same input when no functions are provided', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(5)).toBe(5);
  });

  test('should work with a single function', () => {
    function f1(x) {
      return x + 10;
    }

    const chainedFunction = chainer([f1]);

    expect(chainedFunction(5)).toBe(15);
  });
});
