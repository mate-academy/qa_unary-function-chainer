'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should correctly chain functions together', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4); // f1(0) = 0, f2(0) = 2, f3(2) = 4
    expect(chained(1)).toBe(16); // f1(1) = 2, f2(2) = 4, f3(4) = 16
  });

  it('should handle an empty list of functions', () => {
    const chained = chainer([]);

    // eslint-disable-next-line max-len
    expect(chained(5)).toBe(5); // If no functions, result should be the input itself
  });

  it('should correctly apply a single function', () => {
    function f1(x) {
      return x + 3;
    }

    const chained = chainer([f1]);

    expect(chained(2)).toBe(5); // f1(2) = 5
  });
});
