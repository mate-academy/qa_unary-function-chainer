'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return input as-is if no functions are passed', () => {
    const chain = chainer([]);

    expect(chain(5)).toBe(5);
    expect(chain('test')).toBe('test');
  });

  it('should apply a single function to the input', () => {
    const double = (x) => x * 2;
    const chain = chainer([double]);

    expect(chain(3)).toBe(6);
  });

  it('should apply multiple functions in left-to-right order', () => {
    const f1 = (x) => x * 2; // input * 2
    const f2 = (x) => x + 2; // result + 2
    const f3 = (x) => Math.pow(x, 2); // square

    const chain = chainer([f1, f2, f3]);

    // chainer([f1, f2, f3])(0) = f3(f2(f1(0))) = f3(f2(0)) = f3(2) = 4
    expect(chain(0)).toBe(4);
  });

  it('should work with string transformations', () => {
    const addA = (x) => x + 'a';
    const toUpper = (x) => x.toUpperCase();
    const reverse = (x) => x.split('').reverse().join('');

    const chain = chainer([addA, toUpper, reverse]);

    expect(chain('hi')).toBe('AIH'); // "hi" → "hia" → "HIA" → "AIH"
  });

  it('should handle identity functions correctly', () => {
    const identity = (x) => x;
    const chain = chainer([identity, identity, identity]);

    expect(chain(123)).toBe(123);
    expect(chain('hello')).toBe('hello');
  });
});
