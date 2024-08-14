'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  let addOne, subtractFive, square, functions;

  beforeEach(() => {
    addOne = jest.fn((n) => n + 1);
    subtractFive = jest.fn((n) => n - 5);
    square = jest.fn((n) => n * n);

    functions = [addOne, subtractFive, square];
  });

  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should returns a function when called with an array of functions', () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  it('returns the correct result after applying all functions', () => {
    const result = chainer(functions)(5);

    expect(result).toBe(1);
  });

  it('calls each function exactly once', () => {
    chainer(functions)(5);

    expect(addOne).toHaveBeenCalledTimes(1);
    expect(subtractFive).toHaveBeenCalledTimes(1);
    expect(square).toHaveBeenCalledTimes(1);
  });

  it('returns the input unchanged if provided with an empty array', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });
});
