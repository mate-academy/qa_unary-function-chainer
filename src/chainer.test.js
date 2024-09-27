'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let mockFunc1;
  let mockFunc2;
  let mockFunc3;

  beforeEach(() => {
    mockFunc1 = jest.fn((x) => x * 2);
    mockFunc2 = jest.fn((x) => x + 2);
    mockFunc3 = jest.fn((x) => Math.pow(x, 2));
  });

  afterEach(() => {
    mockFunc1 = null;
    mockFunc2 = null;
    mockFunc3 = null;
  });

  it(`should be declared`, () => {
    expect(chainer)
      .toBeInstanceOf(Function);
  });

  it(`should be return function`, () => {
    const firstFunction = jest.fn();
    const secondFunction = jest.fn();
    const result = chainer([firstFunction, secondFunction]);

    expect(result)
      .toBeInstanceOf(Function);
  });

  it(`should chain functions and return the final result`, () => {
    const chainedFunction = chainer([mockFunc1, mockFunc2, mockFunc3]);
    const result = chainedFunction(0);

    expect(mockFunc1).toHaveBeenCalledWith(0);
    expect(mockFunc2).toHaveBeenCalledWith(0);
    expect(mockFunc3).toHaveBeenCalledWith(2);
    expect(result).toBe(4);
  });
});
