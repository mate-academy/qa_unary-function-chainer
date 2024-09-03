'use strict';

const { chainer } = require('./chainer');

describe(`'chainer' function`, () => {
  const f1 = (x) => x * 2;
  const f2 = (x) => x + 2;
  const f3 = (x) => Math.pow(x, 2);

  it('should work correctly with many functions', () => {
    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  it('should work correctly with 1 function', () => {
    expect(chainer([f1])(10)).toBe(20);
  });
});
