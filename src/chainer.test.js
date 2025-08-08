'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it(`should correctly chain multiple unary functions`, () => {
    const f1 = x => x * 2;
    const f2 = x => x + 3;
    const f3 = x => x - 5;

    const chained = chainer([f1, f2, f3]);

    expect(chained(2)).toBe(((2 * 2) + 3) - 5);
  });

  it(`should work with a single function`, () => {
    const f1 = x => x ** 2;

    const chained = chainer([f1]);

    expect(chained(3)).toBe(9);
  });

  it(`should return input unchanged for an empty function list`, () => {
    const chained = chainer([]);

    expect(chained(42)).toBe(42);
  });

  it(`should work with a negative value`, () => {
    const f1 = x => x - 10;
    const f2 = x => x * 3;

    const chained = chainer([f1, f2]);

    expect(chained(-5)).toBe((-5 - 10) * 3);
  });

  it(`should call function in the correct order`, () => {
    const spy1 = jest.fn(x => x + 'A');
    const spy2 = jest.fn(x => x + 'B');
    const spy3 = jest.fn(x => x + 'C');

    const chained = chainer([spy1, spy2, spy3]);
    const result = chained('');

    expect(result).toBe('ABC');
    expect(spy1).toHaveBeenCalledWith('');
    expect(spy2).toHaveBeenCalledWith('A');
    expect(spy3).toHaveBeenCalledWith('AB');
  });
});
