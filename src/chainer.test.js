'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    const chained = chainer([]);
    expect(typeof chained).toBe('function');
  });

  it('should chain multiple unary functions correctly', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 3;
    const f3 = x => x ** 2;

    const chained = chainer([f1, f2, f3]);
    expect(chained(1)).toBe(16); // f3(f2(f1(1))) => ((1*2)+3)^2 = 16
  });

  it('should handle a single function', () => {
    const f = x => x + 5;
    const chained = chainer([f]);
    expect(chained(2)).toBe(7);
  });

  it('should handle an empty array of functions', () => {
    const chained = chainer([]);
    expect(chained(42)).toBe(42); // input should remain unchanged
  });

  it('should handle different input types if functions support them', () => {
    const f1 = s => s.toUpperCase();
    const f2 = s => `${s}!`;
    const chained = chainer([f1, f2]);
    expect(chained('hi')).toBe('HI!');
  });
});

