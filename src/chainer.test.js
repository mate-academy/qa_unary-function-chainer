'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const f1 = (x) => x + 1;
  const f2 = (x) => x * 2;
  const f3 = (x) => x ** 3;

  it('applies a single function', () => {
    const chain = chainer([f1]);

    expect(chain(1)).toBe(2);
  });

  it('applies multiple functions from left to right', () => {
    const chain = chainer([f1, f2, f3]);

    expect(chain(1)).toBe(64);
  });

  it('works with the example from the prompt', () => {
    const example1 = (x) => x * 2;
    const example2 = (x) => x + 2;
    const example3 = (x) => Math.pow(x, 2);

    const chain = chainer([example1, example2, example3]);

    expect(chain(0)).toBe(4);
  });

  it('should be return input when given empty array', () => {
    const chain = chainer([]);

    expect(chain(2)).toBe(2);
  });

  it('should be works with functions returning different types', () => {
    const toStr = (x) => `Value: ${x}`;
    const toUpperCase = (string) => string.toUpperCase();

    const chain = chainer([f1, toStr, toUpperCase]);

    expect(chain(2)).toBe('VALUE: 3');
  });

  it('throws if any element is not a function', () => {
    const chain = chainer([f1, f2, 1]);

    expect(() => chain(1)).toThrow();
  });

  it('does not mutate the original array', () => {
    const func = [f1, f2];
    const copy = [...func];

    chainer(func);

    expect(func).toEqual(copy);
  });
});
