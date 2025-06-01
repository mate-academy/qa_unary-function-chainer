'use strict';

const { chainer } = require('./chainer.js');

describe('chainer function', () => {
  it('should chain properly', () => {
    const f1 = jest.fn((x) => x + 2);
    const f2 = jest.fn((x) => x * 2);

    expect(chainer([f1, f2])(2)).toBe(8);
  });

  it('should work with one function', () => {
    const f1 = jest.fn((x) => x + 2);

    expect(chainer([f1])(2)).toBe(4);
  });

  it('should work with no functions', () => {
    expect(chainer([])(5)).toBe(5);
  });

  it('should be called in right order', () => {
    const f1 = jest.fn((x) => x.trim());
    const f2 = jest.fn((x) => x + ' World!');
    const f3 = jest.fn((x) => x.toUpperCase());

    expect(chainer([f1, f2, f3])('  hello  ')).toBe('HELLO WORLD!');

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();

    expect(f1).toHaveBeenCalledWith('  hello  ');
    expect(f2).toHaveBeenCalledWith('hello');
    expect(f3).toHaveBeenCalledWith('hello World!');
  });
});
