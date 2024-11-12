'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return not modified second arg if arr of func is empty', () => {
    expect(chainer([])(32)).toBe(32);
  });

  it('should return correct result', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);
    const d = jest.fn((x) => x * 2);

    expect(chainer([a, b, c, d])(2)).toBe(6);
  });

  it('should call each function in the function array once', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);

    chainer([a, b, c])(8);

    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    expect(c).toHaveBeenCalledTimes(1);
  });

  it('should have every func in arr of func to return counted value', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);

    chainer([a, b, c])(5);

    expect(a).toHaveReturnedWith(5);
    expect(b).toHaveReturnedWith(7);
    expect(c).toHaveReturnedWith(6);
  });

  it('should throw an error if func in func array is not a function', () => {
    expect(() => chainer([1])(2)).toThrow();
    expect(() => chainer([[]])(2)).toThrow();
    expect(() => chainer([{}])(2)).toThrow();
  });

  it('should throw an error '
        + `if func array is not an array or not passed`, () => {
    expect(() => chainer()()).toThrow();
  });
});
