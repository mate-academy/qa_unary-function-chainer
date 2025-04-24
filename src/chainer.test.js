'use strict';

const { chainer } = require('./chainer');

describe('chainer test suite', () => {
  it('should run all 3 functions', () => {
    const f1 = (x) => {
      return x + 1;
    };
    const f2 = (x) => {
      return x + 2;
    };
    const f3 = (x) => {
      return x + 3;
    };

    expect(chainer([f1, f2, f3])(1)).toBe(7);
  });

  it('should run 2 functions', () => {
    const f1 = (x) => {
      return x * x;
    };
    const f2 = (x) => {
      return x * x * x;
    };

    expect(chainer([f1, f2])(2)).toBe(64);
  });
});
