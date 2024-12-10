"use strict";

describe(`chainer`, () => {
  const { chainer } = require("./chainer");

  it(`should correctly chain and execute functions with arguments`, () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));
    const f4 = jest.fn((x) => x % 2);
    const f5 = jest.fn((x) => x / 2);
    const f6 = jest.fn((x) => x - 5);

    const arr = [f1, f2, f3, f4, f5, f6];
    const result = chainer(arr)(5);

    expect(result).toEqual(-5);
  });

  it("should call all functions in the array", () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);
    const f3 = jest.fn((x) => x - 3);

    const arr = [f1, f2, f3];

    chainer(arr)(4);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
  });

  it("should call functions in the correct order", () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);
    const f3 = jest.fn((x) => x - 3);

    const arr = [f1, f2, f3];

    chainer(arr)(5);

    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(f1.mock.results[0].value);
    expect(f3).toHaveBeenCalledWith(f2.mock.results[0].value);
  });
});
