'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it(`should be declared`, () => {
    expect(chainer).toBeDefined();
  });

  it(`should return a function`, () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  it(`should call each function in 'functions'`, () => {
    const data = [jest.fn(), jest.fn(), jest.fn()];

    chainer(data)(0);

    expect(data[0]).toHaveBeenCalledTimes(1);
    expect(data[1]).toHaveBeenCalledTimes(1);
    expect(data[2]).toHaveBeenCalledTimes(1);
  });

  it(`should return a function that correctly returns value`, () => {
    const mockFunc = jest.fn();
    const data = Array(5).fill(mockFunc);

    mockFunc.mockReturnValue(10);

    const result = chainer(data)(0);

    expect(result).toBe(10);
  });

  it(`should pass correct parameters to each function in 'functions'`, () => {
    const mockFunc = jest.fn();
    const data = Array(3).fill(mockFunc);

    mockFunc
      .mockImplementationOnce((v) => v * 2)
      .mockImplementationOnce((v) => v - 1)
      .mockImplementationOnce((v) => v + 3);

    const result = chainer(data)(2);

    expect(data[0]).toHaveBeenNthCalledWith(1, 2);
    expect(data[1]).toHaveBeenNthCalledWith(2, 4);
    expect(data[2]).toHaveBeenNthCalledWith(3, 3);
    expect(result).toBe(6);
  });
});
