'use strict';

const { chainer } = require('./chainer');
const assert = require('assert'); // Import the built-in assert module

describe('chainer', function() {
  it('should chain a list of unary functions and return the correct result',
    function() {
      function f1(x) {
        return x * 2;
      }

      function f2(x) {
        return x + 2;
      }

      function f3(x) {
        return Math.pow(x, 2);
      }

      const chainedFn = chainer([f1, f2, f3]);

      assert.strictEqual(chainedFn(0), 4);
      assert.strictEqual(chainedFn(2), 36);
      assert.strictEqual(chainedFn(3), 64);
    });

  it('should return the input unchanged if no functions are provided',
    function() {
      const chainedFn = chainer([]);

      assert.strictEqual(chainedFn(42), 42);
    });

  it('should work correctly with functions that return 0', function() {
    function f1(x) {
      return x - 5;
    }

    function f2(x) {
      return x + 5;
    }

    function f3(x) {
      return x * 0;
    }

    const chainedFn = chainer([f1, f2, f3]);

    assert.strictEqual(chainedFn(10), 0);
  });
});
