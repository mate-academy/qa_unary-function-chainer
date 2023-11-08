'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');
  let first;
  let second;
  let third;
  let fourth;
  let callbacks;

  beforeEach(() => {
    first = jest.fn();
    second = jest.fn();
    third = jest.fn();
    fourth = jest.fn();
    callbacks = [first, second, third, fourth];
  });

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it(`should trow error if nothing passed`, () => {
    expect(chainer()).toThrow();
  });

  it(`should return the input value
  if function array is empty or absent`, () => {
    expect(chainer([])(123)).toBe(123);
  });

  it(`should return undefined
  if empty array and input`, () => {
    expect(chainer([])()).toBe(undefined);
  });

  it(`should call all the functions which
  passed one time each`, () => {
    chainer(callbacks)(1);

    callbacks.forEach((callback) => expect(callback).toHaveBeenCalledTimes(1));
  });

  it(`should return value which returns
  last callback in the array`, () => {
    fourth.mockReturnValueOnce(100);

    expect(chainer(callbacks)()).toBe(100);
  });

  it(`should call the callbacks in a proper order`, () => {
    first = jest.fn((x) => x + 1);
    second = jest.fn((x) => x + 1);
    third = jest.fn((x) => x + 1);
    fourth = jest.fn((x) => x + 1);

    callbacks = [first, second, third, fourth];

    chainer(callbacks)(0);

    callbacks.reduce((accum, callback, index) => {
      expect(callback(accum)).toBe(index + 1);

      return index + 1;
    }, 0);
  });
});
