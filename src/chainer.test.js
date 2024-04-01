'use strict';

const { chainer } = require('./chainer');

describe('Chainer', () => {
  let f1;
  let f2;
  let f3;

  beforeEach(() => {
    f1 = jest.fn(x => x * 2);
    f2 = jest.fn(x => x + 2);
    f3 = jest.fn(x => Math.pow(x, 2));
  });

  it(`should be defined`, () => {
    expect(chainer).toBeDefined();
  });

  it(`should be a function`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should return undefined if the function is underfined`, () => {
    const result = chainer([() => {}])(3);

    expect(result).toBeUndefined();
  });

  it(`should return undefined for empty array of functions and input`, () => {
    const result = chainer([])();

    expect(result).toBeUndefined();
  });

  it(`should return the input for empty array of functions`, () => {
    const input = 5;
    const result = chainer([])(input);

    expect(result).toEqual(input);
  });

  it('should correctly chain a single function', () => {
    const input = 3;
    const result = chainer([f3])(input);
    const expected = f3(input);

    expect(result).toEqual(expected);
    expect(f3).toHaveBeenCalled();
    expect(f3).toHaveBeenCalledWith(input);
  });

  it('should correctly chain multiple functions', () => {
    const input = 5;
    const result = chainer([f1, f2, f3])(input);
    const expected = f3(f2(f1(input)));

    expect(result).toEqual(expected);
    expect(f1).toHaveBeenCalled();
    expect(f1).toHaveBeenCalledWith(input);
    expect(f2).toHaveBeenCalled();
    expect(f2).toHaveBeenCalledWith(f1(input));
    expect(f3).toHaveBeenCalled();
    expect(f3).toHaveBeenCalledWith(f2(f1(input)));
  });
});
