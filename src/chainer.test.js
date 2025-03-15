'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it('should call the functions in the correct order', () => {
    const fn1 = jest.fn((x) => x + 1);
    const fn2 = jest.fn((x) => x * 2);
    const fn3 = jest.fn((x) => x - 3);

    const chainedFunction = chainer([fn1, fn2, fn3]);

    chainedFunction(5);

    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();

    expect(fn1.mock.invocationCallOrder[0]).toBeLessThan(
      fn2.mock.invocationCallOrder[0]
    );

    expect(fn2.mock.invocationCallOrder[0]).toBeLessThan(
      fn3.mock.invocationCallOrder[0]
    );
  });

  it('should return the correct result', () => {
    const fn1 = jest.fn((x) => x + 1);
    const fn2 = jest.fn((x) => x * 2);
    const fn3 = jest.fn((x) => x - 3);

    const chainedFunction = chainer([fn1, fn2, fn3]);

    const result = chainedFunction(5);

    expect(result).toBe(9);
  });

  it('each function should receive the result of the previous function', () => {
    const fn1 = jest.fn((x) => x + 1);
    const fn2 = jest.fn((x) => x * 2);
    const fn3 = jest.fn((x) => x - 3);

    const chainedFunction = chainer([fn1, fn2, fn3]);

    chainedFunction(5);

    expect(fn1).toHaveBeenCalledWith(5);
    expect(fn2).toHaveBeenCalledWith(6);
    expect(fn3).toHaveBeenCalledWith(12);
  });
});
