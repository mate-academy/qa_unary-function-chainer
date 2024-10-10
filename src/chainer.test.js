'use strict';

const { chainer } = require('./chainer');

describe(`'chainer' function`, () => {
  let f1;
  let f2;
  let f3;
  let f4;

  beforeEach(() => {
    f1 = jest.fn((x) => x + 1);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => x + 3);
    f4 = jest.fn((x) => x + 4);
  });

  it('should return a function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('should chain functions calls', () => {
    const items = [f1, f2, f3, f4];

    chainer(items)(1);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
    expect(f4).toHaveBeenCalledTimes(1);
  });

  it('should return a value of chains of functions', () => {
    const items = [f1, f2, f3, f4];
    const result = chainer(items)(2);

    expect(result).toBe(12);
  });

  it('should return an initial value if no functions', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  it('should work correctly with one function', () => {
    const result = chainer([f1])(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(result).toBe(6);
  });
});
