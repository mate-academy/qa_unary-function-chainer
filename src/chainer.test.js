'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let f1Mock;
  let f2Mock;
  let f3Mock;

  beforeEach(() => {
    f1Mock = jest.fn().mockReturnValue(2)
    f2Mock = jest.fn().mockReturnValue(4)
    f3Mock = jest.fn().mockReturnValue(8)
  })

  it('should return function', () => {
    const chain = chainer([f1Mock, f2Mock, f3Mock]);
    chain(1);

    expect(f1Mock).toHaveBeenCalledTimes(1);
    expect(f2Mock).toHaveBeenCalledTimes(1);
    expect(f3Mock).toHaveBeenCalledTimes(1);
    expect(typeof chain).toBe('function');
  });

  it('should call from left func to right', () => {
    const chain = chainer([f1Mock, f2Mock, f3Mock]);
    chain(1);

    expect(f1Mock).toHaveBeenCalledWith(1);
    expect(f2Mock).toHaveBeenCalledWith(2)
    expect(f3Mock).toHaveBeenCalledWith(4);
  });

  it('should return correct calculated value', () => {
    const chain = chainer([f1Mock, f2Mock, f3Mock]);
    const result = chain(1);

    expect(result).toBe(8);
  });
})
