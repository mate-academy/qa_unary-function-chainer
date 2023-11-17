'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should return function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('that called every func and return result', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const func = chainer([f1, f2, f3]);
    const result = func(0);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
    expect(result).toBe(4);
  });
});
