'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('all functions are called', () => {
    const functions = [jest.fn(), jest.fn()];

    chainer(functions)(0);

    for (const f of functions) {
      expect(f).toHaveBeenCalled();
    };
  });

  it('functions are called from left to right', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));
    const functions = [f1, f2, f3];

    const result = chainer(functions)(1);

    expect(f1).toHaveBeenCalledWith(1);
    expect(f2).toHaveBeenCalledWith(2);
    expect(f3).toHaveBeenCalledWith(4);
    expect(result).toBe(16);
  });
});
