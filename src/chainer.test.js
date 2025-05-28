/* eslint-disable no-shadow */
'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const f1 = x => x * 2;
  const f2 = x => x + 2;
  const f3 = x => Math.pow(x, 2);

  it('should apply functions from left to right', () => {
    const fn = chainer([f1, f2, f3]);

    expect(fn(0)).toBe(4);
    expect(fn(1)).toBe(16);
  });

  it('should return original value if no functions are given', () => {
    const fn = chainer([]);

    expect(fn(42)).toBe(42);
  });

  it('should work with one function', () => {
    const fn = chainer([f2]);

    expect(fn(10)).toBe(12);
  });

  it('should support complex chaining', () => {
    const fn = chainer([
      x => x + 1,
      x => x * 3,
      x => x - 2,
      x => x / 2,
    ]);

    expect(fn(4)).toBe(((4 + 1) * 3 - 2) / 2);
  });

  it('should call all functions in order', () => {
    const calls = [];
    const f1 = x => {
      calls.push('f1');

      return x + 1;
    };
    const f2 = x => {
      calls.push('f2');

      return x * 2;
    };
    const f3 = x => {
      calls.push('f3');

      return x - 3;
    };

    const fn = chainer([f1, f2, f3]);

    fn(5);

    expect(calls).toEqual(['f1', 'f2', 'f3']);
  });
});
