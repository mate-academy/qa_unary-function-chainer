'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should return a function that does a left
fold on the given functions`, () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
  });

  it(`should return the correct result`, () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });
});
