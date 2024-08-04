'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should chain all functions correctly', () => {
    const mockAddOne = jest.fn(x => x + 1);
    const mockDouble = jest.fn(x => x * 2);
    const mockSquare = jest.fn(x => x * x);

    const functions = [mockAddOne, mockDouble, mockSquare];
    const chainedFunction = chainer(functions);

    chainedFunction(3);

    expect(mockAddOne).toHaveBeenCalledWith(3);
    expect(mockDouble).toHaveBeenCalledWith(4);
    expect(mockSquare).toHaveBeenCalledWith(8);
  });

  it('should return correct result', () => {
    const functions = [
      (x) => x + 1,
      (x) => x * 2,
      (x) => x * x,
    ];

    expect(chainer(functions)(2)).toBe(36);
  });

  it('should handle an empty array of functions', () => {
    expect(chainer([])(5)).toBe(5);
  });

  it('should handle a single function', () => {
    const functions = [(x) => x * 3];

    expect(chainer(functions)(3)).toBe(9);
  });

  it('should work with different types of functions', () => {
    const functions = [
      (x) => x.toString(),
      (x) => x + '!',
      (x) => x.toUpperCase(),
    ];

    expect(chainer(functions)(5)).toBe('5!');
  });

  it('should handle functions that return non-number values', () => {
    const functions = [
      (x) => x.toString(),
      (x) => parseInt(x) + 2,
      (x) => x * x,
    ];

    expect(chainer(functions)(2)).toBe(16);
  });
});
