'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const result = chainer([() => { }, () => { }]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should return start value if was receipted []', () => {
    expect(chainer([])(5)).toBe(5);
    expect(chainer([])('Hello')).toBe('Hello');
  });

  it('should call each array function once with existed start value', () => {
    const funcA = jest.fn(() => 2);
    const funcB = jest.fn(() => 5);

    chainer([funcA, funcB])(0);

    expect(funcA).toHaveBeenCalledTimes(1);
    expect(funcB).toHaveBeenCalledTimes(1);
  });

  it('should call first function with a start value', () => {
    const f = jest.fn((x) => x + 3);

    chainer([f])(5);

    expect(f).toHaveBeenNthCalledWith(1, 5);
  });

  it('should call each other function with previos result', () => {
    const f = jest.fn((x) => x * 3);

    chainer([f, f, f])(5);

    expect(f).toHaveBeenNthCalledWith(3, 45);
  });

  it('should return correct result for existed start value', () => {
    const result = chainer([
      (x) => x + 10,
      (x) => x * 3,
      (x) => x - 4,
    ])(5);

    expect(result).toBe(41);
  });
});
