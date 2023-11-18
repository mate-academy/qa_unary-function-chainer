const { chainer } = require('./chainer');

describe('chainer', () => {
  test('should chain functions correctly', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    expect(chainer([f1, f2, f3])(0)).toBe(4);
    expect(chainer([f1, f2, f3])(2)).toBe(36);
  });

  test('should return the input if no functions are provided', () => {
    expect(chainer([])(5)).toBe(5);
  });

  test('should handle a single function', () => {
    const f1 = x => x * 2;
    expect(chainer([f1])(3)).toBe(6);
  });

  test('should handle functions that return non-numeric values', () => {
    const f1 = x => x + 'a';
    const f2 = x => x + 'b';
    expect(chainer([f1, f2])('c')).toBe('cab');
  });
});
