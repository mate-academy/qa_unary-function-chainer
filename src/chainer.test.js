'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const f1 = (x) => x * 2;
  const f2 = (x) => x + 2;
  const f3 = (x) => Math.pow(x, 2);

  it('returns a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('readme example: chainer([f1, f2, f3])(0) === 4', () => {
    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  it('applies functions left to right', () => {
    expect(chainer([f1, f2, f3])(3)).toBe(Math.pow(3 * 2 + 2, 2));
  });

  it('order matters: [f2, f1] !== [f1, f2]', () => {
    expect(chainer([f2, f1])(3)).not.toBe(chainer([f1, f2])(3));
  });

  it('single function passes input through', () => {
    expect(chainer([f1])(5)).toBe(10);
  });

  it('empty array returns input unchanged', () => {
    expect(chainer([])(42)).toBe(42);
  });

  it('works with string transformations', () => {
    const upper = (s) => s.toUpperCase();
    const exclaim = (s) => s + '!';

    expect(chainer([upper, exclaim])('hello')).toBe('HELLO!');
  });

  it('equivalent to manual composition: d(c(b(a(x))))', () => {
    const a = (x) => x + 1;
    const b = (x) => x * 3;
    const c = (x) => x - 4;
    const d = (x) => x / 2;
    const input = 10;

    expect(chainer([a, b, c, d])(input)).toBe(d(c(b(a(input)))));
  });
});
