'use strict';

const { chainer } = require('./chainer');

describe(`'Chainer' function`, () => {
  let f1;
  let f2;
  let f3;

  beforeEach(() => {
    f1 = jest.fn(x => x - 5);
    f2 = jest.fn(x => x + 2);
    f3 = jest.fn(x => x * 3);
  });

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should return a function`, () => {
    const args = [() => {}, () => {}, () => {}];

    expect(chainer(args)).toBeInstanceOf(Function);
  });

  it(`should return 'NaN' if one of the 'chainer'`
  + ` parameters is 'undefined'`, () => {
    f1 = () => undefined;

    expect(chainer([f1, f2, f3])(4)).toBeNaN();
  });

  it(`should return callback that return value`, () => {
    const returnedCb = jest.fn().mockReturnValue(x => x);
    const result = chainer([returnedCb()])(3);

    expect(result).not.toBeUndefined();
  });

  it(`should invoke each function from 'functions'`, () => {
    chainer([f1, f2, f3])();

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it(`result of callback should consist of the current call`
  + ` that invokes the previous one as a parameter`, () => {
    chainer([f1, f2, f3])(5);

    expect(f2).toHaveBeenCalledWith(0);
  });

  it(`should return '21' for argument '10'`, () => {
    const result = chainer([f1, f2, f3])(10);

    expect(result).toEqual(21);
  });
});
