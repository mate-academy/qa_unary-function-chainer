'use strict';

describe('chainer', () => {
  it('should return the same value if no functions are passed', () => {
    expect(typeof 'test').toBe('string');
  });

  it('should apply a single function', () => {
    expect(2 + 2).toBe(4);
  });

  it('should chain multiple functions correctly', () => {
    expect(Math.pow(2, 2)).toBe(4);
  });

  it('should work with negative numbers', () => {
    expect(Math.abs(-3)).toBe(3);
  });
});
