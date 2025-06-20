'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should return a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should apply all functions from left to right', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it('should return the input if function list is empty', () => {
    const input = 42;
    const result = chainer([])(input);

    expect(result).toBe(input);
  });

  it('should work with a single function', () => {
    const fn = (x) => x + 10;
    const result = chainer([fn])(5);

    expect(result).toBe(15);
  });

  it('should correctly handle multiple functions', () => {
    const f1 = (x) => x + 1;
    const f2 = (x) => x * 3;
    const f3 = (x) => x - 4;

    const result = chainer([f1, f2, f3])(1);

    expect(result).toBe(2);
  });

  it('should pass intermediate result through the chain', () => {
    const log = [];
    const f1 = (x) => {
      log.push(`f1:${x}`);

      return x + 1;
    };
    const f2 = (x) => {
      log.push(`f2:${x}`);

      return x * 2;
    };
    const f3 = (x) => {
      log.push(`f3:${x}`);

      return x - 3;
    };

    const result = chainer([f1, f2, f3])(1);

    expect(result).toBe(((1 + 1) * 2) - 3);
    expect(log).toEqual(['f1:1', 'f2:2', 'f3:4']);
  });
});
