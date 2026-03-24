/** @typedef {import('@types/jest')} */
'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let f1, f2, f3;

  beforeEach(() => {
    f1 = (x) => x * 2;
    f2 = (x) => x + 2;
    f3 = (x) => Math.pow(x, 2);
  });

  it('should correctly process chain f1-f2-f3', () => {
    const composed = chainer([f1, f2, f3]);

    expect(composed(0)).toBe(4);
  });

  it('should depend on the order function (f3-f2-f1)', () => {
    const composed = chainer([f3, f2, f1]);

    expect(composed(3)).toBe(22);
  });

  it('should return input value when function list is empty', () => {
    const composed = chainer([]);

    expect(composed(1050)).toBe(1050);
  });

  it('should call each function exactly once with correct arguments', () => {
    const m1 = jest.fn(f1);
    const m2 = jest.fn(f2);
    const m3 = jest.fn(f3);

    const composed = chainer([m1, m2, m3]);
    const result = composed(2);

    expect(result).toBe(36);

    expect(m1).toHaveBeenCalledWith(2);
    expect(m2).toHaveBeenCalledWith(4);
    expect(m3).toHaveBeenCalledWith(6);

    expect(m1).toHaveBeenCalledTimes(1);
    expect(m2).toHaveBeenCalledTimes(1);
    expect(m3).toHaveBeenCalledTimes(1);
  });
});
