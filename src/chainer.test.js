'use strict';
/* eslint-disable max-len */

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('a chain of three numeric functions returns the correct result', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => x * x;

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  test('an empty array of functions returns the value of the input argument unchanged', () => {
    const chained = chainer([]);

    expect(chained('input')).toBe('input');
    expect(chained(42)).toBe(42);
  });

  test('one function in an array behaves like a simple function', () => {
    const f = x => `hello ${x}`;
    const chained = chainer([f]);

    expect(chained('world')).toBe('hello world');
  });

  test('confirms the order of function calls (left-to-right application)', () => {
    const a = jest.fn(x => x + 'a');
    const b = jest.fn(x => x + 'b');
    const c = jest.fn(x => x + 'c');
    const chained = chainer([a, b, c]);
    const result = chained('start');

    expect(result).toBe('startabc');
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    expect(c).toHaveBeenCalledTimes(1);
    expect(a).toHaveBeenCalledWith('start');

    const aReturn = a.mock.results[0].value;

    expect(b).toHaveBeenCalledWith(aReturn);

    const bReturn = b.mock.results[0].value;

    expect(c).toHaveBeenCalledWith(bReturn);
  });

  test('works with different types of values ​​(e.g. objects or arrays)', () => {
    const addProp = obj => ({
      ...obj, added: true,
    });
    const wrap = objc => ({ wrapped: objc });
    const chained = chainer([addProp, wrap]);

    expect(chained({ initial: 1 })).toEqual({
      wrapped: {
        initial: 1, added: true,
      } });
  });

  test('does not change the original functions (no side effects in the tested chain)', () => {
    const pure = x => x + 1;
    const chained = chainer([pure]);
    const input = 5;
    const result = chained(input);

    expect(result).toBe(6);
    expect(input).toBe(5);
  });
});
