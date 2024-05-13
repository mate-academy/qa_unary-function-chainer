'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  let foo1;
  let foo2;
  let foo3;
  let foo4;

  beforeEach(() => {
    foo1 = jest.fn(x => x + 1);
    foo2 = jest.fn(x => x + 1);
    foo3 = jest.fn(x => x + 1);
    foo4 = jest.fn(x => x + 1);
  });

  afterEach(() => {
    foo1.mockClear();
    foo2.mockClear();
    foo3.mockClear();
    foo4.mockClear();
  });

  it('should call each of function one time', () => {
    const chainedFunction = chainer([foo1, foo2, foo3, foo4]);

    chainedFunction(3);

    expect(foo1).toHaveBeenCalledTimes(1);
    expect(foo2).toHaveBeenCalledTimes(1);
    expect(foo3).toHaveBeenCalledTimes(1);
    expect(foo4).toHaveBeenCalledTimes(1);
  });

  it('should calcudate value', () => {
    const chainedFunction = chainer([foo1, foo2, foo3, foo4]);

    expect(chainedFunction(3)).toBe(7);
  });

  it('should work with ampty array', () => {
    const chainedFunction = chainer([]);

    expect(chainedFunction(3)).toBe(3);
  });
});
