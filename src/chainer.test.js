'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction).toBeInstanceOf(Function);
  });

  it('should apply functions in the correct order', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const chainedFunction = chainer([f1, f2, f3]);
    const result = chainedFunction(2);

    expect(result).toBe(36);
  });

  it('should return the initial value if no functions are provided', () => {
    const chainedFunction = chainer([]);
    const result = chainedFunction(5);

    expect(result).toBe(5);
  });

  it('should work with a single function', () => {
    function f1(x) {
      return x + 10;
    }

    const chainedFunction = chainer([f1]);
    const result = chainedFunction(5);

    expect(result).toBe(15);
  });

  it('should handle multiple functions correctly', () => {
    function f1(x) {
      return x + 1;
    }

    function f2(x) {
      return x * 2;
    }

    function f3(x) {
      return x - 3;
    }

    const chainedFunction = chainer([f1, f2, f3]);
    const result = chainedFunction(2);

    expect(result).toBe(3);
  });

  it('should handle negative numbers correctly', () => {
    function f1(x) {
      return x - 2;
    }

    function f2(x) {
      return x * 3;
    }

    const chainedFunction = chainer([f1, f2]);
    const result = chainedFunction(-1);

    expect(result).toBe(-9);
  });
});
