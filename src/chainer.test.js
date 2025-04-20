'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('`chainer` should imply pipeline for an array of fanctions', () => {
    const multiply = (x) => x * 2;
    const add = (x) => x + 1;
    const square = (x) => x ** 2;

    const functions = [multiply, add, square];
    const chainedFunction = chainer(functions);

    expect(chainedFunction(10)).toBe(441);
  });
});
