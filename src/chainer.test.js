'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it(`should return the input value for empty functions array
  or if it is absent`, () => {
    expect(chainer([])(746)).toBe(746);
  });

  it(`should throw an error if nothing was passed to chainer`, () => {
    expect(chainer()).toThrow();
  });

  it(`should return undefined if empty array was passed to chainer
  and nothing as input`, () => {
    expect(chainer([])()).toBeUndefined();
  });

  it(`should call all the functions which were passed one time each`, () => {
    const first = jest.fn();
    const second = jest.fn();
    const third = jest.fn();
    const fourth = jest.fn();

    const callbacks = [first, second, third, fourth];

    chainer(callbacks)(1);

    callbacks.forEach((callback) => expect(callback).toHaveBeenCalledTimes(1));
  });

  it(`should return value which returns the last callback in the array`, () => {
    const first = jest.fn();
    const second = jest.fn();
    const third = jest.fn();
    const fourth = jest.fn();

    fourth.mockReturnValueOnce(100);

    const callbacks = [first, second, third, fourth];

    expect(chainer(callbacks)()).toBe(100);
  });

  it(`should call the callbacks in a proper order`, () => {
    const first = jest.fn((x) => x + 1);
    const second = jest.fn((x) => x + 1);
    const third = jest.fn((x) => x + 1);
    const fourth = jest.fn((x) => x + 1);

    const callbacks = [first, second, third, fourth];

    chainer(callbacks)(0);

    callbacks.reduce((accum, callback, index) => {
      expect(callback(accum)).toBe(index + 1);

      return index + 1;
    }, 0);
  });
});
