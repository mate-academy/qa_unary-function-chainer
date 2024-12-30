/* eslint-disable max-len */
'use strict';

const { chainer } = require('./chainer');

describe(`Function 'chainer':`, () => {
  it('Should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('Should pass easy math', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    expect(chainer([f1, f2, f3])(2)).toBe(36);
  });

  it('Should return the input when no functions are provided', () => {
    expect(chainer([])(42)).toBe(42);
  });

  it('Should call each function exactly once', () => {
    const mockFn1 = jest.fn((x) => x + 1);
    const mockFn2 = jest.fn((x) => x * 2);

    chainer([mockFn1, mockFn2])(5);

    expect(mockFn1).toHaveBeenCalledTimes(1);
    expect(mockFn2).toHaveBeenCalledTimes(1);
  });

  it('Should call functions in the correct order', () => {
    const mockFn1 = jest.fn((x) => x + 1);
    const mockFn2 = jest.fn((x) => x * 2);
    const mockFn3 = jest.fn((x) => x - 3);

    chainer([mockFn1, mockFn2, mockFn3])(5);

    expect(mockFn1).toHaveBeenCalledWith(5);
    expect(mockFn2).toHaveBeenCalledWith(6);
    expect(mockFn3).toHaveBeenCalledWith(12);
  });

  it('Should work correctly with a single function', () => {
    const mockFn = jest.fn((x) => x * 10);

    expect(chainer([mockFn])(3)).toBe(30);
    expect(mockFn).toHaveBeenCalledWith(3);
  });

  it('Should handle an array of identity functions', () => {
    const mockFn = jest.fn((x) => x);

    expect(chainer([mockFn, mockFn, mockFn])(7)).toBe(7);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('Should pass intermediate results between functions', () => {
    const mockFn1 = jest.fn((x) => x + 2);
    const mockFn2 = jest.fn((x) => x * 3);
    const mockFn3 = jest.fn((x) => x - 5);

    const result = chainer([mockFn1, mockFn2, mockFn3])(1);

    expect(result).toBe(4);

    expect(mockFn1).toHaveBeenCalledWith(1);
    expect(mockFn2).toHaveBeenCalledWith(3);
    expect(mockFn3).toHaveBeenCalledWith(9);
  });

  it('Should handle functions that return non-numeric values', () => {
    const mockFn1 = jest.fn(() => 'hello');
    const mockFn2 = jest.fn((x) => x + ' world');

    const result = chainer([mockFn1, mockFn2])('ignored');

    expect(result).toBe('hello world');

    expect(mockFn1).toHaveBeenCalledWith('ignored');
    expect(mockFn2).toHaveBeenCalledWith('hello');
  });

  it('Should handle mixed synchronous and asynchronous-like functions', async() => {
    const mockFn1 = jest.fn((x) => x + 1);
    const mockFn2 = jest.fn(async(x) => x * 2);

    const chain = chainer([mockFn1, mockFn2]);

    const result = await chain(3);

    expect(result).toBe(8); // (3 + 1) * 2

    expect(mockFn1).toHaveBeenCalledWith(3);
    expect(mockFn2).toHaveBeenCalledWith(4); // 3 + 1
  });
});
