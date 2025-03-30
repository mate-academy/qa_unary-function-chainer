'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('powinien poprawnie łączyć funkcje w określonej kolejności', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(0)).toBe(4);
    expect(chainedFunction(2)).toBe(36);
    expect(chainedFunction(-1)).toBe(0);
  });

  test('powinien działać poprawnie dla jednej funkcji w łańcuchu', () => {
    function f(x) {
      return x + 10;
    }

    const chainedFunction = chainer([f]);

    expect(chainedFunction(5)).toBe(15);
  });

  test('powinien zwrócić identyczną wartość dla pustej listy funkcji', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(10)).toBe(10);
    expect(chainedFunction(-5)).toBe(-5);
  });

  test('powinien poprawnie obsługiwać funkcje tożsamościowe', () => {
    function identity(x) {
      return x;
    }

    const chainedFunction = chainer([identity, identity, identity]);

    expect(chainedFunction(42)).toBe(42);
  });

  test('powinien poprawnie obsługiwać funkcje mieszane', () => {
    function double(x) {
      return x * 2;
    }

    function negate(x) {
      return -x;
    }

    function increment(x) {
      return x + 1;
    }

    const chainedFunction = chainer([double, negate, increment]);

    expect(chainedFunction(3)).toBe(-5);
    expect(chainedFunction(-2)).toBe(5);
  });
});
