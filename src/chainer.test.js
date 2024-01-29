'use strict';

describe('cnainer function', () => {
  const { chainer } = require('./chainer');

  it('should do a left fold on the given functions', () => {
    const fn1 = jest.fn((x) => x + 2);
    const fn2 = jest.fn((x) => x * 2);
    const fn3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([fn1, fn2, fn3])(10);

    expect(fn1).toHaveBeenCalledWith(10);
    expect(fn2).toHaveBeenCalledWith(12);
    expect(fn3).toHaveBeenCalledWith(24);
    expect(result).toBe(576);
  });

  it('should return function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should return initial value on empty function array', () => {
    const result = chainer([]);

    expect(result(10)).toBe(10);
  });

  it('should do a left fold on the given functions with strings', () => {
    const fn1 = jest.fn((x) => x.trim());
    const fn2 = jest.fn((x) => x.split('_'));
    const fn3 = jest.fn((x) => x.join(' '));

    const result = chainer([fn1, fn2, fn3])('  Hello_World!  ');

    expect(fn1).toHaveBeenCalledWith('  Hello_World!  ');
    expect(fn2).toHaveBeenCalledWith('Hello_World!');
    expect(fn3).toHaveBeenCalledWith(['Hello', 'World!']);
    expect(result).toBe('Hello World!');
  });

  it(`should handle 'null' and 'undefined' input values`, () => {
    const result = chainer([x => x * 2, x => x + 2]);

    expect(result(null)).toBe(2);
    expect(result(undefined)).toBe(NaN);
  });
});
