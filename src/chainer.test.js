'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let f1, f2, f3, res;

  beforeEach(() => {
    f1 = jest.fn((x) => x + 2);
    f2 = jest.fn((x) => x * 2);
    f3 = jest.fn((x) => Math.pow(x, 2));

    const chained = chainer([f1, f2, f3]);

    res = chained(2);
  });

  it('should return right result after moving through all '
    + 'functions in the specified order', () => {
    expect(res).toBe(64);

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
