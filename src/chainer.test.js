const { chainer } = require('./chainer');

// Sample functions for testing
function f1(x) { return x * 2; }
function f2(x) { return x + 2; }
function f3(x) { return Math.pow(x, 2); }

describe('chainer', () => {
  it('should chain and apply functions correctly', () => {
    const chainedFn = chainer([f1, f2, f3]);

    expect(chainedFn(0)).toBe(4); // d(c(b(a(0))))
    expect(chainedFn(1)).toBe(16); // d(c(b(a(1))))
    expect(chainedFn(2)).toBe(36); // d(c(b(a(2))))
  });

  it('should handle an empty array of functions', () => {
    const chainedFn = chainer([]);

    expect(chainedFn(0)).toBe(0); // Identity function
  });

  it('should handle a single function', () => {
    const chainedFn = chainer([f1]);

    expect(chainedFn(2)).toBe(4); // f1(2)
  });

  it('should handle multiple identical functions', () => {
    const chainedFn = chainer([f1, f1, f1]);

    expect(chainedFn(2)).toBe(16); // f1(f1(f1(2)))
  });
});