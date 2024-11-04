'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return second arg if arr of func is empty', () => {
    expect(chainer([])(2)).toBe(2);
  });

  it('should return correct result', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);

    expect(chainer([a, b, c])(2)).toBe(3);
  });

  it('should call every function in function array', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);

    chainer([c, b, a])(10);

    expect(a).toHaveBeenCalled();
    expect(b).toHaveBeenCalled();
    expect(b).toHaveBeenCalled();
  });

  it('should pass previous func result to next func', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);

    chainer([c, b, a])(9);

    expect(a.mock.calls[0][0]).toBe(10);
    expect(b.mock.calls[0][0]).toBe(8);
    expect(c.mock.calls[0][0]).toBe(9);
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
