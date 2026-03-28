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
  it('returns a function', () => {
    const resultFn = chainer([f1, f2, f3]);

    expect(typeof resultFn).toBe('function');
  });

  it('correctly chains functions left to right', () => {
    const chain = chainer([f1, f2, f3]);

    expect(chain(0)).toBe(4);
  });

  it('works with a single function', () => {
    const chain = chainer([f2]);

    expect(chain(3)).toBe(5);
  });

  it('works with no functions (identity)', () => {
    const chain = chainer([]);

    expect(chain(40)).toBe(40);
  });
});
