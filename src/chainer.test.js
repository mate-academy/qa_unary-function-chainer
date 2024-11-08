'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return 3', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);

    expect(chainer([a, b, c])(2)).toEqual(3);
  });

  it('should be call three callback', () => {
    const a = jest.fn((x) => x);
    const b = jest.fn((x) => x + 2);
    const c = jest.fn((x) => x - 1);

    expect(chainer([a, b, c])(8)).toEqual(9);
    expect(a).toHaveBeenCalled();
    expect(b).toHaveBeenCalled();
    expect(c).toHaveBeenCalled();
  });
});
