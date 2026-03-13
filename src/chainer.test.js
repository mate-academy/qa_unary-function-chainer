'use strict';

const chainer = require('./chainer');

test('returns a function', () => {
  const result = chainer([]);
  expect(typeof result).toBe('function');
});

test('applies functions from left to right', () => {
  const f1 = x => x * 2;
  const f2 = x => x + 2;
  const f3 = x => x ** 2;

  const chained = chainer([f1, f2, f3]);

  expect(chained(0)).toBe(4);
});

test('works with a single function', () => {
  const f1 = x => x + 5;

  const chained = chainer([f1]);

  expect(chained(10)).toBe(15);
});

test('returns identity function when given an empty array', () => {
  const chained = chainer([]);

  expect(chained(7)).toBe(7);
});

test('passes the result of each function to the next one', () => {
  const calls = [];

  const f1 = x => {
    calls.push(x);
    return x + 1;
  };

  const f2 = x => {
    calls.push(x);
    return x * 2;
  };

  chainer([f1, f2])(3);

  expect(calls).toEqual([3, 4]);
});
