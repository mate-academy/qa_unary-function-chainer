'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('should works correctly with a single function', () => {
    const f1 = (x) => x * 2;

    expect(chainer([f1])(2)).toBe(4);
  });

  it('should works correctly with multiple functions', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const result = chainer([f1, f2, f3])(2);

    expect(result).toBe(36);
  });

  test('should calls functions in a correct order', () => {
    const f1 = jest.fn((x) => x + 2);
    const f2 = jest.fn((x) => x * 2);

    const chain = chainer([f1, f2]);
    const result = chain(2);

    expect(result).toBe(8);
    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(4);
  });
});
