"use strict";

describe("chainer", () => {
  const { chainer } = require("./chainer");

  it("should be declared", () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it("should work with just 1 function", () => {
    const a = jest.fn((x) => x + 2);

    expect(chainer([a])(0)).toBe(2);
  });

  it("should work with multiple functions", () => {
    const a = jest.fn((x) => x * 2);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => Math.pow(x, 2));

    expect(chainer([a, b, c])(0)).toBe(4);
  });

  it("should call each function exactly 1 time", () => {
    const a = jest.fn();
    const b = jest.fn();
    const c = jest.fn();

    chainer([a, b, c])();

    expect(a).toHaveBeenCalled();
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalled();
    expect(b).toHaveBeenCalledTimes(1);
    expect(c).toHaveBeenCalled();
    expect(c).toHaveBeenCalledTimes(1);
  });

  it("should chain all functions in a correct order", () => {
    const a = jest.fn((ch) => ch + "k");
    const b = jest.fn((ch) => ch + "a");
    const c = jest.fn((ch) => ch + "y");

    expect(chainer([a, b, c])("o")).toBe("okay");
  });

  it("should work with a long array of functions", () => {
    const a = jest.fn((x) => x + 1);
    const b = jest.fn((x) => x.toString());

    const functions = Array(250).fill(a);

    functions.push(b);

    expect(chainer(functions)(0)).toBe("250");
  });
});
