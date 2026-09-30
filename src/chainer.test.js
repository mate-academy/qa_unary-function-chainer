'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should chain functions correctly', () => {
    const chained = chainer([])
    expect(typeof chained).toBe('function')
  });

  test('should return initial val when empty function chains', () => {
    const chained = chainer([])
    expect(chained(1)).toBe(1);
    expect(chained('one')).toBe('one');
  });

  test('should handle single function', () => {
    const addOne = (x) => x + 1;
    const chained = chainer([addOne]);
    expect(chained(1)).toBe(2);
  });

  test('should apply functions in correct order', () => {
    const addOne = (x) => x + 1;
    const multiplyByTwo = (x) => x * 2;
    const minusThree = (x) => x - 3;
    const chained = chainer([addOne, multiplyByTwo, minusThree]);
    expect(chained(1)).toBe(1); // ((1 + 1) * 2) - 3
  });

  test('should handle functions with correct args and count', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);
    const chained = chainer([f1, f2]);

    expect(chained(1)).toBe(4);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(1);
    expect(f2).toHaveBeenCalledWith(2);
  });
});
