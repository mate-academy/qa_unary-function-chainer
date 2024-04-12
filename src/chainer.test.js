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

    const functions = [mockAddOne, mockDouble, mockSquare];

    chainer(functions)(3);

    expect(mockAddOne).toHaveBeenCalledWith(3);
    expect(mockDouble).toHaveBeenCalledWith(4);
    expect(mockSquare).toHaveBeenCalledWith(8);
  });

  it(`should return correct result`, () => {
    const functions = [(x) => x + 1, (x) => x * 2, (x) => x * x];

    expect(chainer(functions)(2)).toBe(36);
  });
});
