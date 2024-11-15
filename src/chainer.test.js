const { chainer } = require('./chainer');

describe('chainer function', () => {
  const f1 = jest.fn((x) => x * 2);
  const f2 = jest.fn((x) => x + 2);
  const f3 = jest.fn((x) => Math.pow(x, 2));

  const mockFunctions = [f1, f2, f3];
  const chained = chainer(mockFunctions);

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should chain multiple functions correctly', () => {
    expect(chained(0)).toBe(4);
  });

  it('should chaines functions in correct order', () => {
    expect(chained(2)).toBe(36);
  });

  it('should calls each function in the array', () => {
    chained(3);

    expect(f1).toHaveBeenCalled();
    expect(f2).toHaveBeenCalled();
    expect(f3).toHaveBeenCalled();
  });

  it('should chaines functions with negative number', () => {
    expect(chained(-2)).toBe(4);
  });

  it('should work with a single function', () => {
    const chained = chainer([f2]);
    expect(chained(10)).toBe(12);
  });

  it('should return initial value if no functions were provided', () => {
    const chained = chainer([]);
    expect(chained(10)).toBe(10);
  });

  it('should throw an error if no function values were passed', () => {
    expect(() => chainer([1])(1)).toThrow();
    expect(() => chainer(['a'])(1)).toThrow();
  });
});
