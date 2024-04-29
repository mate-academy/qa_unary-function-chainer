'use strict';

const { chainer } = require('./chainer');

describe(`Function 'chainer':`, () => {
  let f1;
  let f2;
  let f3;

  beforeEach(() => {
    f1 = jest.fn((x) => x * 2);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => Math.pow(x, 2));
  });

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should return result for valid arguments`, () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).not.toBeUndefined();
  });

  it(`should return NaN for invalid argument`, () => {
    const result = chainer([f1, f2, f3])();

    expect(result).toBeNaN();
  });

  it(`should return the same argument for empty array of functions`, () => {
    const result = chainer([])(0);

    expect(result).toBe(0);
  });

  it(`should return right result of execution chain functions`, () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it(`should execute each function once`, () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it(`should execute each function with correct argument`, () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
    expect(f1.mock.calls[0]).toEqual([0]);
    expect(f2).toHaveBeenNthCalledWith(1, 0);
    expect(f3).toHaveBeenCalledWith(2);
  });

  it(`should execute correct chain of function`, () => {
    const result = chainer([f1, f3])(2);

    expect(result).toBe(16);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).not.toHaveBeenCalled();
    expect(f3).toHaveBeenCalledTimes(1);
  });
});
