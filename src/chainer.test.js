'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should chain multiple unary functions and apply them in sequence', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const chainedFunction = chainer([f1, f2, f3]);
    const result = chainedFunction(0);

    expect(result).toBe(4);
  });

  it('should return the input if no functions are provided', () => {
    const chainedFunction = chainer([]);
    const result = chainedFunction(5);

    expect(result).toBe(5);
  });

  it('should handle a single function correctly', () => {
    const f1 = (x) => x + 10;
    const chainedFunction = chainer([f1]);

    const result = chainedFunction(5);

    expect(result).toBe(15);
  });

  it('should handle identity function', () => {
    const identity = (x) => x;
    const chainedFunction = chainer([identity]);

    const result = chainedFunction(7);

    expect(result).toBe(7);
  });

  it('should work with functions that return different types', () => {
    const f1 = (x) => x + 1;
    const f2 = (x) => `Result is ${x}`;
    const chainedFunction = chainer([f1, f2]);

    const result = chainedFunction(4);

    expect(result).toBe('Result is 5');
  });
});
