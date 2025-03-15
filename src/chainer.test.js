'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let fn1, fn2, fn3, chainedFunction;

  beforeEach(() => {
    fn1 = jest.fn((x) => x + 1);
    fn2 = jest.fn((x) => x * 2);
    fn3 = jest.fn((x) => x - 3);
    chainedFunction = chainer([fn1, fn2, fn3]);
  });

  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function when invoked', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('should call functions in the correct order', () => {
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
    expect(chainedFunction(5)).toBe(9);
  });

  it('should pass the output of each function as input to the next', () => {
    chainedFunction(5);

    expect(fn1).toHaveBeenCalledWith(5);
    expect(fn2).toHaveBeenCalledWith(6);
    expect(fn3).toHaveBeenCalledWith(12);
  });

  it('should return the same input when given an empty function array', () => {
    const emptyChainer = chainer([]);

    expect(emptyChainer(5)).toBe(5);
  });

  it('should return correct result when only one function is provided', () => {
    const singleChainer = chainer([fn1]);

    expect(singleChainer(10)).toBe(11);
  });
});
