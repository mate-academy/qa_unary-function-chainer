'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const addition = jest.fn((value) => value + 1);
  const subtraction = jest.fn((value) => value - 1);
  const multiply = jest.fn((value) => value * value);
  const division = jest.fn((value) => value / 2);
  const functionsArr = [
    addition,
    addition,
    addition,
    addition,
    subtraction,
    subtraction,
    multiply,
    multiply,
    multiply,
    division,
  ];

  const chain = chainer(functionsArr);
  const result = chain(1);

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return closure', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it('should return correct value', () => {
    expect(result).toBe(3280.5);
  });

  it('array functions should be invoked correctly', () => {
    expect(addition).toHaveBeenCalledTimes(4);
    expect(subtraction).toHaveBeenCalledWith(4);
    expect(multiply).toHaveBeenCalledWith(3);
    expect(division).toHaveBeenCalledWith(6561);
  });

  it('should not store the result', () => {
    const nextResult = chain(2);

    expect(result).toBe(3280.5);
    expect(nextResult).toBe(32768);
  });

  it('should work with empty array', () => {
    const invoke = chainer([]);
    const res = invoke(1);

    expect(res).toBe(1);
  });

  it('return undefined if no function was provided', () => {
    const chain2 = chainer([() => {}]);
    const res = chain2(1);

    expect(res).toBeUndefined();
  });
});
