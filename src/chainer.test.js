// eslint-disable-next-line strict
"use_strict";

const { chainer } = require("./chainer");

describe("chainer", () => {
  function f1(x) {
    return x * 2;
  }

  function f2(x) {
    return x + 2;
  }

  function f3(x) {
    return Math.pow(x, 2);
  }

  it("should return right value", () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it("should call each fuction once ", () => {
    const mockF1 = jest.fn(f1);
    const mockF2 = jest.fn(f2);
    const mockF3 = jest.fn(f3);

    chainer([mockF1, mockF2, mockF3])(0);

    expect(mockF1).toHaveBeenCalledTimes(1);
    expect(mockF2).toHaveBeenCalledTimes(1);
    expect(mockF3).toHaveBeenCalledTimes(1);
  });

  it("should f1 return value === f2 argument", () => {
    const mockF1 = jest.fn().mockReturnValue("valueFromF1");
    const mockF2 = jest.fn(f2);
    const mockF3 = jest.fn(f3);

    chainer([mockF1, mockF2, mockF3])(0);

    expect(mockF2).toHaveBeenCalledWith("valueFromF1");
  });

  it("should handle empty function array", () => {
    const result = chainer([])(0);

    expect(result).toBe(0);
  });
});
