'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('should return the input when the functions array is empty', () => {
    const chained = chainer([]);
    const input = { value: 5 };

    expect(chained(5)).toBe(5);
    expect(chained('hello')).toBe('hello');
    expect(chained(input)).toBe(input);
    expect(chained(undefined)).toBeUndefined();
  });

  it('should apply a single function', () => {
    const double = (value) => value * 2;

    expect(chainer([double])(3)).toBe(6);
  });

  it('should apply functions from left to right', () => {
    const double = (value) => value * 2;
    const addTwo = (value) => value + 2;
    const square = (value) => value ** 2;
    const chained = chainer([double, addTwo, square]);

    expect(chained(0)).toBe(4);
    expect(chained(3)).toBe(64);
  });

  it('should not call functions before the returned function is called', () => {
    const first = jest.fn();
    const second = jest.fn();

    chainer([first, second]);

    expect(first).not.toHaveBeenCalled();
    expect(second).not.toHaveBeenCalled();
  });

  it('should call each function once with only the previous result', () => {
    const first = jest.fn((value) => value + 2);
    const second = jest.fn((value) => value * 3);
    const third = jest.fn((value) => value - 1);

    const result = chainer([first, second, third])(4);

    expect(first).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledWith(4);

    expect(second).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledWith(6);

    expect(third).toHaveBeenCalledTimes(1);
    expect(third).toHaveBeenCalledWith(18);

    expect(result).toBe(17);
  });

  it('should support functions that change the value type', () => {
    const split = (value) => value.split(',');
    const count = (values) => values.length;
    const formatCount = (value) => `Count: ${value}`;

    expect(chainer([split, count, formatCount])('a,b,c')).toBe('Count: 3');
  });

  it.each([0, false, '', null, undefined])(
    'should pass the intermediate result %p to the next function',
    (value) => {
      const first = jest.fn(() => value);
      const second = jest.fn(() => 'finished');

      expect(chainer([first, second])(10)).toBe('finished');
      expect(second).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledWith(value);
    },
  );

  it('should allow repeated calls with different inputs', () => {
    const double = (value) => value * 2;
    const addOne = (value) => value + 1;
    const chained = chainer([double, addOne]);

    expect(chained(2)).toBe(5);
    expect(chained(5)).toBe(11);
    expect(chained(2)).toBe(5);
  });

  it('should preserve the array of functions', () => {
    const double = (value) => value * 2;
    const addOne = (value) => value + 1;
    const functions = [double, addOne];

    chainer(functions)(3);

    expect(functions).toEqual([double, addOne]);
  });
});
