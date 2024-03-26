'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declarated', () => {
    expect(chainer).toBeDefined();
  });

  it('should return the same value if there are no functions', () => {
    const result = chainer([])(4);

    expect(result).toBe(4);
  });

  it('first callback should be called 1 time and return right result', () => {
    const f1 = jest.fn();
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);;
    chainer([f1, f2, f3])(5);

    expect(f1).toHaveBeenCalledWith(5);
    expect(f1).toHaveBeenCalledTimes(1);
  });

  it('second callback should be called 1 time and return right result', () => {
    const f1 = (x) => x * 2;
    const f2 = jest.fn();
    const f3 = (x) => Math.pow(x, 2);;
    chainer([f1, f2, f3])(1);

    expect(f2).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledTimes(1);
  });

  it('third callback should be called 1 time and return right result', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = jest.fn();
    chainer([f1, f2, f3])(8);

    expect(f3).toHaveBeenCalledWith(18);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should return the correct result', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);;
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });
});

