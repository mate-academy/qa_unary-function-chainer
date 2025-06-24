/* eslint-disable max-len */
'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should call all functions in a correct order and return correct result', () => {
    const f1 = jest.fn(x => x + 2);
    const f2 = jest.fn(x => x * 0.5);
    const f3 = jest.fn(x => x + x);

    const chainedFn = chainer([f1, f2, f3]);
    const result = chainedFn(0);

    expect(result).toBe(2);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(2);
    expect(f3).toHaveBeenCalledWith(1);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should not call any functions without execution', () => {
    const f1 = jest.fn(x => x + 2);
    const f2 = jest.fn(x => x * 0.5);

    chainer([f1, f2]);

    expect(f1).not.toHaveBeenCalled();
    expect(f2).not.toHaveBeenCalled();
  });

  it('should return NaN for call with no argument', () => {
    const f1 = jest.fn(x => x + 2);
    const f2 = jest.fn(x => x * 0.5);

    const chainedFn = chainer([f1, f2]);
    const result = chainedFn();

    expect(result).toBeNaN();

    expect(f1).toHaveBeenCalledWith(undefined);
    expect(f2).toHaveBeenCalledWith(NaN);
  });

  it('should work with a single function', () => {
    const f1 = jest.fn(x => x + 2);

    const chainedFn = chainer([f1]);
    const result = chainedFn(0);

    expect(result).toBe(2);

    expect(f1).toHaveBeenCalledWith(0);

    expect(f1).toHaveBeenCalledTimes(1);
  });
});
