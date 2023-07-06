'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should chain the unary functions correctly', () => {
    const mockFunctionA = (x) => x + 1;
    const mockFunctionB = (x) => x * 2;
    const mockFunctionC = (x) => x - 3;
    const mockFunctionD = (x) => x / 4;

    const chain
    = chainer([mockFunctionA, mockFunctionB, mockFunctionC, mockFunctionD]);

    const input = 10;
    const result = chain(input);

    expect(result).toEqual((((input + 1) * 2) - 3) / 4);
  });

  it('should return the input value if the input array is empty', () => {
    const chain = chainer([]);
    const input = 10;
    const result = chain(input);

    expect(result).toBe(input);
  });

  it('should skip non-function elements in the input array', () => {
    const mockFunctionA = (x) => x + 1;
    const mockFunctionB = (x) => x * 2;

    const chain = chainer([mockFunctionA, 42, mockFunctionB, 'not a function']);

    const input = 10;
    const result = chain(input);

    expect(result).toEqual(mockFunctionB(mockFunctionA(input)));
  });
});
