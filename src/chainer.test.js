'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let first, second, third;

  beforeEach(() => {
    first = jest.fn((x) => x * 2);
    second = jest.fn((x) => x + 2);
    third = jest.fn((x) => Math.pow(x, 2));
  });

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should process multiple functions correctly', () => {
    expect(chainer([first, second, third])(0)).toBe(4);
    expect(chainer([first, second, third])(5)).toBe(144);
  });

  it('callbacks should get one args', () => {
    chainer([first, second, third])(0);

    expect(first).toHaveBeenCalledWith(0);
    expect(second).toHaveBeenCalledWith(0);
    expect(third).toHaveBeenCalledWith(2);
  });

  it('callbacks should returns correct value', () => {
    chainer([first, second, third])(0);

    expect(first).toHaveReturnedWith(0);
    expect(second).toHaveReturnedWith(2);
    expect(third).toHaveReturnedWith(4);
  });

  it('should return initial value if no callbacks provided', () => {
    expect(chainer([])(5)).toBe(5);
  });
});
