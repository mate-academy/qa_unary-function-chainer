'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const double = (x) => x * 2;
  const addTwo = (x) => x + 2;
  const square = (x) => Math.pow(x, 2);

  it('should return a function', () => {
    expect(typeof chainer([double])).toBe('function');
  });

  it('should apply a single function to the input', () => {
    expect(chainer([double])(5)).toBe(10);
  });

  it('should apply functions from left to right', () => {
    expect(chainer([double, addTwo, square])(0)).toBe(4);
  });

  it('should depend on the order of the functions', () => {
    expect(chainer([square, addTwo, double])(0)).toBe(4);
    expect(chainer([addTwo, double, square])(0)).toBe(16);
  });

  it('should return the input unchanged for an empty list', () => {
    expect(chainer([])(7)).toBe(7);
  });

  it('should work with strings', () => {
    const trim = (x) => x.trim();
    const upper = (x) => x.toUpperCase();

    expect(chainer([trim, upper])('  mate  ')).toBe('MATE');
  });
});
