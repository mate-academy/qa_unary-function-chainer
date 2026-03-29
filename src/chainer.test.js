'use strict';

const { chainer } = require('./chainer');

describe('Chainer', () => {
  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should call functions in sequence with correct values', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => x ** 2);

    const result = chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);

    expect(result).toBe(4);
  });

  it('should work with one function', () => {
    const double = (x) => x * 2;

    const result = chainer([double])(3);

    expect(result).toBe(6);
  });

  it('should call each function exactly once', () => {
    const f1 = jest.fn((x) => x);
    const f2 = jest.fn((x) => x);

    chainer([f1, f2])(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
  });

  it('should pass result from one function to the next', () => {
    const f1 = jest.fn(() => 10);
    const f2 = jest.fn();

    chainer([f1, f2])(0);

    expect(f2).toHaveBeenCalledWith(10);
  });

  it('should not call any function if array is empty', () => {
    const fn = jest.fn();

    const result = chainer([])(5);

    expect(fn).not.toHaveBeenCalled();
    expect(result).toBe(5);
  });
});
