'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  const f1 = (x) => {
    return x * 2;
  };

  const f2 = (x) => {
    return x + 2;
  };

  const f3 = (x) => {
    return Math.pow(x, 2);
  };

  it('correct result', () => {
    const result = chainer([f1, f2, f3]);

    expect(result(1)).toBe(16);
  });

  it('empty array', () => {
    const result = chainer([]);

    expect(result(7)).toBe(7);
  });

  it('1 function', () => {
    const result = chainer([f1]);

    expect(result(1)).toBe(2);
  });

  it('2 function', () => {
    const result = chainer([f1, f2]);

    expect(result(1)).toBe(4);
  });
});
