'use strict';

describe(`Function 'chainer':`, () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('should return undefined for empty array', () => {
    expect(chainer([])()).toBeUndefined();
  });

  it('should call cb', () => {
    const fn = jest.fn();

    chainer([fn])();
    expect(fn).toHaveBeenCalled();
  });

  it('should return value from cb', () => {
    const f = () => 1;

    expect(chainer([f])()).toBe(1);
  });

  it('should pass args to cb', () => {
    const f = x => x * 2;

    expect(chainer([f])(5)).toBe(10);
  });

  it('should chain functions correctly', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0.5)).toBe(9);
  });
});
