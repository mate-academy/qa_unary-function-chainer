'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const double = (x) => x * 2;
  const addTwo = (x) => x + 2;
  const square = (x) => x ** 2;

  it('should return a function', () => {
    expect(typeof chainer([double])).toBe('function');
  });

  it('should chain functions left to right (example from the task)', () => {
    expect(chainer([double, addTwo, square])(0)).toBe(4);
  });

  it('should apply a single function to the input', () => {
    expect(chainer([double])(5)).toBe(10);
  });

  it('should return the input unchanged for an empty list of functions', () => {
    expect(chainer([])(42)).toBe(42);
  });

  it('should keep the order of applying functions (left fold)', () => {
    const subtractOne = (x) => x - 1;
    const triple = (x) => x * 3;

    // (10 - 1) * 3 = 27
    expect(chainer([subtractOne, triple])(10)).toBe(27);
    // (10 * 3) - 1 = 29
    expect(chainer([triple, subtractOne])(10)).toBe(29);
  });

  it('should pass the result of each function to the next one', () => {
    const first = jest.fn((x) => x + 1);
    const second = jest.fn((x) => x * 10);

    const result = chainer([first, second])(1);

    expect(first).toHaveBeenCalledWith(1);
    expect(second).toHaveBeenCalledWith(2);
    expect(result).toBe(20);
  });

  it('should call each function exactly once', () => {
    const first = jest.fn((x) => x);
    const second = jest.fn((x) => x);
    const third = jest.fn((x) => x);

    chainer([first, second, third])(0);

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
    expect(third).toHaveBeenCalledTimes(1);
  });

  it('should reuse the chained function for different inputs', () => {
    const chained = chainer([double, addTwo]);

    expect(chained(1)).toBe(4);
    expect(chained(10)).toBe(22);
  });

  it('should work with non-numeric values', () => {
    const toUpperCase = (str) => str.toUpperCase();
    const exclaim = (str) => `${str}!`;

    expect(chainer([toUpperCase, exclaim])('hello')).toBe('HELLO!');
  });
});
