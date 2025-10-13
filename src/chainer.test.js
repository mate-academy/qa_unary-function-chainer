'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    const result = chainer([]);
    expect(typeof result).toBe('function');
  });

  it('should chain multiple unary functions correctly', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 3;
    const f3 = x => x ** 2;

    const chained = chainer([f1, f2, f3]);
    expect(chained(1)).toBe(25); // f3(f2(f1(1))) => ((1*2)+3)^2 = 25
  });

  it('should handle a single function', () => {
    const f = x => x + 5;
    const chained = chainer([f]);
    expect(chained(2)).toBe(7);
  });

  it('should handle an empty array of functions', () => {
    const chained = chainer([]);
    expect(chained(10)).toBe(10); // returns input as-is
  });

  it('should handle different input types if functions support them', () => {
    const f1 = s => s + 'a';
    const f2 = s => s + 'b';
    const chained = chainer([f1, f2]);
    expect(chained('x')).toBe('xab');
  });
});

