'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('chainss multiple functions correctly', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => x ** 2;

    const chained = chainer([f1, f2, f3]);
    expect(chained(0)).toBe(4); // f1(0)=0, f2(0)=2, f3(2)=4
    expect(chained(2)).toBe(36); // f1(2)=4, f2(4)=6, f3(6)=36
  });

  test('returns input if no functions are provided', () => {
    const chained = chainer([]);
    expect(chained(5)).toBe(5);
    expect(chained('test')).toBe('test');
  });

  test('works with a single function', () => {
    const f1 = x => x + 10;
    const chained = chainer([f1]);
    expect(chained(5)).toBe(15);
  });

  test('works with different types', () => {
    const convertToString = x => x.toString();
    const addExclamation = x => x + '!';
    const chained = chainer([convertToString, addExclamation]);

    expect(chained(123)).toBe('123!');
  });

  test('functions are applied in left-to-right order', () => {
    const f1 = x => x + 1;
    const f2 = x => x * 3;
    const f3 = x => x - 2;

    const chained = chainer([f1, f2, f3]);
    // Calculation: (((1+1)*3)-2)=4
    expect(chained(1)).toBe(4);
  });
});
