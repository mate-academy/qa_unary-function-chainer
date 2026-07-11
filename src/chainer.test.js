'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('should return a function that returns the same value', () => {
    expect(chainer([])(1)).toBe(1);
  });

  it('should work correctly with a single function', () => {
    const double = (x) => x * 2;

    expect(chainer([double])(5)).toBe(10);
  });

  it('should return a function that does a left fold', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const result = chainer([f1, f2, f3])(2);

    expect(result).toBe(36);
  });

  test('calls functions in correct order with correct arguments', () => {
    const fn1 = jest.fn((x) => x + 1);
    const fn2 = jest.fn((x) => x * 2);

    const chain = chainer([fn1, fn2]);
    const result = chain(3);

    expect(result).toBe(8);
    expect(fn1).toHaveBeenCalledWith(3);
    expect(fn2).toHaveBeenCalledWith(4);
  });
});
