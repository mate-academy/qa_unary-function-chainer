'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return not undefined', () => {
    expect(chainer).not.toBeUndefined();
  });

  it('should be called 3 times', () => {
    const f = jest.fn();

    chainer([f, f, f])();

    expect(f).toBeCalledTimes(3);
  });

  it('should pass result of first funcrion to second function', () => {
    const first = jest.fn((x) => x + 2);
    const second = jest.fn((x) => x * 2);

    expect(chainer([first, second])(1)).toBe(6);
    expect(first).toBeCalledWith(1);
    expect(second).toBeCalledWith(3);
    expect(first).toBeCalled();
    expect(second).toBeCalled();
  });

  it('should return input if functions were not passed', () => {
    expect(chainer([])(1)).toBe(1);
  });
});
