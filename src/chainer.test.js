'use strict';

const { chainer } = require('./chainer');

// przykładowe funkcje unarne
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
  test('działa z pustą listą funkcji', () => {
    expect(chainer([])(5)).toBe(5);
  });

  test('działa z jedną funkcją', () => {
    expect(chainer([f1])(3)).toBe(6);
  });

  test('działa z trzema funkcjami', () => {
    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });
});
