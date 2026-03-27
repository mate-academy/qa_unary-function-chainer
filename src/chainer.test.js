'use strict';

const { chainer } = require('./chainer');

it(`should be declared`, () => {
  expect(chainer).toBeInstanceOf(Function);
});

it('should return a function', () => {
  const firstFunction = jest.fn();
  const secondFunction = jest.fn();
  const result = chainer([firstFunction, secondFunction]);

  expect(result).toBeInstanceOf(Function);
});

it('should chain functions with 0 return final result 4', () => {
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

it('should chain functions 1 return final result 16', () => {
  const mock1 = jest.fn((x) => x * 2);
  const mock2 = jest.fn((x) => x + 2);
  const mock3 = jest.fn((x) => Math.pow(x, 2));

  const chainedFunction = chainer([mock1, mock2, mock3]);
  const result = chainedFunction(1);

  expect(mock1).toHaveBeenCalledWith(1);
  expect(mock2).toHaveBeenCalledWith(2);
  expect(mock3).toHaveBeenCalledWith(4);
  expect(result).toBe(16);
});
