'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should return a function', () => {
    const chained = chainer([]);

    expect(typeof chained).toBe('function');
  });

  test('should return the initial value when functions array is empty', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
    expect(chained('hello')).toBe('hello');
  });

  test('should work correctly with a single function', () => {
    const double = (x) => x * 2;
    const chained = chainer([double]);

    expect(chained(4)).toBe(8);
  });

  test('should chain multiple functions in left-to-right order', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
    expect(chained(2)).toBe(36);
  });

  test('should work with string transformations', () => {
    const toUpper = (str) => str.toUpperCase();
    const addExclamation = (str) => `${str}!`;
    const repeatTwice = (str) => `${str} ${str}`;

    const chained = chainer([toUpper, addExclamation, repeatTwice]);

    expect(chained('hello')).toBe('HELLO! HELLO!');
  });

  test('should call functions with correct arguments and count', () => {
    const fn1 = jest.fn((x) => x + 1);
    const fn2 = jest.fn((x) => x * 3);

    const chained = chainer([fn1, fn2]);
    const result = chained(2);

    expect(result).toBe(9);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(2);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledWith(3);
  });
});
