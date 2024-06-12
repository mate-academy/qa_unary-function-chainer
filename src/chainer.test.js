'use strict';

const { chainer } = require('./chainer');

describe(`'chainer' function:`, () => {
  let f1, f2, f3, functions;

  beforeEach(() => {
    f1 = jest.fn(x => x * 2);
    f2 = jest.fn(x => x + 2);
    f3 = jest.fn(x => Math.pow(x, 2));

    functions = [f1, f2, f3];
  });

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should be defined`, () => {
    expect(chainer()).toBeDefined();
  });

  it(`should call each function only once`, () => {
    chainer(functions)(2);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it(`should pass the input to the function call`, () => {
    chainer(functions)(2);

    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(4);
    expect(f3).toHaveBeenCalledWith(6);
  });

  it(`should return a correct result for a list of functions`, () => {
    expect(chainer(functions)(2)).toBe(36);
  });

  it(`return the result for the array with one function`, () => {
    const result = chainer([f1])(2);

    expect(result).toBe(4);
  });

  it(`return the initial input for the empty array`, () => {
    const result = chainer([])(2);

    expect(result).toBe(2);
  });

  it(`should pass the input with negative numbers`, () => {
    expect(chainer(functions)(-2)).toBe(4);
  });
});
