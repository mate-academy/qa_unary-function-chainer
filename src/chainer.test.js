"use strict";

const { chainer } = require("./chainer");

describe("chainer", () => {
  it(`should 'chainer' declared function`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should 'chainer' return function`, () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it(`should 'chainer' return 4`, () => {
    const f1 = jest.fn((x) => x * 2);

    const f2 = jest.fn((x) => x + 2);

    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
    expect(result).toBe(4);
  });

  it(`should 'chainer' return 0`, () => {
    const f1 = jest.fn((x) => x + 10);
    const f2 = jest.fn((x) => x - 10);
    const f3 = jest.fn((x) => x * 2);

    const result = chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
    expect(result).toBe(0);
  });

  it(`should 'chainer' return input for empty functions array`, () => {
    const result = chainer([])(5);

    expect(result).toBe(5);
  });
});
