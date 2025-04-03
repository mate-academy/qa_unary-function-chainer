'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  function f1(x) {
    return x * 2;
  }

  function f2(x) {
    return x + 2;
  }

  function f3(x) {
    return Math.pow(x, 2);
  }

  it('should return a function', () => {
    expect(typeof chainer([f1, f2, f3])).toBe('function');
  });

  it('should apply functions in right-to-left order', () => {
    expect(chainer([f1, f2, f3])(2)).toBe(36);

    expect(chainer([f3, f2, f1])(2)).toBe(12);
  });

  it('should work with a single function', () => {
    expect(chainer([f1])(5)).toBe(10);
  });

  it('should work with an empty function list', () => {
    expect(chainer([])(10)).toBe(10);
  });
});
