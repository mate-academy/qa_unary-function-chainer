'use strict';

const { chainer } = require('./chainer');

it('should be declared', () => {
  expect(chainer()).toBeInstanceOf(Function);
});

it('should call all functions from arguments', () => {
  const func1 = jest.fn((x) => {
    return x * 2;
  });
  const func2 = jest.fn((x) => {
    return x + 2;
  });
  const func3 = jest.fn((x) => {
    return Math.pow(x, 2);
  });

  chainer([func1, func2, func3])(3);
  expect(func1).toHaveBeenCalled();
  expect(func2).toHaveBeenCalled();
  expect(func3).toHaveBeenCalled();
});

it('should call all functions with a correct parameter', () => {
  const func1 = jest.fn((x) => {
    return x * 2;
  });
  const func2 = jest.fn((x) => {
    return x + 2;
  });
  const func3 = jest.fn((x) => {
    return Math.pow(x, 2);
  });

  chainer([func1, func2, func3])(3);
  expect(func1).toHaveBeenCalledWith(3);
  expect(func2).toHaveBeenCalledWith(6);
  expect(func3).toHaveBeenCalledWith(8);
});

it('should return result of executed functions', () => {
  const func1 = jest.fn((x) => {
    return x * 2;
  });
  const func2 = jest.fn((x) => {
    return x + 2;
  });
  const func3 = jest.fn((x) => {
    return Math.pow(x, 2);
  });

  const result = chainer([func1, func2, func3])(3);

  expect(result).toBe(64);
});
