'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction).toBeInstanceOf(Function);
  });

  it('should chain functions from left to right', () => {
    const multiplyByTwo = (x) => x * 2;
    const addTwo = (x) => x + 2;
    const square = (x) => x ** 2;

    const chainedFunction = chainer([
      multiplyByTwo,
      addTwo,
      square,
    ]);

    expect(chainedFunction(0)).toBe(4);
    expect(chainedFunction(2)).toBe(36);
  });

  it('should return the input when the functions array is empty', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(10)).toBe(10);
    expect(chainedFunction('hello')).toBe('hello');
  });

  it('should work with one function', () => {
    const addFive = (x) => x + 5;

    const chainedFunction = chainer([addFive]);

    expect(chainedFunction(10)).toBe(15);
  });

  it('should pass the result of each function to the next function', () => {
    const first = jest.fn((x) => x + 1);
    const second = jest.fn((x) => x * 2);
    const third = jest.fn((x) => x - 3);

    const chainedFunction = chainer([first, second, third]);
    const result = chainedFunction(5);

    expect(first).toHaveBeenCalledWith(5);
    expect(second).toHaveBeenCalledWith(6);
    expect(third).toHaveBeenCalledWith(12);
    expect(result).toBe(9);
  });

  it('should call every function exactly once', () => {
    const first = jest.fn((x) => x);
    const second = jest.fn((x) => x);
    const third = jest.fn((x) => x);

    chainer([first, second, third])(10);

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
    expect(third).toHaveBeenCalledTimes(1);
  });
});
