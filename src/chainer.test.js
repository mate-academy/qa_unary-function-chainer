'use strict';

const { chainer } = require('./chainer');

describe('Chainer', () => {
  it('should apply each function from array to the input', () => {
    const addOne = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const funcsArray = [addOne, double, square];
    const chainedFunction = chainer(funcsArray);

    expect(chainedFunction(2)).toBe(36);
  });

  it('should handle negative input', () => {
    const addOne = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const funcsArray = [addOne, double, square];
    const chainedFunction = chainer(funcsArray);

    expect(chainedFunction(-3)).toBe(16);
  });

  it('should handle "undefined" input', () => {
    const addOne = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const funcsArray = [addOne, double, square];
    const chainedFunction = chainer(funcsArray);

    expect(chainedFunction(undefined)).toBe(NaN);
  });

  it('should handle "null" input', () => {
    const addOne = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const funcsArray = [addOne, double, square];
    const chainedFunction = chainer(funcsArray);

    expect(chainedFunction(null)).toBe(4);
  });

  it('should return "Nan" when runned without input', () => {
    const addOne = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const funcsArray = [addOne, double, square];
    const chainedFunction = chainer(funcsArray);

    expect(chainedFunction()).toBe(NaN);
  });
});
