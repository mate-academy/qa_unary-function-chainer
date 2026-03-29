'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  const addOne = jest.fn((x) => x + 1);
  const multiplyByTwo = jest.fn((x) => x * 2);
  const subtractThree = jest.fn((x) => x - 3);

  const chained = chainer([addOne, multiplyByTwo, subtractThree]);

  it('should function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('should chain a single function', () => {
    expect(chainer([addOne])(5)).toBe(6);
  });

  it('should chain  with 0', () => {
    const result = chained(0);

    expect(addOne).toHaveBeenCalled();
    expect(multiplyByTwo).toHaveBeenCalled();

    expect(result).toBe(-1);
  });

  it('should chain  with 5', () => {
    const result = chained(5);

    expect(addOne).toHaveBeenCalled();
    expect(multiplyByTwo).toHaveBeenCalled();

    expect(result).toBe(9);
  });

  it('should handle an empty array of functions', () => {
    expect(chainer([])('hello')).toBe('hello');
  });
});
