'use strict';

describe(`Function 'chainer':`, () => {
  const { chainer } = require('./chainer');

  it('should return a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('should correctly chain multiple functions', () => {
    const f1 = jest.fn(x => x ** 1);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => x * 3);

    const chained = chainer([f1, f2, f3]);
    const result = chained(2);

    expect(result).toBe(12);
  });

  it('should call functions in order using mocks', () => {
    const f1 = jest.fn(x => x * 2);
    const f2 = jest.fn(x => x + 2);
    const f3 = jest.fn(x => Math.pow(x, 2));

    const chained = chainer([f1, f2, f3]);
    const result = chained(0);

    expect(result).toBe(4);
  });

  it('should handle single function', () => {
    const f1 = jest.fn(x => x * 2);

    const chained = chainer([f1]);
    const result = chained(8);

    expect(result).toBe(16);
  });

  it('should handle without functions', () => {
    const chained = chainer([]);
    const result = chained(5);

    expect(result).toBe(5);
  });

  it('should handle without input', () => {
    const f1 = jest.fn(x => x + 2);
    const f2 = jest.fn(x => x - 1);
    const f3 = jest.fn(x => x);

    const chained = chainer([f1, f2, f3]);
    const result = chained();

    expect(result).toBe(1);
  });
});
