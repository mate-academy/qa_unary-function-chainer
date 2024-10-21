'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let a, b, c, d;
  let input;

  beforeEach(() => {
    a = jest.fn(x => x + 1);
    b = jest.fn(x => x * 2);
    c = jest.fn(x => x - 3);
    d = jest.fn(x => x / 2);
    input = 5;
  });

  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should take an array of functions', () => {
    const result = chainer([a, b, c, d]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should not change an input if chain has empty array of functions', () => {
    const result = chainer([]);
    const output = result(input);

    expect(output).toBe(5);
  });

  it('should calculate an input if array has one function', () => {
    const chain = chainer([a]);
    const output = chain(input);

    expect(output).toBe(6);
  });

  it('should apply all functions in sequence to the input', () => {
    const chain = chainer([a, b, c, d]);
    const output = chain(input);

    expect(a).toHaveBeenCalledWith(input);
    expect(b).toHaveBeenCalledWith(6);
    expect(c).toHaveBeenCalledWith(12);
    expect(d).toHaveBeenCalledWith(9);

    expect(output).toBe(4.5);
  });
});
