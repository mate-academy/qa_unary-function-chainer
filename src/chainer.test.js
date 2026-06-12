'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it('should return 10 when arg equal 3', () => {
    const addTwo = (x) => x + 2;
    const addDouble = (x) => x * 2;

    expect(chainer([addTwo, addDouble])(3)).toBe(10);
  });

  it('should return the input value when the array is empty', () => {
    expect(chainer([])(21)).toBe(21);
  });

  it('should call f1 with start and call f2 with hello', () => {
    const f1 = jest.fn().mockReturnValue('hello');
    const f2 = jest.fn();

    chainer([f1, f2])('start');

    expect(f1).toHaveBeenCalledWith('start');
    expect(f2).toHaveBeenCalledWith('hello');
  });
});
