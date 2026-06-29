'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('chains multiple functions', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0)).toBe(4);
    expect(chainer([f1, f2, f3])(2)).toBe(36);
  });

  it('returns input for empty array', () => {
    expect(chainer([])(10)).toBe(10);
    expect(chainer([])('test')).toBe('test');
  });

  it('works with single function', () => {
    const f1 = (x) => x + 5;

    expect(chainer([f1])(5)).toBe(10);
  });

  it('passes results in correct order', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);

    const result = chainer([f1, f2])(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(5);

    expect(f2).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledWith(6);

    expect(result).toBe(12);
  });
});
