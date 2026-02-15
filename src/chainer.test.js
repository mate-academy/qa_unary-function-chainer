'use strict';

describe('Chainer', () => {
  const { chainer } = require('./chainer');

  it('should return input value for empty array', () => {
    const res = chainer([])(20);

    expect(res).toBe(20);
  });

  it('should call all functions in array and return correct result', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 3);
    const f3 = jest.fn((x) => x - 1);
    const res = chainer([f1, f2, f3])(5);

    expect(res).toBe(12);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);

    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(10);
    expect(f3).toHaveBeenCalledWith(13);
  });

  it('should work with one function in an array', () => {
    const f = jest.fn((s) => s + 'user');
    const res = chainer([f])('Hello, ');

    expect(res).toBe('Hello, user');
  });

  it('passes undefined between functions', () => {
    const f1 = jest.fn(() => undefined);
    const f2 = jest.fn((x) => x);
    const result = chainer([f1, f2])('input');

    expect(result).toBeUndefined();
    expect(f1).toHaveBeenCalledWith('input');
    expect(f2).toHaveBeenCalledWith(undefined);
  });

  it('should return 4 for input 0', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));
    const res = chainer([f1, f2, f3])(0);

    expect(res).toBe(4);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
  });
});
