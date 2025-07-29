'use strict';
// @ts-check
/// <reference types="jest" />

describe('chainer', () => {
  const { chainer } = require('./chainer');

  let increment, decrement, pow2;

  beforeEach(() => {
    increment = jest.fn((x) => x + 1);
    decrement = jest.fn((x) => x - 1);
    pow2 = jest.fn((x) => x ** 2);
  });

  it('should return correct value', () => {
    const result = chainer([increment, decrement, pow2])(2);

    expect(result).toBe(4);
  });

  it('should functions to have been called only once', () => {
    chainer([increment, decrement, pow2])(1);

    expect(increment).toHaveBeenCalledTimes(1);
    expect(decrement).toHaveBeenCalledTimes(1);
    expect(pow2).toHaveBeenCalledTimes(1);
  });

  it('should return input when no functions are provided', () => {
    const result = chainer([])(1);

    expect(result).toBe(1);
  });

  it('should apply a single function correctly', () => {
    const double = jest.fn((x) => x * 2);
    const result = chainer([double])(3);

    expect(result).toBe(6);
    expect(double).toHaveBeenCalledTimes(1);
    expect(double).toHaveBeenCalledWith(3);
  });

  it('should propagate undefined if a function returns undefined', () => {
    const noop = jest.fn(() => {});
    const double = jest.fn((x) => x * 2);

    const result = chainer([noop, double])(4);

    expect(result).toBeNaN();
  });
});
