'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return result for no functions', () => {
    expect(chainer([])(4)).toEqual(4);
  });

  it('should work with 1 function', () => {
    const f1 = jest.fn((x) => x + 3);

    expect(chainer([f1])(5)).toEqual(8);
    expect(f1).toHaveBeenCalledTimes(1);
  });

  it('should chain functions in left fold', () => {
    const checkOrder = [];
    const f1 = jest.fn((x) => {
      checkOrder.push(1);

      return x / 2;
    });
    const f2 = jest.fn((x) => {
      checkOrder.push(2);

      return x + 1;
    });
    const f3 = jest.fn((x) => {
      checkOrder.push(3);

      return x + '';
    });

    expect(chainer([f1, f2, f3])(20)).toEqual('11');
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
    expect(checkOrder).toEqual([1, 2, 3]);
  });
});
