'use strict';

const {
  chainer,
} = require('./chainer');

describe('chainer', () => {
  it('should return correct result ', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it('should return input if no function is provided', () => {
    const result = chainer([])(9);

    expect(result).toBe(9);
  });

  it('should return a function', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const result = chainer([f1, f2]);

    expect(typeof result).toBe('function');
  });

  it('should return correct result with negative numbers', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const result = chainer([f1, f2, f3])(-2);

    expect(result).toBe(4);
  });

  it('works with only one function', () => {
    const f1 = x => x * 2;
    const result = chainer([f1])(2);

    expect(result).toBe(4);
  });
});
