'use strict';

const { chainer } = require('./chainer');

// Test suite for chainer function
describe('chainer', () => {
  // Test basic functionality with example functions
  test('should correctly chain multiple functions', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
    expect(chained(1)).toBe(16);
    expect(chained(2)).toBe(36);
  });

  // Test with single function
  test('should work with a single function', () => {
    const f1 = x => x + 1;
    const chained = chainer([f1]);

    expect(chained(5)).toBe(6);
    expect(chained(0)).toBe(1);
  });

  // Test with empty array
  test('should return identity function when given empty array', () => {
    const chained = chainer([]);

    expect(chained(5)).toBe(5);
    expect(chained(0)).toBe(0);
    expect(chained(-1)).toBe(-1);
  });

  // Test function order
  test('should apply functions in left-to-right order', () => {
    const f1 = x => x + 1;
    const f2 = x => x * 2;
    const chained1 = chainer([f1, f2]);
    const chained2 = chainer([f2, f1]);

    expect(chained1(3)).toBe(8);
    expect(chained2(3)).toBe(7);
  });

  // Test with different numeric operations
  test('should work with various mathematical operations', () => {
    const double = x => x * 2;
    const square = x => x * x;
    const subtract = x => x - 1;
    const chained = chainer([double, square, subtract]);

    expect(chained(3)).toBe(35);
    expect(chained(4)).toBe(63);
  });

  // Test input preservation
  test('should not modify input value', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 1;
    const chained = chainer([f1, f2]);
    const input = 5;
    const result = chained(input);

    expect(result).toBe(11);
    expect(input).toBe(5);
  });
});
