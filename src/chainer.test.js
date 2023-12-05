'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return function', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it('should throw error if no arguments are passed', () => {
    expect(chainer()).toThrow();
  });

  it('should return input value if function array is empty', () => {
    expect(chainer([])(111)).toBe(111);
  });

  it('should return undefined if array and input is empty', () => {
    expect(chainer([])()).toBe(undefined);
  });

  it('should call the callbacks in a proper order', () => {
    const first = jest.fn((x) => x + 1);
    const second = jest.fn((x) => x * 10);
    const last = jest.fn((x) => x + 5);

    expect(chainer([first, second, last])(1)).toBe(25);
  });
});
