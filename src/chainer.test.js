'use strict';

describe('chainer', () => {
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

  function f4(x) {
    return x - 3;
  }

  function f5(x) {
    return x / 2;
  }

  it(`should chain functions f1, f2, f3 with input 0`, () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it(`should chain functions f1, f2, f3 with input 1`, () => {
    const result = chainer([f1, f2, f3])(1);

    expect(result).toBe(16);
  });

  it(`should chain functions f1, f2, f3 with input 2`, () => {
    const result = chainer([f1, f2, f3])(2);

    expect(result).toBe(36);
  });

  it(`should return input when function list is empty with input 5`, () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  it(`should chain signle function f1 with input 3`, () => {
    const result = chainer([f1])(3);

    expect(result).toBe(6);
  });

  it(`should chain multiple function f1 with input 3`, () => {
    const result = chainer([f1, f1, f1])(3);

    expect(result).toBe(24);
  });

  it(`should chain functions f4, f5 with input 10`, () => {
    const result = chainer([f4, f5])(10);

    expect(result).toBe(3.5);
  });

  it(`shoud chain functions f3, f4, f1 with input 2`, () => {
    const result = chainer([f3, f4, f1])(2);

    expect(result).toBe(2);
  });

  it(`should chain functions f5, f1, f2 with input 8`, () => {
    const result = chainer([f5, f1, f2])(8);

    expect(result).toBe(10);
  });

  it(`should chain functions f2, f3, f4 with input 3`, () => {
    const result = chainer([f2, f3, f4])(3);

    expect(result).toBe(22);
  });

  it(`should chain functions f1, f5, f3 with input 4`, () => {
    const result = chainer([f1, f5, f3])(4);

    expect(result).toBe(16);
  });

  it(`should chain functions f4, f2, f1 with input 5`, () => {
    const result = chainer([f4, f2, f1])(5);

    expect(result).toBe(8);
  });
});
