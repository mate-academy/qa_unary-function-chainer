'use strict';

const chainer = require('./chainer');

test('chains functions together correctly', () => {
  function f1(x) {
    return x * 2;
  }

  function f2(x) {
    return x + 2;
  }

  function f3(x) {
    return Math.pow(x, 2);
  }

  const chained = chainer([f1, f2, f3]);

  expect(chained(0)).toBe(4);
  expect(chained(1)).toBe(16);
  expect(chained(2)).toBe(36);
});

test('handles empty list of functions', () => {
  const chained = chainer([]);

  expect(chained(0)).toBe(0);
  expect(chained(1)).toBe(1);
  expect(chained(2)).toBe(2);
});

test('handles single function', () => {
  function f1(x) {
    return x * 2;
  }

  const chained = chainer([f1]);

  expect(chained(0)).toBe(0);
  expect(chained(1)).toBe(2);
  expect(chained(2)).toBe(4);
});

test('handles multiple functions', () => {
  function f1(x) {
    return x + 1;
  }

  function f2(x) {
    return x * 3;
  }

  function f3(x) {
    return x - 2;
  }

  const chained = chainer([f1, f2, f3]);

  expect(chained(0)).toBe(1);
  expect(chained(1)).toBe(4);
  expect(chained(2)).toBe(7);
});
