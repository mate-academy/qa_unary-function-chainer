'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let f1;
  let f2;
  let f3;

  beforeEach(() => {
    f1 = jest.fn(value => value + 1);
    f2 = jest.fn(value => value + 1);
    f3 = jest.fn(value => value - 1);
  });

  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer([f1, f2, f3])).toBeInstanceOf(Function);
  });

  it('should call all callbacks', () => {
    chainer([f1, f2, f3])();
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should return value', () => {
    const result = chainer([f1, f2, f3])(1);

    expect(result).toEqual(2);
  });
});
