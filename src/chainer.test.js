'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should return a function', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction).toBeInstanceOf(Function);
  });

  test('should chain functions from left to right', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => x ** 2;

    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(0)).toBe(4);
  });

  test('should pass the result of each function to the next function', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => x - 2);

    const chainedFunction = chainer([f1, f2, f3]);
    const result = chainedFunction(4);

    expect(f1).toHaveBeenCalledWith(4);
    expect(f2).toHaveBeenCalledWith(5);
    expect(f3).toHaveBeenCalledWith(15);
    expect(result).toBe(13);
  });

  test('should return the initial value for an empty functions array', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(10)).toBe(10);
  });

  test('should work with one function', () => {
    const double = (x) => x * 2;

    const chainedFunction = chainer([double]);

    expect(chainedFunction(5)).toBe(10);
  });

  test('should not call functions', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);

    const chainedFunction = chainer([f1, f2]);

    expect(f1).not.toHaveBeenCalled();
    expect(f2).not.toHaveBeenCalled();

    chainedFunction(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
  });
});
