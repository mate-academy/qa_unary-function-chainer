'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('is declared', () => {
    expect(chainer)
      .toBeInstanceOf(Function);
  });

  it('returns function', () => {
    expect(chainer())
      .toBeInstanceOf(Function);
  });

  it('calls functions from input array', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    chainer([f1, f2, f3])(1);

    expect(f1)
      .toHaveBeenCalled();

    expect(f2)
      .toHaveBeenCalled();

    expect(f3)
      .toHaveBeenCalled();
  });

  it('calls functions in specified order', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    chainer([f1, f2, f3])(1);

    expect(f1)
      .toHaveBeenCalledWith(1);

    expect(f2)
      .toHaveBeenCalledWith(2);

    expect(f3)
      .toHaveBeenCalledWith(4);
  });

  it('returns correct result', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(1);

    expect(result)
      .toBe(16);
  });
});
