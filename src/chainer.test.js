'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    const result = chainer([]);

    expect(typeof result).toBe('function');
  });

  it('should chain unary functions in left-to-right order', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => x ** 2;

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);
  });

  it('should return the input value if functions list is empty', () => {
    const chained = chainer([]);

    expect(chained(10)).toBe(10);
  });

  it('should call functions in order with correct arguments', () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => x - 2);

    const chained = chainer([f1, f2, f3]);

    chained(5);

    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(f1.mock.results[0].value);
    expect(f3).toHaveBeenCalledWith(f2.mock.results[0].value);
  });

  it('should work correctly with mock functions returning fixed values', () => {
    const f1 = jest.fn().mockReturnValue(10);
    const f2 = jest.fn().mockReturnValue(20);

    const chained = chainer([f1, f2]);

    const result = chained(5);

    expect(result).toBe(20);
    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(10);
  });

  it('should work with strings too', () => {
    const f1 = (x) => x + 'a';
    const f2 = (x) => x + 'b';

    const chained = chainer([f1, f2]);

    expect(chained('')).toBe('ab');
  });
});
