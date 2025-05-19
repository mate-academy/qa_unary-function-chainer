'use strict';

describe('chainer function', () => {
  const { chainer } = require('./chainer');

  it('returns 15 if `x` = 5', () => {
    const first = jest.fn((arg) => arg * 2);
    const second = jest.fn((arg) => arg / 5);
    const third = jest.fn((arg) => arg + 13);

    const result = chainer([first, second, third])(5);

    expect(first).toHaveBeenCalled();
    expect(second).toHaveBeenCalled();
    expect(third).toHaveBeenCalled();
    expect(result).toBe(15);
  });
});
