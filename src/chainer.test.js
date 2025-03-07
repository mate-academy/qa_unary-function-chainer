'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return function', () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should return undefined if inner function return undefined', () => {
    const result = chainer([() => {}]);

    expect(result()).toBeUndefined();
  });

  it('should return result of inner function', () => {
    const result = chainer([x => x])(5);

    expect(result).toBe(5);
  });

  it('should handle mathematical operations in chain', () => {
    const result = chainer([
      x => x + 1,
      x => x * 2,
      x => Math.pow(x, 2),
    ])(1);

    expect(result).toBe(16);
  });

  it('should handle string operations', () => {
    const result = chainer([
      str => str.toUpperCase(),
      str => str + '!',
      str => str.repeat(2),
    ])('hello');

    expect(result).toBe('HELLO!HELLO!');
  });

  it('should handle boolean operations', () => {
    const result = chainer([
      x => !x,
      x => !x,
      x => !x,
    ])(true);

    expect(result).toBe(false);
  });

  it('should handle type conversion in chain', () => {
    const result = chainer([
      x => String(x),
      x => x + '0',
      x => parseInt(x),
      x => x * 2,
    ])(5);

    expect(result).toBe(100);
  });

  it('should pass previous function result to next function', () => {
    const spy = jest.fn();
    const functions = [
      x => {
        spy('first', x);

        return x + 1;
      },
      x => {
        spy('second', x);

        return x * 2;
      },
    ];

    chainer(functions)(1);

    expect(spy).toHaveBeenNthCalledWith(1, 'first', 1);
    expect(spy).toHaveBeenNthCalledWith(2, 'second', 2);
  });
});
