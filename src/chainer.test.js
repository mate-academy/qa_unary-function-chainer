'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function that applies all functions in sequence', () => {
    const add1 = (x) => x + 1;
    const multiply2 = (x) => x * 2;
    const subtract3 = (x) => x - 3;

    const chainedFunction = chainer([add1, multiply2, subtract3]);

    expect(chainedFunction(5)).toBe(9);
  });

  it('should handle an empty array of functions', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(10)).toBe(10);
  });

  it('should handle a single function', () => {
    const add5 = (x) => x + 5;
    const chainedFunction = chainer([add5]);

    expect(chainedFunction(10)).toBe(15);
  });
});
