'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('should apply one function', () => {
    const result = chainer([(x) => x + 1]);

    expect(result(1)).toBe(2);
  });

  it('should called all functions', () => {
    const f1 = jest.fn();
    const f2 = jest.fn();

    chainer([f1, f2])(0);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
  });
});
