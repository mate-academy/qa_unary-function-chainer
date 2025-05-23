'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  it('should apply all functions in order', () => {
    const f1 = (x) => x + 1;
    const f2 = (x) => x * 3;
    const f3 = (x) => x - 2;

    const result = chainer([f1, f2, f3])(1);

    expect(result).toBe(4);
  });

  it('should return input value if function list is empty ', () => {
    const result = chainer([])(0);

    expect(result).toBe(0);
  });

  it('should apply functions in the correct order', () => {
    const f1 = (x) => x + 1;
    const f2 = (x) => x * 3;
    const f3 = (x) => x - 2;

    const result = chainer([f1, f2, f3])(1);

    expect(result).toBe(4);
  });

  it('should call each function exactly once', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => x - 2);

    chainer([f1, f2, f3])(1);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
  });
});
