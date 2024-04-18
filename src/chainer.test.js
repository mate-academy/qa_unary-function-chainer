'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const function1 = jest.fn();
    const function2 = jest.fn();
    const chainerFunction = chainer([function1, function2]);

    expect(chainerFunction).toBeInstanceOf(Function);
  });

  it('should chain together a list of unary functions '
  + 'and return a result', () => {
    const function1 = jest.fn((x) => x * 2);
    const function2 = jest.fn((x) => x + 2);
    const function3 = jest.fn((x) => Math.pow(x, 2));
    const chainerFunction = chainer([function1, function2, function3]);
    const result = chainerFunction(1);

    expect(function1).toHaveBeenCalledWith(1);
    expect(function2).toHaveBeenCalledWith(2);
    expect(function3).toHaveBeenCalledWith(4);
    expect(result).toBe(16);
  });

  it('should return the input value if function array is empty', () => {
    expect(chainer([])(12345)).toBe(12345);
  });

  it('should return undefined if empty array and input', () => {
    expect(chainer([])()).toBe(undefined);
  });
});
