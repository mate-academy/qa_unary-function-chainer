'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let f1, f2, f3;

  beforeEach(() => {
    f1 = jest.fn((x) => x + 1);
    f2 = jest.fn((x) => x * 2);
    f3 = jest.fn((x) => x - 3);
  });

  it('should return a function', () => {
    const chained = chainer([f1]);

    expect(typeof chained).toBe('function');
  });

  it('should apply multiple functions in order', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(5)).toBe(9);

    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(6);
    expect(f3).toHaveBeenCalledWith(12);
  });

  it('should call each function only once', () => {
    const chained = chainer([f1, f2, f3]);

    chained(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should work with one function', () => {
    const chained = chainer([f1]);

    expect(chained(2)).toBe(3);
  });

  it('should work when no functions passed', () => {
    const chained = chainer([]);

    expect(chained(4)).toBe(4);
  });
});
