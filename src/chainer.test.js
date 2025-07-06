'use strict';

describe('Chainer', () => {
  const { chainer } = require('./chainer');

  let f1;
  let f2;
  let f3;
  let firstArg;

  beforeEach(() => {
    firstArg = 2;
    f1 = jest.fn((x) => x * 2);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => Math.pow(x, 2));
  });

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should accept array of functions', () => {
    expect(() => chainer(f1, f2, f3)(firstArg)).toThrow();
    expect(() => chainer([f1, f2, f3])(firstArg)).not.toThrow();
  });

  it('should return correct result', () => {
    const result = chainer([f1, f2, f3])(firstArg);
    const expectedResult = f3(f2(f1(firstArg)));

    expect(result).toBe(expectedResult);
  });

  it('f1 should be called with first argument', () => {
    chainer([f1, f2, f3])(firstArg);

    expect(f1).toHaveBeenCalledWith(firstArg);
  });

  it('should chain f1 and f2', () => {
    chainer([f1, f2, f3])(firstArg);
    expect(f1).toHaveBeenCalled();

    const f1Result = f1.mock.results[0].value;

    expect(f2).toHaveBeenCalledWith(f1Result);
  });

  it('should chain f2 and f3', () => {
    chainer([f1, f2, f3])(firstArg);

    expect(f2).toHaveBeenCalled();

    const f2Result = f2.mock.results[0].value;

    expect(f3).toHaveBeenCalledWith(f2Result);
  });

  it("shouldn't chain f1 and f3", () => {
    chainer([f1, f2, f3])(firstArg);

    const f1Result = f1.mock.results[0].value;

    expect(f3).not.toHaveBeenCalledWith(f1Result);
  });
});
