'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('is a function', () => {
    expect(typeof chainer).toBe('function');
  });

  it('returns a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('returns the input unchanged for an empty list', () => {
    expect(chainer([])(5)).toBe(5);
  });

  it('applies a single function to the input', () => {
    const double = (x) => x * 2;

    expect(chainer([double])(4)).toBe(8);
  });

  it('applies functions left-to-right', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  it('composes functions as a left fold: chainer([a,b,c,d])(x)', () => {
    const a = (x) => x + 1;
    const b = (x) => x * 3;
    const c = (x) => x - 4;
    const d = (x) => x * x;

    const input = 5;

    expect(chainer([a, b, c, d])(input)).toBe(d(c(b(a(input)))));
  });

  it('calls each function once, in order, chaining results forward', () => {
    const calls = [];
    const a = jest.fn((x) => {
      calls.push('a');

      return x + 1;
    });
    const b = jest.fn((x) => {
      calls.push('b');

      return x * 10;
    });
    const c = jest.fn((x) => {
      calls.push('c');

      return x - 2;
    });

    const result = chainer([a, b, c])(1);

    expect(result).toBe(18);
    expect(calls).toEqual(['a', 'b', 'c']);
    expect(a).toHaveBeenCalledTimes(1);
    expect(a).toHaveBeenCalledWith(1);
    expect(b).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledWith(2);
    expect(c).toHaveBeenCalledTimes(1);
    expect(c).toHaveBeenCalledWith(20);
  });

  it('builds a reusable chain callable with different inputs', () => {
    const addOne = (x) => x + 1;
    const square = (x) => x * x;

    const run = chainer([addOne, square]);

    expect(run(1)).toBe(4);
    expect(run(2)).toBe(9);
    expect(run(-3)).toBe(4);
  });

  it('works with non-numeric values passed through the functions', () => {
    const toUpper = (str) => str.toUpperCase();
    const exclaim = (str) => `${str}!`;

    expect(chainer([toUpper, exclaim])('hello')).toBe('HELLO!');
  });
});
