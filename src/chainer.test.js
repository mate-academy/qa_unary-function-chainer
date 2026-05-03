'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should return a function for non-empty input', () => {
    const result = chainer([(x) => x]);

    expect(typeof result).toBe('function');
  });

  it('should return the initial value when functions array is empty', () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  it('should apply a single function once', () => {
    const result = chainer([(x) => x * 2])(3);

    expect(result).toBe(6);
  });

  it('should chain multiple functions left-to-right', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => x ** 2;

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it('should pass each result to the next function', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => x - 2);

    const result = chainer([f1, f2, f3])(2);

    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(3);
    expect(f3).toHaveBeenCalledWith(9);
    expect(result).toBe(7);
  });

  it('should work with non-numeric values', () => {
    const f1 = (s) => s + '!';
    const f2 = (s) => s.toUpperCase();

    const result = chainer([f1, f2])('hi');

    expect(result).toBe('HI!');
  });

  it('should not mutate the original functions array', () => {
    const fn = (x) => x;
    const functions = [fn, fn, fn];
    const functionsCopy = [...functions];

    chainer(functions)(1);

    expect(functions).toEqual(functionsCopy);
  });
});
