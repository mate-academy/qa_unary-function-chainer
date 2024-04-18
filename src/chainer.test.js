'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  let firstCallback;
  let secondCallback;
  let args;

  beforeEach(() => {
    firstCallback = jest.fn((x) => x + 1);
    secondCallback = jest.fn((x) => x ** 2);
    args = [firstCallback, secondCallback];
  });

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return number', () => {
    expect(typeof chainer(args)(2)).toBe('number');
  });

  it('should call every callback', () => {
    chainer(args)(2);

    for (const f of args) {
      expect(f).toHaveBeenCalled();
    }
  });

  it('should return correct value', () => {
    const result = chainer(args)(5);

    expect(result).toBe(36);
  });

  it('should be called every callbacks with the correct parameters', () => {
    const result = chainer(args)(10);

    expect(result).toBe(121);
    expect(firstCallback).toHaveBeenCalledWith(10);
    expect(secondCallback).toHaveBeenCalledWith(11);
  });

  it(`should return 'NaN' if input === 'NaN'`, () => {
    const result = chainer(args)(NaN);

    expect(result).toBeNaN();
  });
});
