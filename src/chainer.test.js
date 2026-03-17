'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('should return identity function when given an empty array', () => {
    const identity = chainer([]);

    expect(identity(5)).toBe(5);
    expect(identity('test')).toBe('test');
  });

  it('should chain a single function correctly', () => {
    const double = x => x * 2;
    const chainedFunction = chainer([double]);

    expect(chainedFunction(3)).toBe(6);
    expect(chainedFunction(0)).toBe(0);
  });

  it('should chain multiple functions correctly', () => {
    const double = x => x * 2;
    const addTwo = x => x + 2;
    const square = x => x ** 2;
    const chainedFunction = chainer([double, addTwo, square]);

    expect(chainedFunction(3)).toBe(64);
    expect(chainedFunction(0)).toBe(4);
  });

  it('should handle functions that return different types', () => {
    const length = x => x.length;
    const isEven = x => x % 2 === 0;
    const chainedFunction = chainer([toString, length, isEven]);

    expect(chainedFunction(123)).toBe(true);
    expect(chainedFunction(1234)).toBe(true);
  });

  it('should handle large number of functions', () => {
    const functions = Array(100).fill(x => x + 1);
    const chainedFunction = chainer(functions);

    expect(chainedFunction(0)).toBe(100);
  });

  it('should handle functions with side effects', () => {
    const spy = jest.fn();
    const sideEffect = x => {
      spy(x);

      return x;
    };
    const double = x => x * 2;
    const chainedFunction = chainer([sideEffect, double, sideEffect]);

    expect(chainedFunction(3)).toBe(6);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, 3);
    expect(spy).toHaveBeenNthCalledWith(2, 6);
  });

  it('should throw an error if any chained function throws', () => {
    const throwError = () => {
      throw new Error('Test error');
    };
    const chainedFunction = chainer([x => x + 1, throwError, x => x * 2]);

    expect(() => chainedFunction(1)).toThrow('Test error');
  });
});
