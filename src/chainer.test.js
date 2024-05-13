'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  let f1, f2, f3, functions;

  beforeEach(() => {
    f1 = jest.fn((n) => n + 1);
    f2 = jest.fn((n) => n - 5);
    f3 = jest.fn((n) => n * n);

    functions = [f1, f2, f3];
  });

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('returns a function after the first call', () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  it('returns a correct result after the second call', () => {
    const result = chainer(functions)(5);

    expect(result).toBe(1);
  });

  it('every function is called only once', () => {
    chainer(functions)(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('returns the original input if an empty array was provided', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });
});
