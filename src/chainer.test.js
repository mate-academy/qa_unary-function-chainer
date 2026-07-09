/* eslint-disable prettier/prettier */
'use strict';

const { chainer } = require('./chainer');

describe('chainer ', () => {
  it('should call each function in  the chain once ', () => {
    const mockFuncA = jest.fn((x) => x + 1);
    const mockFuncB = jest.fn((x) => x * 2);
    const mockFuncC = jest.fn((x) => x - 3);

    const func = chainer([mockFuncA, mockFuncB, mockFuncC]);

    func(6);

    expect(mockFuncA).toHaveBeenCalledTimes(1);
    expect(mockFuncB).toHaveBeenCalledTimes(1);
    expect(mockFuncC).toHaveBeenCalledTimes(1);
  });

  it('should pass the output of each function to the next one ', () => {
    const mockFuncA = jest.fn((x) => x + 1); // 6 -> 7
    const mockFuncB = jest.fn((x) => x * 2); // 7 -> 14
    const mockFuncC = jest.fn((x) => x - 3); // 14 -> 11

    const func = chainer([mockFuncA, mockFuncB, mockFuncC]);

    func(6);

    expect(mockFuncA).toHaveBeenCalledWith(6);
    expect(mockFuncB).toHaveBeenCalledWith(7);
    expect(mockFuncC).toHaveBeenCalledWith(14);
  });

  it('should return the result of the last function in the chain', () => {
    const addOne = (x) => x + 1;
    const double = (x) => x * 2;
    const subtractThree = (x) => x - 3;

    const composed = chainer([addOne, double, subtractThree]);
    const result = composed(6);

    expect(result).toBe(11);
  });
});
