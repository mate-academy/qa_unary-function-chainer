'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it(`should be declared and be an instance of Function`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return input argument if an empty array pass', () => {
    const result = chainer([]);

    expect(result(0)).toBe(0);
  });

  it('should return correct value if one function pass', () => {
    const f = jest.fn(x => x + 1);

    const result = chainer([f]);

    expect(result(0)).toBe(1);
  });

  it('should pass result of previous function to the next function', () => {
    const f1 = jest.fn(x => x + 1);
    const f2 = jest.fn(x => x * 2);
    const f3 = jest.fn(x => x + 2);

    const result = chainer([f1, f2, f3]);

    result(0);

    expect(f1).toHaveBeenCalledWith(0);
    expect(f2).toHaveBeenCalledWith(1);
    expect(f3).toHaveBeenCalledWith(2);
  });

  it('should return correct value', () => {
    const f1 = jest.fn(x => x + 1);
    const f2 = jest.fn(x => x * 2);
    const f3 = jest.fn(x => x + 2);

    const result = chainer([f1, f2, f3]);

    expect(result(0)).toBe(4);
  });
});
