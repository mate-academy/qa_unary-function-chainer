'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return function', () => {
    const fn = chainer([]);

    expect(typeof fn).toBe('function');
  });

  it('should return left side of previous function', () => {
    const functions = [
      x => x + 2,
      x => x * 2,
      x => Math.pow(x, 2),
    ];

    const chain = chainer(functions);

    expect(chain(0)).toBe(16);
  });

  it('should work with only one function', () => {
    const fn = x => Math.pow(x, 3);
    const chain = chainer([fn]);

    expect(chain(2)).toBe(8);
  });

  it('should work with empty array', () => {
    const fn = chainer([]);

    expect(fn(42)).toBe(42);
  });

  it('should apply function in proper order', () => {
    let checkOrder = '';
    const functions = [
      x => {
        checkOrder += '1';

        return x + 2;
      },
      x => {
        checkOrder += '2';

        return x * 2;
      },
      x => {
        checkOrder += '3';

        return Math.pow(x, 2);
      },
    ];

    const result = chainer(functions);

    expect(result(1)).toBe(36);
    expect(checkOrder).toBe('123');
  });

  it('should return fail if errors occur', () => {
    const fnWithErr = x => {
      throw new Error('Error in function');
    };
    const normalFn = x => x * 3;

    const chain = chainer([normalFn, fnWithErr]);

    expect(() => chain(0)).toThrow('Error in function');
  });
});
