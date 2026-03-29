'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should apply all functions one by one', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => x ** 2;

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it('should return the initial value if functions array is empty', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  it('should pass result of previous function to the next one', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => x - 2);

    const result = chainer([f1, f2, f3])(2);

    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(3);
    expect(f3).toHaveBeenCalledWith(9);
    expect(result).toBe(7);
  });
});
