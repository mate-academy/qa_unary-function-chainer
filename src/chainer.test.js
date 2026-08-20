'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const double = (x) => x * 2;
  const addThree = (x) => x + 3;
  const square = (x) => Math.pow(x, 2);

  it('should return a function', () => {
    expect(typeof chainer([double])).toBe('function');
  });

  it('should apply a single function to the input', () => {
    expect(chainer([double])(5)).toBe(10);
  });

  it('should apply functions from left to right', () => {
    expect(chainer([addThree, double])(4)).toBe(14);
    expect(chainer([double, addThree])(4)).toBe(11);
  });

  it('should pass each result to the next function', () => {
    expect(chainer([addThree, double, square])(1)).toBe(64);
  });

  it('should return the input for an empty function list', () => {
    const input = { value: 7 };

    expect(chainer([])(input)).toBe(input);
  });

  it('should work with non-number values', () => {
    const trim = (value) => value.trim();
    const upper = (value) => value.toUpperCase();

    expect(chainer([trim, upper])(' mate ')).toBe('MATE');
  });

  it('should call every function once with one argument', () => {
    const first = jest.fn((value) => value + 1);
    const second = jest.fn((value) => value * 3);
    const chained = chainer([first, second]);

    expect(chained(2)).toBe(9);
    expect(first).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledWith(2);
    expect(second).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledWith(3);
  });

  it('should pass falsy intermediate results through the chain', () => {
    const toZero = () => 0;
    const addFive = (value) => value + 5;

    expect(chainer([toZero, addFive])(100)).toBe(5);
  });
});
