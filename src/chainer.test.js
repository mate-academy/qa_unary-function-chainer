'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a functions', () => {
    const result = chainer([]);

    expect(result).toBeInstanceOf(Function);
  });

  it('should correctly chain function', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => x ** 2;

    expect(chainer([f1, f2, f3])(0)).toBe(4);
  });

  it('should work correctly with a single function', () => {
    const double = (x) => x * 2;

    expect(chainer([double])(5)).toBe(10);
  });

  it('should return the input unchanged if function array is empty', () => {
    expect(chainer([])(24)).toBe(24);
  });
});
