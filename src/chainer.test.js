'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should chain two functions', () => {
    const f1 = jest.fn((x) => x * 2);
    const f2 = jest.fn((x) => x * 3);
    const chain = chainer([f1, f2]);

    expect(chain(5)).toBe(30);
    expect(f1).toHaveBeenCalledWith(5);
    expect(f2).toHaveBeenCalledWith(10);
  });

  it('should chain multiple functions', () => {
    function f1(x) {
      return x * 2;
    }

    function f2(x) {
      return x + 2;
    }

    function f3(x) {
      return Math.pow(x, 2);
    }

    const chain = chainer([f1, f2, f3]);

    expect(chain(0)).toBe(4);
    expect(chain(2)).toBe(36);
  });

  it('should handle empty array of functions', () => {
    const chain = chainer([]);

    expect(chain(5)).toBe(5);
  });

  it('should not modify the input if no functions are given', () => {
    const chain = chainer([]);

    expect(chain(0)).toBe(0);
    expect(chain(10)).toBe(10);
  });
});
