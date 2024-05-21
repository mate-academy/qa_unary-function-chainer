'use strict';

const { chainer } = require('./chainer');

function f1(x) {
  return x * 2;
}

function f2(x) {
  return x + 2;
}

function f3(x) {
  return Math.pow(x, 2);
}

describe('chainer', () => {
  it('should chain functions together correctly', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
    expect(chained(2)).toBe(36);
  });

  it('should return the input if no functions are provided', () => {
    const chained = chainer([]);

    expect(chained(2)).toBe(2);
  });

  it('should work with a single function', () => {
    const chained = chainer([f1]);

    expect(chained(1)).toBe(2);
  });

  it('should work with multiple functions', () => {
    const chained = chainer([f1, f2]);

    expect(chained(2)).toBe(6);
  });

  it('should handle indentity function correctly', () => {
    const indentity = x => x;
    const chained
        = chainer([indentity, f1, indentity, f2, indentity, f3, indentity]);

    expect(chained(0)).toBe(4);
    expect(chained(1)).toBe(16);
  });
});
