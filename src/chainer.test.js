'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('returns a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('applies a single function to the input', () => {
    const double = x => x * 2;

    const chained = chainer([double]);

    expect(chained(3)).toBe(6);
  });

  it('applies functions from left to right', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  it('returns the input unchanged when no functions are provided', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
  });

  it('works correctly with negative numbers', () => {
    const addOne = x => x + 1;
    const square = x => x * x;

    const chained = chainer([addOne, square]);

    expect(chained(-2)).toBe(1);
  });

  it('works with non-numeric values when functions are compatible', () => {
    const toUpper = str => str.toUpperCase();
    const addExclamation = str => `${str}!`;

    const chained = chainer([toUpper, addExclamation]);

    expect(chained('hello')).toBe('HELLO!');
  });
});
