'use strict';

describe('chainer function', () => {
  const { chainer } = require('./chainer');

  function f1(x) {
    return x + 10;
  };

  function f2(x) {
    return x + 100;
  };

  function f3(x) {
    return x + 1000;
  };

  let mockedF1, mockedF2, mockedF3;

  beforeEach(() => {
    mockedF1 = jest.fn(f1);
    mockedF2 = jest.fn(f2);
    mockedF3 = jest.fn(f3);
  });

  test('should chain functions provided', () => {
    expect(chainer([mockedF1, mockedF2, mockedF3])(1)).toBe(1111);
  });

  test('should call each function 1 time only', () => {
    chainer([mockedF1, mockedF2, mockedF3])(1);

    expect(mockedF1).toHaveBeenCalledTimes(1);
    expect(mockedF2).toHaveBeenCalledTimes(1);
    expect(mockedF3).toHaveBeenCalledTimes(1);
  });

  test('should pass the correct value to each function', () => {
    chainer([mockedF1, mockedF2, mockedF3])(5);

    expect(mockedF1).toHaveBeenCalledWith(5);
    expect(mockedF2).toHaveBeenCalledWith(15);
    expect(mockedF3).toHaveBeenCalledWith(115);
  });

  test('should work with a single function', () => {
    expect(chainer([mockedF1])(5)).toBe(15);
    expect(mockedF1).toHaveBeenCalledTimes(1);
  });

  test('should work with more than 3 functions', () => {
    const add1 = (x) => x + 1;
    const mult2 = (x) => x * 2;
    const sub3 = (x) => x - 3;
    const pow2 = (x) => x ** 2;
    const div2 = (x) => x / 2;

    expect(chainer([add1, mult2, sub3, pow2, div2])(1)).toBe(0.5);
  });

  test('should be reusable', () => {
    const chainedFn = chainer([mockedF1, mockedF2]);

    expect(chainedFn(1)).toBe(111);
    expect(chainedFn(5)).toBe(115);
    expect(chainedFn(10)).toBe(120);
  });

  test('should work with example case', () => {
    const f1ex = (x) => x * 2;
    const f2ex = (x) => x + 2;
    const f3ex = (x) => Math.pow(x, 2);

    expect(chainer([f1ex, f2ex, f3ex])(0)).toBe(4);
  });
});
