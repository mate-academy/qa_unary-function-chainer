'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should correctly chain functions', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);

    const result = chainer([f1, f2])(2);

    expect(result).toBe(6);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
  });

  it('should return value if empty array as argument', () => {
    const result = chainer([])(2);

    expect(result).toBe(2);
  });

  it('should correctly apply a single function', () => {
    const f1 = jest.fn((x) => x * 2);

    const result = chainer([f1])(2);

    expect(result).toBe(4);
    expect(f1).toHaveBeenCalledTimes(1);
  });
});
