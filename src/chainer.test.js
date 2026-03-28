'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const f1 = x => x * 2;
  const f2 = x => x + 3;
  const f3 = x => x ** 2;

  test('applies a single function', () => {
    const chain = chainer([f1]);

    expect(chain(5)).toBe(10);
  });

  test('applies multiple functions left-to-right', () => {
    const chain = chainer([f1, f2, f3]);

    // f1(1)=2 → f2(2)=5 → f3(5)=25
    expect(chain(1)).toBe(25);
  });

  test('works with the example from the prompt', () => {
    const g1 = x => x * 2;
    const g2 = x => x + 2;
    const g3 = x => Math.pow(x, 2);

    const chain = chainer([g1, g2, g3]);

    expect(chain(0)).toBe(4);
  });

  test('returns the input unchanged when given an empty array', () => {
    const chain = chainer([]);

    expect(chain(10)).toBe(10);
  });

  test('works with functions returning different types', () => {
    const toStr = x => `Value: ${x}`;
    const shout = s => s.toUpperCase();

    const chain = chainer([f1, toStr, shout]);

    expect(chain(3)).toBe('VALUE: 6');
  });

  test('throws if any element is not a function', () => {
    const chain = chainer([f1, 123, f2]);

    expect(() => chain(10)).toThrow();
  });

  test('does not mutate the original array', () => {
    const funcs = [f1, f2];
    const copy = [...funcs];

    chainer(funcs);
    expect(funcs).toEqual(copy);
  });
});
