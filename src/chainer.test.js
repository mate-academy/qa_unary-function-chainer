'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  let f1 = jest.fn();
  let f2 = jest.fn();
  let f3 = jest.fn();

  beforeEach(() => {
    f1 = jest.fn();
    f2 = jest.fn();
    f3 = jest.fn();
  });

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('chains functions correctly', () => {
    f1.mockImplementation((x) => x * 2);
    f2.mockImplementation((x) => x + 2);
    f3.mockImplementation((x) => x * 4);

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(8);
  });

  it('calls chained functions with correct arguments', () => {
    f1.mockImplementation((x) => x - 5);
    f2.mockImplementation((x) => x + 2);
    f3.mockImplementation((x) => x * 4);

    chainer([f1, f2, f3])(10);

    expect(f1).toHaveBeenCalledWith(10);
    expect(f2).toHaveBeenCalledWith(5);
    expect(f3).toHaveBeenCalledWith(7);
  });

  it('does not call any function if chain is empty', () => {
    chainer([])(1);

    expect(f1).not.toHaveBeenCalled();
    expect(f2).not.toHaveBeenCalled();
    expect(f3).not.toHaveBeenCalled();
  });

  it('handles single function in chain correctly', () => {
    f1.mockImplementationOnce((x) => x + 10);

    chainer([f1])(1);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(1);
  });

  it('returns correct result with negative values', () => {
    f1.mockImplementationOnce((x) => x + 10);
    f2.mockImplementationOnce((x) => x * 2);
    f3.mockImplementationOnce((x) => x + 1);

    const result = chainer([f1, f2, f3])(-1);

    expect(result).toBe(19);
    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(-1);
  });
});
