"use strict";
const { chainer } = require("./chainer");

describe("chainer function tests", () => {
  let a, b, c;

  beforeEach(() => {
    a = jest.fn((x) => x * 2);
    b = jest.fn(() => 0);
    c = jest.fn((x) => x + 1);
  });

  it("should be an instance of the function", () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it("should return a function after the first call", () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it("should return zero", () => {
    const result = chainer([b])(0);

    expect(result).toBe(0);
  });

  it("should return NaN if there is no params", () => {
    const result = chainer([a, c])();

    expect(result).toBeNaN();
  });

  it("should do a left fold to the given functions", () => {
    const result = chainer([a, b, c])(0);

    expect(result).toBe(1);
  });

  it("should call each callback only once", () => {
    chainer([a, b, c])(0);

    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    expect(c).toHaveBeenCalledTimes(1);
  });

  it("should work with the array initial value", () => {
    const cb = (args) => args.map((el) => el * 2);
    const cb1 = (args) => args.map((el) => el * 3);
    const result = chainer([cb, cb1])([1, 2, 3]);

    expect(result).toStrictEqual([6, 12, 18]);
  });
});
