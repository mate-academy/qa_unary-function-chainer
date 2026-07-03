'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should be a function', () => {
    expect(typeof chainer).toBe('function');
  });

  test('should return a function when called', () => {
    const chained = chainer([]);

    expect(typeof chained).toBe('function');
  });

  test('should return the input value if the functions array is empty', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
    expect(chained('hello')).toBe('hello');
    expect(chained(null)).toBe(null);
  });

  test('should correctly chain a single function', () => {
    const f1 = jest.fn((x) => x + 2);
    const chained = chainer([f1]);

    expect(chained(3)).toBe(5);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(3);
  });

  test('should chain multiple functions from left to right', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 3);
    const f3 = jest.fn((x) => x - 5);

    const chained = chainer([f1, f2, f3]);

    // chainer([f1, f2, f3])(4)
    // f1(4) -> 8
    // f2(8) -> 11
    // f3(11) -> 6
    expect(chained(4)).toBe(6);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(4);

    expect(f2).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledWith(8);

    expect(f3).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledWith(11);
  });

  test('should work with different input and output types', () => {
    const f1 = (x) => String(x);
    const f2 = (x) => `${x}!`;
    const f3 = (x) => x.length;

    const chained = chainer([f1, f2, f3]);

    // chainer([f1, f2, f3])(123)
    // f1(123) -> "123"
    // f2("123") -> "123!"
    // f3("123!") -> 4
    expect(chained(123)).toBe(4);
  });

  test('should not mutate the input array of functions', () => {
    const f1 = (x) => x + 1;
    const f2 = (x) => x * 2;
    const functions = [f1, f2];
    const originalFunctions = [...functions];

    chainer(functions)(2);

    expect(functions).toEqual(originalFunctions);
  });

  test('should chain functions when using standard example from readme', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });
});
