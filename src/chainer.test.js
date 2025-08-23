'use strict';

describe('isChainer', () => {
  const { chainer } = require('./chainer');
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

  it('should return 4 when chaining f1, f2, and f3', () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).toEqual(4);
  });

  it('should return function first call', () => {
    const result = chainer([f1, f2, f3]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should call all functions in order', () => {
    chainer([f1, f2, f3])(2);

    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(4);
    expect(f3).toHaveBeenCalledWith(6);
  });

  it('should call each function exactly once per input', () => {
    chainer([f1, f2, f3])(5);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should throw if non-function is provided', () => {
    expect(() => chainer([f1, 123, f3])(2)).toThrow();
  });

  it('should handle empty array of functions', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  it('should handle single function', () => {
    const result = chainer([f2])(5); // 5+2 = 7

    expect(result).toBe(7);
  });
});
