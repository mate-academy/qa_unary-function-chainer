'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should chain functions correctly', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    const chainedFunction = chainer([f1, f2, f3]);

    const result = chainedFunction(1);

    expect(f1).toHaveBeenCalledWith(1);
    expect(f2).toHaveBeenCalledWith(2);
    expect(f3).toHaveBeenCalledWith(4);

    expect(result).toEqual(16);
  });

  it('should handle empty function array', () => {
    const chainedFunction = chainer([]);

    const result = chainedFunction(0);

    expect(result).toEqual(0);
  });
});
