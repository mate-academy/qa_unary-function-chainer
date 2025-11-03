"use strict";

describe("chainer", () => {
  const { chainer } = require("./chainer");
  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should return '0'`, () => {
    const arg = 10;
    const first = jest.fn((arg1) => arg1 * arg1);
    const second = jest.fn((arg2) => arg2 + arg2);
    const third = jest.fn((arg3) => arg3 / arg3);
    const fourth = jest.fn((arg4) => arg4 - arg4);
    const result = chainer([first, second, third, fourth])(arg);
    expect(first).toHaveBeenCalledWith(10);
    expect(first).toHaveBeenCalled();
    expect(first.mock.calls).toEqual([[10]]);
    expect(second).toHaveBeenCalledWith(100);
    expect(second).toHaveBeenCalled();
    expect(second.mock.calls).toEqual([[100]]);
    expect(third).toHaveBeenCalledWith(200);
    expect(third).toHaveBeenCalled();
    expect(fourth).toHaveBeenCalledWith(1);
    expect(fourth).toHaveBeenCalled();

    expect(result).toEqual(0);
  });

  it(`should return concated string`, () => {
    const arg = "Gav";
    const first = jest.fn((arg1) => arg1 + arg1);
    const second = jest.fn((arg2) => arg2.slice(0, 3) + "-" + arg2.slice(3));

    const result = chainer([first, second])(arg);
    expect(first).toHaveBeenCalledWith("Gav");
    expect(first).toHaveBeenCalled();

    expect(second).toHaveBeenCalledWith("GavGav");
    expect(second).toHaveBeenCalled();

    expect(result).toEqual("Gav-Gav");
    expect(typeof result === "string").toEqual(true);
  });

  it("should return argument if functions === []", () => {
    const arg = 10;

    const result = chainer([])(arg);

    expect(result).toEqual(arg);
  });

  it("should return number", () => {
    const first = jest.fn((arg1) => arg1 * arg1);
    const second = jest.fn((arg2) => arg2 + arg2);
    expect(typeof chainer([first, second])(10) === "number").toBe(true);
  });
});
