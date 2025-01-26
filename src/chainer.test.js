'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it(
    //  prettier-ignore
    'it should return a function that does'
      + ' a left fold on the given functions',
    () => {
      const fn1 = jest.fn(x => x * 2);
      const fn2 = jest.fn(x => x + 2);
      const fn3 = jest.fn(x => Math.pow(x, 2));

      const chained = chainer([fn1, fn2, fn3]);
      const result = chained(0);

      expect(fn1).toHaveBeenCalledWith(0);
      expect(fn2).toHaveBeenCalledWith(fn1(0));
      expect(fn3).toHaveBeenCalledWith(fn2(fn1(0)));
      expect(result).toBe(fn3(fn2(fn1(0))));
    }
  );
});
