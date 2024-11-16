const { chainer } = require("./chainer");

describe("chainer", () => {
  let plus, minus, multip, divid;

  beforeEach(() => {
    plus = (x) => x + 2;
    minus = (x) => x - 1;
    multip = (x) => x * 4;
    divid = (x) => x / 2;
  });

  it("should chain functions correctly", () => {
    const result = chainer([plus, minus, multip, divid])(2);
    expect(result).toBe(6);
  });
  it("should works on fractials", () => {
    const result = chainer([plus, minus, multip, divid])(8.8);
    expect(result).toBe(19.6);
  });
  it("should works on negative numbers", () => {
    const result = chainer([plus, minus, multip, divid])(-2);
    expect(result).toBe(-2);
  });
  it("should chain functions with modified values", () => {
    const result = chainer([
      (x) => plus(x, 5),
      (x) => minus(x, 3),
      (x) => multip(x, 2),
      (x) => divid(x, 4),
    ])(7);

    expect(result).toBe(16);
  });
  it("should return initial number no function are provided", () => {
    const result = chainer([])(12);
    expect(result).toBe(12);
  });
  it("should return result of one action", () => {
    const result = chainer([multip])(6);
    expect(result).toBe(24);
  });
  it("should chain functions in order", () => {
    const result1 = chainer([plus, minus, multip, divid])(3);
    const result2 = chainer([minus, minus, multip, plus])(6);
    const result3 = chainer([divid, minus, plus, multip])(5);
    const result4 = chainer([multip, divid, minus, plus])(7);

    expect(result1).toBe(8);
    expect(result2).toBe(18);
    expect(result3).toBe(14);
    expect(result4).toBe(15);
  });
  it("should work if function is used many times", () => {
    const result = chainer([
      plus,
      minus,
      multip,
      divid,
      divid,
      minus,
      plus,
      multip,
      minus,
      minus,
      multip,
      plus,
      multip,
      divid,
      minus,
      plus,
    ])(13);
    expect(result).toBe(469);
  });
  it("should handle identity functions correctly", () => {
    const identity = (x) => x;

    const result = chainer([identity, identity, identity])(7);
    expect(result).toBe(7);
  });
  it("should chain very big numbers", () => {
    const result = chainer([minus, multip])(2543476767765);
    expect(result).toBe(10173907071056);
  });
});
