'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const fn = chainer([]);
    expect(typeof fn).toBe('function');
  });

  it('should correctly chain multiple unary functions', () => {
    const f1 = x => x * 2;
    const f2 = x => x + 2;
    const f3 = x => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    // step by step: f1(0)=0, f2(0+2)=2, f3(2^2)=4
    expect(chained(0)).toBe(4);

    // step by step: f1(1)=2, f2(2)=4, f3(4^2)=16
    expect(chained(1)).toBe(16);
  });

  it('should handle a single function', () => {
    const f = x => x + 10;
    const chained = chainer([f]);
    expect(chained(5)).toBe(15);
  });

  it('should handle an empty array', () => {
    const chained = chainer([]);
    expect(chained(42)).toBe(42); // identity
  });

  it('should apply functions in left-to-right order', () => {
    const calls = [];
    const f1 = x => { calls.push('f1'); return x + 1; };
    const f2 = x => { calls.push('f2'); return x * 2; };
    const f3 = x => { calls.push('f3'); return x - 3; };

    const chained = chainer([f1, f2, f3]);
    const result = chained(0);

    expect(result).toBe(-1); // ((0+1)*2)-3 = -1
    expect(calls).toEqual(['f1','f2','f3']);
  });

  it('should propagate errors from any function', () => {
    const errorFn = x => { throw new Error('fail'); };
    const chained = chainer([x => x + 1, errorFn]);
    expect(() => chained(0)).toThrow('fail');
  });
});
