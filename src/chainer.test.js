"use strict";

const { chainer } = require("./chainer");

describe("should handle all cases", () => {
  const f1 = jest.fn((x) => x * 2);
  const f2 = jest.fn((x) => x + 2);
  const f3 = jest.fn((x) => Math.pow(x, 2));

  it("should return 4 for chainer([f1, f2, f3])(0)", () => {
    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  it("should return 16 for chainer([f1, f2, f3])(1)", () => {
    expect(chainer([f1, f2, f3])(1)).toBe(16);
  });

  it("should return -2 for chainer([f1, f2, f3])(-2)", () => {
    expect(chainer([f1, f2, f3])(-2)).toBe(4);
  });

  it("should return 25 for chainer([f1, f2, f3])(1.5)", () => {
    expect(chainer([f1, f2, f3])(1.5)).toBe(25);
  });
});
