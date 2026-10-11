'use strict';

describe('Chainer', () => {
  const { chainer } = require('./chainer');

  it('should call functions from left to right with correct arguments', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => x * 5);

    const chained = chainer([f1, f2, f3]);
    const result = chained(3);

    expect(result).toBe(40);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(3);

    expect(f2).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledWith(6);

    expect(f3).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledWith(8);
  });

  it('should work with a single mock function', () => {
    const f1 = jest.fn((x) => x + 5);

    const chained = chainer([f1]);

    expect(chained(10)).toBe(15);
    expect(f1).toHaveBeenCalledWith(10);
  });

  it('should return input for an ty array without calling any function', () => {
    const chained = chainer([]);
    const input = 'test-input';

    expect(chained(input)).toBe(input);
  });
});
