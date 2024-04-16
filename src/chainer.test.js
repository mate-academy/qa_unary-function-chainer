'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const firstFunction = jest.fn();
    const secondFunction = jest.fn();
    const result = chainer([firstFunction, secondFunction]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should chain functions and return final result', () => {
    const mockFunc1 = jest.fn((x) => x * 2);
    const mockFunc2 = jest.fn((x) => x + 2);
    const mockFunc3 = jest.fn((x) => Math.pow(x, 2));

    const chainedFunction = chainer([mockFunc1, mockFunc2, mockFunc3]);
    const result = chainedFunction(0);

    expect(mockFunc1).toHaveBeenCalledWith(0);
    expect(mockFunc2).toHaveBeenCalledWith(0);
    expect(mockFunc3).toHaveBeenCalledWith(2);
    expect(result).toBe(4);
  });
});
