'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('має послідовно застосовувати функції зліва направо', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);
    const result = chained(0);

    // f1(0) = 0 -> f2(0) = 2 -> f3(2) = 4
    expect(result).toBe(4);
  });

  it('має працювати з одним елементом у масиві', () => {
    const double = (x) => x * 2;

    const chained = chainer([double]);

    expect(chained(5)).toBe(10);
  });

  it('має повертати початкове значення, якщо масив порожній', () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42);
  });

  it('має коректно працювати зі стрічковими функціями', () => {
    const trim = (s) => s.trim();
    const toUpper = (s) => s.toUpperCase();
    const addExcl = (s) => s + '!';

    const chained = chainer([trim, toUpper, addExcl]);

    expect(chained('  hello  ')).toBe('HELLO!');
  });
});
