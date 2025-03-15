'use strict';

const { chainer } = require('./chainer');

describe(`'chainer' function`, () => {
  let f1;
  let f2;
  let f3;

  beforeEach(() => {
    f1 = jest.fn(x => x + 2);
    f2 = jest.fn(x => x * 3);
    f3 = jest.fn(x => x - 4);
  });

  it('should be declared', () => expect(chainer).toBeDefined());

  it('should return a function', () => {
    expect(chainer([f1])).toBeInstanceOf(Function);
  });

  it(`should return callback that returns value`, () => {
    const cb = jest.fn().mockReturnValue(x => x);
    const result = chainer([cb()])(3);

    expect(result).not.toBeUndefined();
  });

  it('should return the correct result for a single function', () => {
    expect(chainer([f1])(2)).toBe(4);
  });

  it(`should call each function once`, () => {
    chainer([f1, f2, f3])();

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should chain multiple functions in the correct order', () => {
    const chained = chainer([f1, f2, f3]);

    expect(chained(1)).toBe(5);
  });

  it('should return the input unchanged if the array is empty', () => {
    expect(chainer([])(42)).toBe(42);
  });

  it('should correctly process different input types', () => {
    const f4 = jest.fn((x) => x + 'a');
    const f5 = jest.fn((x) => x.toUpperCase());

    expect(chainer([f4, f5])('test')).toBe('TESTA');
  });

  it('should work with identity functions', () => {
    expect(chainer([f1, f1])(5)).toBe(9);
  });

  it('should throw an error if one of the functions throws an error', () => {
    const f4 = jest.fn(() => {
      throw new Error('Error');
    });
    const chained = chainer([f4]);

    expect(() => chained(1)).toThrow('Error');
  });
});
