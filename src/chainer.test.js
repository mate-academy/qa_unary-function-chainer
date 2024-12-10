"use strict";

describe(`chainer`, () => {
  const { chainer } = require("./chainer");

  it(`should correctly chain and execute functions with arguments`, () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    chainer(f1, f2, f3);

    expect(f1(2)).toEqual(4);
    expect(f2(4)).toEqual(6);
    expect(f3(1)).toEqual(1);
  });

  it(`should call all functions in the chain`, () => {
    const f1 = jest.fn((x) => x % 2);
    const f2 = jest.fn((x) => x / 2);
    const f3 = jest.fn((x) => x - 5);

    chainer(f1, f2, f3);

    expect(f1(5)).toEqual(1);
    expect(f2(10)).toEqual(5);
    expect(f3(1)).toEqual(-4);
  });
});
