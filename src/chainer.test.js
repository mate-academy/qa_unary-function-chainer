'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  let f1;
  let f2;
  let f3;
  let args;

  beforeEach(() => {
    f1 = jest.fn((x) => x * 2);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => Math.pow(x, 2));
  });

  it(`when array 'args' has multiple fns`, () => {
    args = [f1, f2, f3];

    const resultChainer = chainer(args);
    const resultUnarFns = resultChainer(10);

    expect(f1).toHaveBeenCalledWith(10);
    expect(f2).toHaveBeenCalledWith(20);
    expect(f3).toHaveBeenCalledWith(22);

    expect(resultUnarFns).toBe(484);
  });

  it(`when array 'args' has one fn`, () => {
    args = [f1];

    const resultChainer = chainer(args);
    const resultUnarFns = resultChainer(10);

    expect(f1).toHaveBeenCalledWith(10);

    expect(resultUnarFns).toBe(20);
  });

  it(`when array 'args' is empty`, () => {
    args = [];

    const resultChainer = chainer(args);
    const resultUnarFns = resultChainer(10);

    expect(resultUnarFns).toBe(10);
  });
});
