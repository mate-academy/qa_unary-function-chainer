'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should return a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  test('should apply functions in correct order (left-to-right)', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0)).toBe(4);
    expect(chainer([f1, f2, f3])(2)).toBe(36);
  });

  test('should return the input unchanged if no functions provided', () => {
    const input = 10;

    expect(chainer([])(input)).toBe(input);
  });

  test('should work correctly with a single function', () => {
    const f1 = (x) => x + 5;

    expect(chainer([f1])(10)).toBe(15);
  });

  test('should work with different data types (strings)', () => {
    const addHello = (s) => `Hello, ${s}`;
    const addExclamation = (s) => `${s}!`;

    const greet = chainer([addHello, addExclamation]);

    expect(greet('World')).toBe('Hello, World!');
  });

  test('should call each function exactly once', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x + 1);

    chainer([f1, f2])(0);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
  });
});
