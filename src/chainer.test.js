'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('chains multiple functions', () => {
    const first = jest.fn((x) => x * 2);
    const second = jest.fn((x) => x + 2);
    const third = jest.fn((x) => x ** 2);

    const value = 0;

    const result = chainer([first, second, third])(value);

    expect(result).toBe(4);
  });

  it('works with empty array', () => {
    const value = 5;

    const result = chainer([])(value);

    expect(result).toBe(5);
  });

  it('works with single function', () => {
    const first = jest.fn((x) => x * 2);

    const value = 0;

    const result = chainer([first])(value);

    expect(result).toBe(0);
  });

  it('works with two functions', () => {
    const first = jest.fn((x) => x * 2);
    const second = jest.fn((x) => x + 2);

    const value = 0;

    const result = chainer([first, second])(value);

    expect(result).toBe(2);
  });

  it('works with three functions', () => {
    const first = jest.fn((x) => x * 2);
    const second = jest.fn((x) => x + 2);
    const third = jest.fn((x) => x ** 2);

    const value = 0;

    const result = chainer([first, second, third])(value);

    expect(result).toBe(4);
  });

  it('works with different data types', () => {
    const toUpperCase = jest.fn((x) => x.toUpperCase());
    const addExclamation = jest.fn((x) => x + '!');
    const result = chainer([toUpperCase, addExclamation])('hello');

    expect(result).toBe('HELLO!');
  });
});
