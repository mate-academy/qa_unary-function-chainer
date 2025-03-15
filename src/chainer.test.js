'use strict'

const { chainer } = require('./chainer');

describe('chainer', () => {
  let f1, f2, f3;

  beforeEach(() => {
    f1 = jest.fn((x) => x * 2);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => Math.pow(x, 2));
  });

  it('should return a function', () => {
    const functions = [f1, f2, f3];

    expect(typeof chainer(functions)).toBe('function');
  });

  it('should call functions only once per each', () => {
    const functions = [f1, f2, f3];
    chainer(functions)(0);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should call functions inthe correct order with correct arguments', () => {
    const functions = [f1, f2, f3];
    chainer(functions)(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
  });

  it('should return the same value if the array is empty', () => {
    expect(chainer([])(5)).toBe(5);
  });

  it('should work if the array has 1 function ', () => {
    expect(chainer([f1])(3)).toBe(6);
  });
});
