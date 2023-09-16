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
  it('should chain and apply the unary functions correctly while x = 0', () => {
    const chainedFunction0 = chainer([f1, f2, f3])(0);

    expect(chainedFunction0).toEqual(4);
  });

  it('should chain and apply the unary functions correctly while x = 2', () => {
    const chainedFunction1 = chainer([f1, f2, f3])(2);

    expect(chainedFunction1).toEqual(36);
  });

  it('should chain and apply the unary functions correctly while x = -3'
  + 'correctly while x = -3', () => {
    const chainedFunction2 = chainer([f1, f2, f3])(-3);

    expect(chainedFunction2).toEqual(16);
  });

  it('should handle an empty array of functions', () => {
    const chainedFunction3 = chainer([])(5);

    expect(chainedFunction3).toEqual(5);
  });

  it('should handle missing arguments', () => {
    const chainedFunction4 = chainer([f1, f2, f3])();

    expect(chainedFunction4).toEqual(NaN);
  });
});
