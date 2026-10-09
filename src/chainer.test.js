'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should chain multiple functions correctly (basic math)', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const chainedFn = chainer([f1, f2, f3]);

    expect(chainedFn(0)).toBe(4);
  });

  it('should work with a single function', () => {
    const double = (x) => x * 5;
    const chainedFn = chainer([double]);

    expect(chainedFn(3)).toBe(15);
  });

  it('should return the input value if the functions array is empty', () => {
    const chainedFn = chainer([]);

    expect(chainedFn(10)).toBe(10);
  });

  it('should work with string manipulation functions', () => {
    const addExclamation = (str) => str + '!';
    const toUpper = (str) => str.toUpperCase();
    const repeat = (str) => str.repeat(2);

    const chainedFn = chainer([addExclamation, toUpper, repeat]);

    expect(chainedFn('hello')).toBe('HELLO!HELLO!');
  });

  it('should handle a long chain of simple operations', () => {
    const addOne = (x) => x + 1;
    const functions = Array(10).fill(addOne);
    const chainedFn = chainer(functions);

    expect(chainedFn(0)).toBe(10);
  });
});
