'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const double = (x) => x * 2;
  const addTwo = (x) => x + 2;
  const square = (x) => Math.pow(x, 2);

  it('should return a function', () => {
    expect(typeof chainer([double])).toBe('function');
  });

  it('should return the result from the example', () => {
    expect(chainer([double, addTwo, square])(0)).toBe(4);
  });

  it('should apply functions from left to right', () => {
    expect(chainer([double, addTwo])(3)).toBe(8);
  });

  it('should apply functions in the given order for three functions', () => {
    expect(chainer([addTwo, double, square])(1)).toBe(36);
  });

  it('should work with a single function', () => {
    expect(chainer([double])(4)).toBe(8);
  });

  it('should return the input value for an empty list', () => {
    expect(chainer([])(5)).toBe(5);
  });

  it('should work with negative numbers', () => {
    expect(chainer([square, addTwo])(-3)).toBe(11);
  });

  it('should pass the result of each function to the next one', () => {
    const first = jest.fn((x) => x + 1);
    const second = jest.fn((x) => x * 10);

    chainer([first, second])(1);

    expect(first).toHaveBeenCalledWith(1);
    expect(second).toHaveBeenCalledWith(2);
  });

  it('should call each function exactly once', () => {
    const first = jest.fn((x) => x);
    const second = jest.fn((x) => x);

    chainer([first, second])(1);

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('should not call functions before the chain is invoked', () => {
    const first = jest.fn((x) => x);

    chainer([first]);

    expect(first).not.toHaveBeenCalled();
  });

  it('should give independent results on repeated calls', () => {
    const chain = chainer([double, addTwo]);

    expect(chain(1)).toBe(4);
    expect(chain(5)).toBe(12);
    expect(chain(1)).toBe(4);
  });

  it('should not modify the given list of functions', () => {
    const functions = [double, addTwo];

    chainer(functions)(1);

    expect(functions).toEqual([double, addTwo]);
  });

  it('should work with non-numeric values', () => {
    const addA = (s) => s + 'a';
    const addB = (s) => s + 'b';

    expect(chainer([addA, addB])('x')).toBe('xab');
  });
});
