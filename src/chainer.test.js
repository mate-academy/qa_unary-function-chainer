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

describe('test chainer', () => {
  test('with argument 0', () => {
    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  test('chainer([]) with argument 0 should return 0', () => {
    expect(chainer([])(0)).toBe(0);
  });
});
