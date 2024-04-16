'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return function', () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  it(`should chain all functions`, () => {
    const mockAddOne = jest.fn(x => x + 1);
    const mockDouble = jest.fn(x => x * 2);
    const mockSquare = jest.fn(x => x * x);

    const functions = [
      mockAddOne,
      mockDouble,
      mockSquare,
    ];

    chainer(functions)(3);

    expect(mockAddOne)
      .toHaveBeenCalledWith(3);

    expect(mockDouble)
      .toHaveBeenCalledWith(4);

    expect(mockSquare)
      .toHaveBeenCalledWith(8);
  });

  it(`should apply each function from array to the input`, () => {
    const functions = [
      (x) => x + 1,
      (x) => x * 2,
      (x) => x * x,
    ];

    expect(chainer(functions)(2))
      .toBe(36);
  });

  it(`should handle negative input`, () => {
    const functions = [
      (x) => x + 1,
      (x) => x * 2,
      (x) => x * x,
    ];

    expect(chainer(functions)(-3))
      .toBe(16);
  });

  it(`should handle 'undefined' input`, () => {
    const functions = [
      (x) => x + 1,
      (x) => x * 2,
      (x) => x * x,
    ];

    expect(chainer(functions)(undefined))
      .toBe(NaN);
  });

  it(`should handle 'null' input`, () => {
    const functions = [
      (x) => x + 1,
      (x) => x * 2,
      (x) => x * x,
    ];

    expect(chainer(functions)(null))
      .toBe(4);
  });

  it(`should return the input for empty array of functions`, () => {
    const result = chainer([])(2);

    expect(result).toEqual(2);
  });
});
