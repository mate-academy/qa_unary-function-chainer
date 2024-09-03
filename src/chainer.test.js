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

describe(`'chainer' function`, () => {
  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should work correctly with many functions', () => {
    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  it('should work correctly with 1 function', () => {
    expect(chainer([f1])(10)).toBe(20);
  });
});
