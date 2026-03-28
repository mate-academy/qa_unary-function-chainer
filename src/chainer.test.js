'use strict';

const { chainer } = require('./chainer');

test('should chain multiple functions correctly', () => {
  const f1 = x => x * 2;
  const f2 = x => x + 2;
  const f3 = x => Math.pow(x, 2);

  expect(chainer([f1, f2, f3])(0)).toBe(4);
});

test('should return the input when no functions are provided', () => {
  expect(chainer([])(5)).toBe(5);
});

test('should apply a single function', () => {
  const f1 = x => x + 5;

  expect(chainer([f1])(10)).toBe(15);
});

test('should correctly handle negative input', () => {
  const f1 = x => x * 2;
  const f2 = x => x + 3;

  expect(chainer([f1, f2])(-3)).toBe(-3);
});

test('should correctly handle string inputs', () => {
  const f1 = x => x.toUpperCase();
  const f2 = x => x + '!';

  expect(chainer([f1, f2])('hello')).toBe('HELLO!');
});

test('should respect the chaining order of functions', () => {
  const f1 = x => x * 2;
  const f2 = x => x + 3;

  expect(chainer([f1, f2])(2)).toBe(7);
});

test('should chain random functions with mixed operations', () => {
  const f1 = x => x + 10;
  const f2 = x => x / 2;
  const f3 = x => Math.floor(x);

  expect(chainer([f1, f2, f3])(20)).toBe(15);
});

test('should handle functions that throw errors', () => {
  const f1 = x => {
    if (x < 0) {
      throw new Error('Negative Input');
    }

    return x;
  };
  const f2 = x => x + 3;

  expect(() => chainer([f1, f2])(-1)).toThrow('Negative Input');
});
