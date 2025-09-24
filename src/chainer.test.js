'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('chains multiple functions correctly', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
    expect(chained(1)).toBe(16);
  });

  test('returns the input unchanged when given an empty array', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
    expect(chained('test')).toBe('test');
  });

  test('works with a single function', () => {
    const f = x => x + 10;
    const chained = chainer([f]);

    expect(chained(5)).toBe(15);
  });

  test('chains functions with different types', () => {
    const f1 = x => x.toString();
    const f2 = s => s + '!';
    const f3 = s => s.length;

    const chained = chainer([f1, f2, f3]);

    expect(chained(123)).toBe(4);
  });

  test('calls each function exactly once per invocation', () => {
    const mock1 = jest.fn(x => x + 1);
    const mock2 = jest.fn(x => x * 2);

    const chained = chainer([mock1, mock2]);
    const result = chained(3);

    expect(result).toBe(8);
    expect(mock1).toHaveBeenCalledTimes(1);
    expect(mock2).toHaveBeenCalledTimes(1);
  });
});
