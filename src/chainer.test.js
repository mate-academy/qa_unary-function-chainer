'use strict';

describe('Chainer function', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should execute functions in correct order', () => {
    const mockFn1 = jest.fn((x) => x * 2);
    const mockFn2 = jest.fn((x) => x + 2);
    const mockFn3 = jest.fn((x) => Math.pow(x, 2));
    const input = 0;
    const expected = 4;
    const chainedFunction = chainer([mockFn1, mockFn2, mockFn3]);
    const actual = chainedFunction(input);

    expect(actual).toBe(expected);

    expect(mockFn1).toHaveBeenCalledTimes(1);
    expect(mockFn2).toHaveBeenCalledTimes(1);
    expect(mockFn3).toHaveBeenCalledTimes(1);

    expect(mockFn1).toHaveBeenCalledWith(input);
    expect(mockFn2).toHaveBeenCalledWith(0);
    expect(mockFn3).toHaveBeenCalledWith(2);
  });

  it('should return input if functions array is empty', () => {
    const expected1 = 'test input';
    const expected2 = 5;
    const chainedFunction = chainer([]);
    const actual1 = chainedFunction(expected1);
    const actual2 = chainedFunction(expected2);

    expect(actual1).toBe(expected1);
    expect(actual2).toBe(expected2);
  });

  it('should correct execute array with only 1 function', () => {
    const mockFn1 = jest.fn((x) => x * 2);
    const input = 5;
    const expected = 10;
    const chainedFunction = chainer([mockFn1]);
    const actual = chainedFunction(input);

    expect(actual).toBe(expected);
    expect(mockFn1).toHaveBeenCalledTimes(1);
    expect(mockFn1).toHaveBeenCalledWith(input);
  });
});
