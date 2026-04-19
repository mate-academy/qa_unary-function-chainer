'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should apply all functions from left to right', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  it('should call functions in correct order', () => {
    const f1 = jest.fn((x) => x + 'a');
    const f2 = jest.fn((x) => x + 'b');
    const f3 = jest.fn((x) => x + 'c');

    const chained = chainer([f1, f2, f3]);

    const result = chained('');

    expect(f1).toHaveBeenCalledWith('');
    expect(f2).toHaveBeenCalledWith('a');
    expect(f3).toHaveBeenCalledWith('ab');
    expect(result).toBe('abc');
  });

  it('should return input if functions array is empty', () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42);
    expect(chained('hello')).toBe('hello');
  });

  it('should return result of single function if only one is passed', () => {
    const square = (x) => x * x;
    const chained = chainer([square]);

    expect(chained(5)).toBe(25);
  });

  it('should handle numeric transformations correctly', () => {
    const add1 = (x) => x + 1;
    const double = (x) => x * 2;
    const negate = (x) => -x;

    const chained = chainer([add1, double, negate]);

    expect(chained(3)).toBe(-8);
  });
});
