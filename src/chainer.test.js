'use strict';

const { chainer } = require('./chainer');

describe(`"chainer" function`, () => {
  let f1;
  let f2;
  let f3;

  beforeEach(() => {
    f1 = jest.fn(x => x * 2);
    f2 = jest.fn(x => x + 2);
    f3 = jest.fn(x => Math.pow(x, 2));
  });

  it(`"chainer" function should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should return a function`, () => {
    const args = [() => {}, () => {}, () => {}];

    expect(chainer(args)).toBeInstanceOf(Function);
  });

  it(`should call each function from 'functions'`, () => {
    chainer([f1, f2, f3])();

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it(`should return CB that return value`, () => {
    const returnedCb = jest.fn().mockReturnValue(x => x);
    const result = chainer([returnedCb()])(0);

    expect(result).not.toBeUndefined();
  });

  it(`should return '4' for argument '0'`, () => {
    const result = chainer([f1, f2, f3])(0);

    expect(result).toEqual(4);
  });
});
