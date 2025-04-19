'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it(`should be declared`, () => {
    expect(chainer)
      .toBeInstanceOf(Function);
  });

  it('should return the input unchanged when no functions are provided', () => {
    expect(chainer([])(5)).toEqual(5);
  });

  it('should apply a single function correctly', () => {
    const f1 = jest.fn((x) => x * 3);

    expect(chainer([f1])(4)).toEqual(12);

    expect(f1).toHaveBeenCalledWith(4);
  });

  it('should apply all functions sequentially', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    expect(chainer([f1, f2, f3])(0)).toEqual(4);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
  });

  it('should handle a different set of functions and input', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => x - 5);

    expect(chainer([f1, f2, f3])(2)).toEqual(4);

    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(3);
    expect(f3).toHaveBeenCalledWith(9);
  });
});
