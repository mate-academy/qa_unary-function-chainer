'use strict';

describe('chainer function', () => {
  const { chainer } = require('./chainer');

  let firstMock, secondMock, thirdMock, functions;

  beforeEach(() => {
    firstMock = jest.fn((x) => {
      return x * 2;
    });

    secondMock = jest.fn((x) => {
      return x + 1;
    });

    thirdMock = jest.fn((x) => {
      return x + 100;
    });

    functions = [firstMock, secondMock, thirdMock];
  });

  it('should return a function', () => {
    const newChain = chainer([]);

    expect(typeof newChain).toBe('function');
  });

  it('should return the input when no functions are provided', () => {
    const chain = chainer([]);

    expect(chain(2)).toBe(2);
  });

  it('should call each function', () => {
    chainer(functions)(1);

    expect(firstMock).toHaveBeenCalled();
    expect(secondMock).toHaveBeenCalled();
    expect(thirdMock).toHaveBeenCalled();
  });

  it('should return the result from the last function call', () => {
    firstMock.mockReturnValue(1);
    secondMock.mockReturnValue(2);
    thirdMock.mockReturnValue(3);

    const result = chainer(functions)(0);

    expect(firstMock).toHaveBeenCalled();
    expect(secondMock).toHaveBeenCalled();
    expect(thirdMock).toHaveBeenCalled();

    expect(result).toBe(3);
  });

  it('functions should work correctly in chain', () => {
    const result = chainer(functions)(2);

    expect(firstMock).toHaveBeenCalled();
    expect(secondMock).toHaveBeenCalled();
    expect(thirdMock).toHaveBeenCalled();

    expect(result).toBe(105);
  });
});
