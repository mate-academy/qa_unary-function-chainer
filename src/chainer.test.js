'use strict';

const { chainer } = require('./chainer');

describe('"chainer" function', () => {
  let f1;
  let f2;
  let f3;

  beforeEach(() => {
    f1 = jest.fn((x) => x + 1);
    f2 = jest.fn((x) => x * 2);
    f3 = jest.fn((x) => x - 3);
  });

  it('should return a function', () => {
    const result = chainer([f1, f2]);

    expect(typeof result).toBe('function');
  });

  it('should call functions in order', () => {
    const chained = chainer([f1, f2, f3]);

    chained(5);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
  });

  it('should pass result from one function to another', () => {
    const chained = chainer([f1, f2, f3]);

    const result = chained(5);

    expect(result).toBe(9);
  });

  it('should return initial value if array is empty', () => {
    const chained = chainer([]);

    expect(chained(10)).toBe(10);
  });
});
