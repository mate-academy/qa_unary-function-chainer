'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('first callback should be called with correct value', () => {
    const f1 = jest.fn();

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(0);
  });

  it('second callback should be called with correct value', () => {
    const f2 = jest.fn();

    function f1(x) {
      return x * 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    chainer([f1, f2, f3])(0);

    expect(f2).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledWith(0);
  });

  it('third callback should be called with correct value', () => {
    const f3 = jest.fn();

    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    chainer([f1, f2, f3])(0);

    expect(f3).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledWith(2);
  });

  it('should return correct value', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });
});
