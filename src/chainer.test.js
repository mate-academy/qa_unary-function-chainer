'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  it('should call all functions', () => {
    const f1 = jest.fn((number) => number + 1);
    const f2 = jest.fn((number) => number + 2);
    const f3 = jest.fn((number) => number + 3);

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(1);
    expect(f3).toHaveBeenCalledWith(3);
  });

  it('should work with one function', () => {
    const fn = jest.fn((number) => number ** 3);

    const result = chainer([fn])(10);

    expect(result).toBe(1000);
  });

  it('shoul return correct result of chaining', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x + 2);

    const result = chainer([f1, f2])(0);

    expect(result).toBe(3);
  });

  it('should word with empty array', () => {
    const result = chainer([])(10);

    expect(result).toBe(10);
  });

  it('should work with arrays', () => {
    const f1 = jest.fn((array) => array.sort());
    const f2 = jest.fn((array) => array.reverse());

    const result = chainer([f1, f2])([2, 1, 3]);

    expect(result).toEqual([3, 2, 1]);
  });

  it('should word with objects', () => {
    const f1 = jest.fn((obj) => {
      return {
        ...obj,
        name: 'Mykola',
      };
    });
    const f2 = jest.fn((obj) => {
      return {
        ...obj,
        lastName: 'Stesiuk',
      };
    });

    const result = chainer([f1, f2])({});

    expect(result).toEqual({
      name: 'Mykola', lastName: 'Stesiuk',
    });
  });
});
