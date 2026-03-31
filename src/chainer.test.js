'use strict';

const { chainer } = require('./chainer');

const arr = [(x) => x * 2, (x) => x + 2, (x) => Math.pow(x, 2)];

describe(`function 'chainer'`, () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('returned function should return number', () => {
    expect(typeof chainer(arr)(0)).toBe('number');
  });

  it('returned function should be called with argument', () => {
    const f = jest.fn(chainer(arr));

    f(0);
    expect(f).toBeCalledWith(0);
  });

  it('functions should be called with argument', () => {
    const f = jest.fn(() => 1);

    chainer([f, ...arr])(0);
    expect(f).toBeCalledWith(0);
  });

  it('all function should be called', () => {
    const f = jest.fn(() => 1);

    chainer([f, f, f, f])(0);
    expect(f).toHaveBeenCalledTimes(4);
  });

  it('should return correct value', () => {
    expect(chainer(arr)(0)).toBe(4);
  });

  it('should return correct value', () => {
    expect(chainer(arr)(1)).toBe(16);
  });

  it('should return correct value', () => {
    expect(chainer(arr)(-1)).toBe(0);
  });
});
