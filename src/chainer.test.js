'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should apply functions from left to right', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => x ** 2);

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
  });

  test('should work with a single function', () => {
    const fn = jest.fn((x) => x + 5);

    const result = chainer([fn])(10);

    expect(result).toBe(15);
    expect(fn).toHaveBeenCalledWith(10);
  });

  test('should return input if functions array is empty', () => {
    const result = chainer([])(7);

    expect(result).toBe(7);
  });

  test('should pass result of previous function to the next', () => {
    const add = jest.fn((x) => x + 1);
    const multiply = jest.fn((x) => x * 3);

    const result = chainer([add, multiply])(2);

    expect(result).toBe(9);

    expect(add).toHaveBeenCalledWith(2);
    expect(multiply).toHaveBeenCalledWith(3);
  });
});
