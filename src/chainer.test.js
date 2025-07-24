/* eslint-disable max-len */
'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('should return a function that does a left fold on the given functions', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  it('shhould run all functions', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });
});
