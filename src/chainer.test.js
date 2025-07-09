'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  function f1(x) {
    return x * 2;
  }

  function f2(x) {
    return x + 2;
  }

  function f3(x) {
    return Math.pow(x, 2);
  }

  it('should chain multiple functions correctly', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  it('should return the same value if no functions provided', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
  });

  it('should work with one function', () => {
    const chained = chainer([f1]);

    expect(chained(3)).toBe(6);
  });

  it('should work with identity function', () => {
    const identity = (x) => x;
    const chained = chainer([identity, identity]);

    expect(chained(10)).toBe(10);
  });

  it('should chain functions with negative numbers', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(-2)).toBe(4);
  });

  it('should chain functions that return different types', () => {
    const toStr = (x) => x.toString();
    const append = (x) => x + '!';
    const chained = chainer([toStr, append]);

    expect(chained(5)).toBe('5!');
  });
});
