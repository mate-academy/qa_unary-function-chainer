'use strict';

describe('Function chainer', () => {
  const { chainer } = require('./chainer');

  const mockFn1 = jest.fn((x) => x * 2);
  const mockFn2 = jest.fn((x) => x + 2);
  const mockFn3 = jest.fn((x) => Math.pow(x, 2));

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return function', () => {
    expect(typeof chainer([mockFn1, mockFn2, mockFn3])).toBe('function');
  });

  it('should execute each function once', () => {
    chainer([mockFn1, mockFn2, mockFn3])(0);
    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledTimes(1);
    expect(mockFn3).toBeCalledTimes(1);
  });

  it('should call functions in order', () => {
    chainer([mockFn1, mockFn2, mockFn3])(0);
    expect(mockFn1.mock.invocationCallOrder[0]).toBe(1);
    expect(mockFn2.mock.invocationCallOrder[0]).toBe(2);
    expect(mockFn3.mock.invocationCallOrder[0]).toBe(3);
  });

  it('should return 4 argument '
    + '[(x) => x * 2, (x) => x + 2, (x) => Math.pow(x, 2)]', () => {
    expect(chainer([mockFn1, mockFn2, mockFn3])(0)).toBe(4);
  });

  it('should return 16 argument '
    + '[(x) => x * 2, (x) => x + 2, (x) => Math.pow(x, 2)]', () => {
    expect(chainer([mockFn1, mockFn2, mockFn3])(1)).toBe(16);
  });
});
