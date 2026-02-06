"use strict";

describe("chainer", () => {
  const { chainer } = require(`./chainer`);

  it(`should be a function`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should be calls tree times`, () => {
    const f = jest.fn();

    chainer([f, f, f])();
    expect(f.mock.calls.length).toBe(3);
  });

  it(`should return initial value`, () => {
    expect(chainer([])(0)).toBe(0);
  });

  it(`should return undefined`, () => {
    expect(chainer([])()).toBeUndefined();
  });

  it(`should returns 4`, () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }
    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });
});
