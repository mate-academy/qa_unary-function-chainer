const { chainer } = require('./chainer');
'use strict';

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const firstFunction = jest.fn();
    const secondFunction = jest.fn();
    const result = chainer([firstFunction, secondFunction]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should chain functions and return final result', () => {
    const mock1 = jest.fn((x) => x * 2);
    const mock2 = jest.fn((x) => x + 2);
    const mock3 = jest.fn((x) => Math.pow(x, 2));

    const chainedFunction = chainer([mock1, mock2, mock3]);
    const result = chainedFunction(0);

    expect(mock1).toHaveBeenCalledWith(0);
    expect(mock2).toHaveBeenCalledWith(0);
    expect(mock3).toHaveBeenCalledWith(2);
    expect(result).toBe(4);
  });


