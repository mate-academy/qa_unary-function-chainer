'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should call every function only once', () => {
    const f1 = jest.fn();
    const f2 = jest.fn();
    const f3 = jest.fn();

    chainer([f1, f2, f3])(1);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
    expect(f3).toHaveBeenCalledTimes(1);
  });

  it('should return correct value after each call', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x);
    const f3 = jest.fn((x) => x / 2);

    const chain = chainer([f1, f2, f3])(1);

    expect(f1).toHaveBeenCalledWith(1);
    expect(f2).toHaveBeenCalledWith(2);
    expect(f3).toHaveBeenCalledWith(2);
    expect(chain).toBe(1);
  });

  it('should work correctly with valid number input', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x);
    const f3 = jest.fn((x) => x / 2);

    expect(chainer([f1, f2, f3])(1)).toBe(1);
  });

  it('should work correctly with valid string input', () => {
    const f1 = jest.fn((x) => x + 'ing');
    const f2 = jest.fn((x) => x.split(''));
    const f3 = jest.fn((x) => x.join(''));

    expect(chainer([f1, f2, f3])('test')).toBe('testing');
  });
});
