"use strict";

const { chainer } = require("./chainer");

describe("chainer", () => {
  let func1;
  let func2;
  let func3;

  beforeEach(() => {
    func1 = jest.fn((x) => x + 1);
    func2 = jest.fn((x) => x * 2);
    func3 = jest.fn((x) => x - 3);
  });

  it("should return a function", () => {
    const functions = [jest.fn()];
    const result = chainer(functions);

    expect(typeof result).toBe("function");
  });

  it("should correctly chain multiple functions", () => {
    const result = chainer([func1, func2, func3])(5);

    expect(func1).toHaveBeenCalledWith(5);
    expect(func2).toHaveBeenCalledWith(6);
    expect(func3).toHaveBeenCalledWith(12);

    expect(result).toBe(9);
  });

  it("should handle empty array of functions", () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });

  it("should call each function only once", () => {
    chainer([func1, func2, func3])(5);

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
    expect(func3).toHaveBeenCalledTimes(1);
  });

  it("should pass the result of each function to the next", () => {
    const chainedFunction = chainer([func1, func2, func3]);

    const result = chainedFunction(3);

    expect(func1).toHaveBeenCalledWith(3);
    expect(func2).toHaveBeenCalledWith(4);
    expect(func3).toHaveBeenCalledWith(8);

    expect(result).toBe(5);
  });
});
