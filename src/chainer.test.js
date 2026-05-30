'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return the correct result of nested functions', () => {
    expect(
      chainer([(x) => x * 2, (x) => x + 2, (x) => Math.pow(x, 2)])(0),
    ).toBe(4);
  });

  it('should call each function in the correct order', () => {
    const f1 = jest.fn().mockImplementation((x) => x * 2);
    const f2 = jest.fn().mockImplementation((x) => x + 2);
    const f3 = jest.fn().mockImplementation((x) => Math.pow(x, 2));

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(f1(0));
    expect(f3).toHaveBeenCalledWith(f2(f1(0)));
  });
});
