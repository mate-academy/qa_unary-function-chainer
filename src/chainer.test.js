'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should chain unary functions', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  it('should apply functions from left to right', () => {
    const f1 = x => x + 1;
    const f2 = x => x * 2;
    const f3 = x => x - 3;

    const chained = chainer([f1, f2, f3]);

    expect(chained(5)).toBe(9);
  });
});
