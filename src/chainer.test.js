'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    const funcs = [x => x + 1];
    const chained = chainer(funcs);

    expect(typeof chained).toBe('function');
  });

  it('should apply functions from left to right', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    // f1(0) = 0, f2(0) = 2, f3(2) = 4
    expect(chained(0)).toBe(4);

    // f1(2) = 4, f2(4) = 6, f3(6) = 36
    expect(chained(2)).toBe(36);
  });

  it('should work with a single function', () => {
    const f = x => x + 10;
    const chained = chainer([f]);

    expect(chained(5)).toBe(15);
  });

  it('should return input unchanged if functions array is empty', () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42);
    expect(chained('test')).toBe('test');
  });

  it('should work with different types of return values', () => {
    const f1 = x => x + 'a';
    const f2 = x => x + 'b';
    const f3 = x => x.toUpperCase();

    const chained = chainer([f1, f2, f3]);

    expect(chained('')).toBe('AB');
  });
});
