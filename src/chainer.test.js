'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a value from each function in the chain', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));
    const result = chainer([f1, f2, f3])(0);

    expect(f1.mock.results[0].value).toBe(0);
    expect(f2.mock.results[0].value).toBe(2);
    expect(f3.mock.results[0].value).toBe(4);
    expect(result).toBe(4);
  });

  it(`should call the passed functions
      in order from the first to the last`, () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x + 2);
    const f3 = jest.fn((x) => Math.pow(x, 2));
    const result = chainer([f1, f2, f3])(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(0);
    expect(f3).toHaveBeenCalledWith(2);
    expect(result).toBe(4);
  });
});
