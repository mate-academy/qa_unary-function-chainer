'use strict';

describe('Function chainer', () => {
  const { chainer } = require('./chainer');

  it('should  be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it(`should call every function in 'functions' one time`, () => {
    const func1 = jest.fn();
    const func2 = jest.fn();
    const func3 = jest.fn();

    const arr = [func1, func2, func3];

    chainer(arr)();

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
    expect(func3).toHaveBeenCalledTimes(1);
  });

  it('should work with empty array of functions', () => {
    expect(chainer([])(10)).toBe(10);
  });

  it('should chain a large nummers of functions', () => {
    const f = jest.fn();
    const functions = Array(500).fill(f);

    chainer(functions)();

    expect(f).toHaveBeenCalledTimes(500);
  });

  it('should return the correct result', () => {
    const f1 = (x) => x * 10;
    const f2 = (x) => x - 2;
    const f3 = (x) => x + 5;

    expect(chainer([f1, f2, f3])(10)).toBe(103);
  });
});
