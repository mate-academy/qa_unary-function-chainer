'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let f1, f2, f3, result;

  beforeEach(() => {
    f1 = jest.fn((x) => x + 2);
    f2 = jest.fn((x) => x * 2);
    f3 = jest.fn((x) => Math.pow(x, 2));

    const composed = chainer([f1, f2, f3]);

    result = composed(2);
  });

  it('correctly composes all functions from left to right', () => {
    expect(result).toBe(64);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);

    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(4);
    expect(f3).toHaveBeenCalledWith(8);

    expect(f1.mock.invocationCallOrder[0])
      .toBeLessThan(f2.mock.invocationCallOrder[0]);

    expect(f2.mock.invocationCallOrder[0])
      .toBeLessThan(f3.mock.invocationCallOrder[0]);
  });
});
