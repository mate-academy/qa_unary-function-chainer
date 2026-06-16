'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('chains functions left-to-right (readme example)', () => {
    function f1(x) {
      return x * 2;
    }
    function f2(x) {
      return x + 2;
    }
    function f3(x) {
      return Math.pow(x, 2);
    }

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  test('returns input unchanged for empty functions array', () => {
    const identity = chainer([]);

    expect(typeof identity).toBe('function');
    expect(identity(5)).toBe(5);
    expect(identity('foo')).toBe('foo');
  });

  test('works with a single function', () => {
    const f = (x) => x + 10;

    expect(chainer([f])(3)).toBe(13);
  });

  test('calls functions in order with correct arguments', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);
    const f3 = jest.fn((x) => `v:${x}`);

    const out = chainer([f1, f2, f3])(4);

    expect(out).toBe('v:10');

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);

    // f1 called with initial input
    expect(f1.mock.calls[0][0]).toBe(4);
    // f2 called with f1 output
    expect(f2.mock.calls[0][0]).toBe(5);
    // f3 called with f2 output
    expect(f3.mock.calls[0][0]).toBe(10);

    // invocation order (f1 before f2 before f3)
    const [o1, o2, o3] = [f1, f2, f3].map(
      (fn) => fn.mock.invocationCallOrder[0],
    );
    expect(o1).toBeLessThan(o2);
    expect(o2).toBeLessThan(o3);
  });
});
