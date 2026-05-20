'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('chains functions', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);
    const f3 = jest.fn((x) => x - 3);

    const chained = chainer([f1, f2, f3]);

    expect(chained(5)).toBe(9);
    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(6);
    expect(f3).toHaveBeenCalledWith(12);
  });

  it('handles empty function list', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
  });

  it('handles single function', () => {
    // Wrapped in jest.fn() so Jest can track calls
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const chained = chainer([f1]);

    expect(chained(5)).toBe(10);
    expect(f1).toHaveBeenCalledWith(5); // Changed from 0 to 5
    expect(f2).not.toHaveBeenCalled(); // Removed arguments from matchers
    expect(f3).not.toHaveBeenCalled();
  });

  it('handles zero as an input value', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4); // (0 * 2) -> (0 + 2) -> (2 ^ 2) = 4
    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
  });
});
