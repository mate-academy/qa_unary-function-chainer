'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should chain the unary functions correctly', () => {
    const mockFunctionA = jest.fn((x) => x + 1);
    const mockFunctionB = jest.fn((x) => x * 2);
    const mockFunctionC = jest.fn((x) => x - 3);
    const mockFunctionD = jest.fn((x) => x / 4);

    const chain = chainer([mockFunctionA, mockFunctionB,
      mockFunctionC, mockFunctionD]);

    const input = 10;
    const result = chain(input);

    expect(mockFunctionA).toHaveBeenCalledWith(input);
    expect(mockFunctionB).toHaveBeenCalledWith(mockFunctionA(input));

    expect(mockFunctionC)
      .toHaveBeenCalledWith(mockFunctionB(mockFunctionA(input)));

    expect(mockFunctionD)
      .toHaveBeenCalledWith(mockFunctionC(mockFunctionB(mockFunctionA(input))));

    expect(result)
      .toEqual(mockFunctionD(mockFunctionC(mockFunctionB(mockFunctionA(input)))
      ));
  });
});
