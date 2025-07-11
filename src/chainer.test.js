'use strict';

const { chainer } = require('./chainer');

describe('Chainer', () => {
  let f1;
  let f2;
  let f3;
  let chained;

  beforeEach(() => {
    f1 = jest.fn((x) => x * 2);
    f2 = jest.fn((x) => x + 2);
    f3 = jest.fn((x) => Math.pow(x, 2));
    chained = chainer([f1, f2, f3])(0);
  });

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return 4', () => {
    expect(chained).toBe(4);
  });

  it('should call each function', () => {
    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
  });

  it('should call each function once', () => {
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should call each function with correct args', () => {
    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
  });
});
