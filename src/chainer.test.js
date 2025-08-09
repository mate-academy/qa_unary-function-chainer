'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  test('example from the task — [f1, f2, f3]', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const chain = chainer([f1, f2, f3]);

    expect(chain(0)).toBe(4);
    expect(chain(2)).toBe(36);
  });

  test('works correctly with a single function', () => {
    const inc = x => x + 1;
    const chain = chainer([inc]);

    expect(chain(5)).toBe(6);
  });

  test('returns the same value for an empty list of functions', () => {
    const chain = chainer([]);

    expect(chain(42)).toBe(42);
  });

  test('order of functions matters', () => {
    const add2 = x => x + 2;
    const mul3 = x => x * 3;

    const chain1 = chainer([add2, mul3]);
    const chain2 = chainer([mul3, add2]);

    expect(chain1(4)).toBe(18);
    expect(chain2(4)).toBe(14);
  });

  test('works with negative values', () => {
    const negate = x => -x;
    const abs = x => Math.abs(x);

    const chain = chainer([negate, abs]);

    expect(chain(5)).toBe(5);
  });
});
