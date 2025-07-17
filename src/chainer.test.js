'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  function f1(x) {
    return x * 2;
  }

  function f2(x) {
    return x + 2;
  }

  function f3(x) {
    return Math.pow(x, 2);
  }

  test('should return input unchanged if function list is empty', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
    expect(chained('test')).toBe('test');
  });

  test('should apply a single function', () => {
    const chained = chainer([f1]);

    expect(chained(3)).toBe(6);
  });

  test('should apply multiple functions in left-to-right order', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);

    expect(chained(1)).toBe(16);
  });

  test('should handle string transformations', () => {
    const upper = (s) => s.toUpperCase();
    const addExcl = (s) => s + '!';
    const repeat = (s) => s.repeat(2);

    const chained = chainer([upper, addExcl, repeat]);

    expect(chained('hi')).toBe('HI!HI!');
  });

  test('should work with identity function', () => {
    const id = (x) => x;
    const chained = chainer([id, id, id]);

    expect(chained(123)).toBe(123);
  });

  test('should handle functions that return different types', () => {
    const toStr = (x) => x.toString();
    const wrap = (s) => `[${s}]`;
    const split = (s) => s.split('');

    const chained = chainer([toStr, wrap, split]);

    expect(chained(42)).toEqual(['[', '4', '2', ']']);
  });
});
