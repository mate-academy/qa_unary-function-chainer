'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  function f1(x) {
    return x * 2;
  };

  function f2(x) {
    return x + 2;
  };

  function f3(x) {
    return Math.pow(x, 2);
  };

  it('should apply functions from right to left', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(1)).toBe(16);
  });

  it('should return default value, if functions is empty', () => {
    const chained = chainer([]);

    expect(chained(4)).toBe(4);
  });

  it('should work correctly with a only one function', () => {
    const chained = chainer([f3]);

    expect(chained(3)).toBe(9);
  });
});
