'use strict';

const { chainer } = require('./chainer');

function f1(x) {
  return x * 2;
};

function f2(x) {
  return x + 2;
};

function f3(x) {
  return Math.pow(x, 2);
};

describe('chainer function', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return function', () => {
    const result = chainer();

    expect(result).toBeInstanceOf(Function);
  });

  it('should correctly chain multiply functions', () => {
    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(0)).toBe(4);
    expect(chainedFunction(2)).toBe(36);
  });

  it('should correctly chain single function', () => {
    const chainedFunction = chainer([f1]);

    expect(chainedFunction(2)).toBe(4);
  });

  it('should return input if functions are not provided', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(5)).toBe(5);
  });

  it('should handle different operations', () => {
    const chainedFunction = chainer([
      (x) => x - 1,
      (x) => x * 3,
      (x) => x / 2,
    ]);

    expect(chainedFunction(3)).toBe(3);
    expect(chainedFunction(10)).toBe(13.5);
  });

  it(`should return 'NaN' for 'undefined' input`, () => {
    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(undefined)).toBeNaN();
  });

  it(`should take 'null' input as 0 number`, () => {
    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction(null)).toBe(4);
  });

  it(`should handle string numbers, ex.: '2'`, () => {
    const chainedFunction = chainer([f1, f2, f3]);

    expect(chainedFunction('2')).toBe(36);
  });
});
