'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should return result', () => {
    const f1 = jest.fn((x) => x - 3);
    const f2 = jest.fn((x) => x / 3);
    const f3 = jest.fn((x) => x + 3);

    const result = chainer([f1, f2, f3])(21);

    expect(result).toBe(9);
  });

  it('should return result f1', () => {
    const f1 = jest.fn((x) => x - 3);
    const f2 = jest.fn((x) => x / 3);
    const f3 = jest.fn((x) => x + 3);

    chainer([f1, f2, f3])(21);

    expect(f1.mock.results[0].value).toBe(18);
  });

  it('should return result f2', () => {
    const f1 = jest.fn((x) => x - 3);
    const f2 = jest.fn((x) => x / 3);
    const f3 = jest.fn((x) => x + 3);

    chainer([f1, f2, f3])(21);

    expect(f2.mock.results[0].value).toBe(6);
  });

  it('should return result f3', () => {
    const f1 = jest.fn((x) => x - 3);
    const f2 = jest.fn((x) => x / 3);
    const f3 = jest.fn((x) => x + 3);

    chainer([f1, f2, f3])(21);

    expect(f3.mock.results[0].value).toBe(9);
  });

  it('should return squared result', () => {
    const f1 = jest.fn((x) => x + 2);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(2);

    expect(result).toBe(144);
  });

  it('should return squared result for negative input', () => {
    const f1 = jest.fn((x) => x + 2);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(-2);

    expect(result).toBe(0);
  });

  it('should return squared result with a single function', () => {
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f3])(3);

    expect(result).toBe(9);
  });

  it('should return squared result for zero input', () => {
    const f1 = jest.fn((x) => x + 2);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(36);
  });

  it('should call all functions in correct order', () => {
    const f1 = jest.fn((x) => x + 2);
    const f2 = jest.fn((x) => x * 3);
    const f3 = jest.fn((x) => Math.pow(x, 2));

    chainer([f1, f2, f3])(2);

    expect(f1).toHaveBeenCalledWith(2);
    expect(f2).toHaveBeenCalledWith(4);
    expect(f3).toHaveBeenCalledWith(12);
  });

  it('should return input as is if function array is empty', () => {
    const result = chainer([])(9);

    expect(result).toBe(9);
  });

  it('should return input if function array empty and input empty', () => {
    const result = chainer([])();

    expect(result).toBeUndefined();
  });
});
