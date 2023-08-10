'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer)
      .toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer())
      .toBeInstanceOf(Function);
  });

  it('should call all functions', () => {
    const functions = new Array(3).fill(jest.fn());

    chainer(functions)();

    functions.forEach(func => {
      expect(func).toHaveBeenCalled();
    });
  });

  it('should call all functions', () => {
    const functions = new Array(3).fill(jest.fn());

    chainer(functions)();

    functions.forEach(func => {
      expect(func).toHaveBeenCalled();
    });
  });

  it('should call all functions', () => {
    const functions = new Array(3).fill(jest.fn());

    chainer(functions)();

    functions.forEach(func => {
      expect(func).toHaveBeenCalled();
    });
  });

  it('should call functions with correct args', () => {
    const functions = new Array(3).fill(jest.fn((num) => num + 1));

    chainer(functions)(0);

    functions.forEach((func, index) => {
      expect(func).toHaveBeenCalledWith(index);
    });
  });

  it('should return correct result', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });
});
