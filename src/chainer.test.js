"use strict";

const { chainer } = require("./chainer");

describe("chainer function", () => {
  const f1 = jest.fn((x) => x * 2);
  const f2 = jest.fn((x) => x + 2);
  const f3 = jest.fn((x) => Math.pow(x, 2));

  beforeEach(() => {
    f1.mockClear();
    f2.mockClear();
    f3.mockClear();
  })

  it("should be declared", () => {
    expect(chainer).toBeDefined();
  });

  it("should return correct result for one function", () => {
    const result = chainer([f1])(40);

    expect(result).toBe(80);
  });

  it("should return correct result for 3 functions", () => {
    const result = chainer([f1, f2, f3])(10);

    expect(result).toBe(484);
  });

  it("should return correct type", () => {
    const result = chainer([f1, f2, f3])(4);

    expect(typeof result).toBe("number");
  });

  it("should call every function once", () => {
    chainer([f1, f2, f3])(4);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });
});
