'use strict';

describe('ifElse', () => {
  const { chainer } = require('./chainer');

  it('should return 4 for a standart test call', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    expect(chainer([f1, f2, f3])(0))
      .toBe(4);
  });

  it('each function must be called with the appropriate argument', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
  });

  it('should return undefined for call with an empty array', () => {
    expect(chainer([])()).toBeUndefined();
  });
});
