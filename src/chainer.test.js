'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should chain functions in the correct order', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  test('should apply functions from left to right', () => {
    const first = jest.fn((x) => x + 1);
    const second = jest.fn((x) => x * 2);
    const third = jest.fn((x) => x - 3);

    const chained = chainer([first, second, third]);

    expect(chained(5)).toBe(9);
    expect(first).toHaveBeenCalledWith(5);
    expect(second).toHaveBeenCalledWith(6);
    expect(third).toHaveBeenCalledWith(12);
  });

  test('should return the input when the array is empty', () => {
    const chained = chainer([]);

    expect(chained(10)).toBe(10);
  });

  test('should work with a single function', () => {
    const double = (x) => x * 2;
    const chained = chainer([double]);

    expect(chained(5)).toBe(10);
  });

  test('should return a function', () => {
    const chained = chainer([(x) => x + 1]);

    expect(typeof chained).toBe('function');
  });
});
