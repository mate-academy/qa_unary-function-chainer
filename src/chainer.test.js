'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should be declared as a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  test('should return a function', () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  test('should return the input when the function list is empty', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  test('should apply a single function to the input', () => {
    const double = (x) => x * 2;

    expect(chainer([double])(3)).toBe(6);
  });

  test('should apply functions from left to right', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  test('should pass each result to the next function', () => {
    const addOne = jest.fn((x) => x + 1);
    const double = jest.fn((x) => x * 2);

    expect(chainer([addOne, double])(3)).toBe(8);

    expect(addOne).toHaveBeenCalledWith(3);
    expect(double).toHaveBeenCalledWith(4);
  });
});
