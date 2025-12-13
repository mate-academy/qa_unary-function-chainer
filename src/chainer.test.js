/* eslint-disable max-len */
'use strict';

const { chainer } = require('./chainer');

describe('chainer()', () => {
  let f1, f2, f3;

  beforeEach(() => {
    f1 = jest.fn((x) => x * 2);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => Math.pow(x, 2));
  });

  it('should be a function', () => {
    expect(typeof chainer).toBe('function');
  });

  it('should return a function when called', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should return the input value if the functions list is empty', () => {
    const chained = chainer([]);

    expect(chained(10)).toBe(10);
    expect(chained('hello')).toBe('hello');
  });

  it('should work with a single function', () => {
    const chained = chainer([f1]);

    expect(chained(10)).toBe(20);
  });

  it('should work with multiple functions', () => {});

  it('should chain unary functions in left-to-right order', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  it('should work with strings', () => {
    const addA = (x) => x + 'a';
    const addB = (x) => x + 'b';

    const chained = chainer([addA, addB]);

    expect(chained('')).toBe('ab');
  });

  it('should pass the output of one function as the input to the next', () => {
    const chained = chainer([f1, f2, f3]);
    const finalResult = chained(5);

    expect(finalResult).toBe(144);

    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(10);
    expect(f3).toHaveBeenCalledWith(12);
  });

  it('should handle mock functions with hardcoded return values', () => {
    const mock1 = jest.fn().mockReturnValue(100);
    const mock2 = jest.fn().mockReturnValue(200);

    const chained = chainer([mock1, mock2]);

    expect(chained(5)).toBe(200);
    expect(mock1).toHaveBeenCalledWith(5);
    expect(mock2).toHaveBeenCalledWith(100);
  });
});
