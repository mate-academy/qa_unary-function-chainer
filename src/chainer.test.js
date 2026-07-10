'use strict';

const { chainer } = require('./chainer');

describe(`'chainer' function`, () => {
  test('should be declared as a function', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  test('should return a new function when invoked with an array', () => {
    const chained = chainer([]);

    expect(chained).toBeInstanceOf(Function);
  });

  test('should correctly chain functions from left to right', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const chained = chainer([f1, f2, f3]);

    expect(chained(0)).toBe(4);

    expect(chained(2)).toBe(36);
  });

  test('should strictly preserve left-to-right execution order', () => {
    const subtractFive = (x) => x - 5;
    const doubleValue = (x) => x * 2;

    const firstRoute = chainer([subtractFive, doubleValue]);
    const secondRoute = chainer([doubleValue, subtractFive]);

    expect(firstRoute(10)).toBe(10);
    expect(secondRoute(10)).toBe(15);
  });

  test(
    'should return the initial input unchanged' +
      'if the functions array is empty',
    () => {
      const chained = chainer([]);

      expect(chained(5)).toBe(5);
      expect(chained('identity')).toBe('identity');
      expect(chained({ user: 'active' })).toEqual({ user: 'active' });
    },
  );

  test(
    'should work correctly' + 'when the array contains only a single function',
    () => {
      const addTen = (x) => x + 10;
      const chained = chainer([addTen]);

      expect(chained(5)).toBe(15);
    },
  );

  test(
    'should allow the returned chained function' +
      'to be reused multiple times independently',
    () => {
      const appendStar = (s) => s + '*';
      const chained = chainer([appendStar, appendStar]);

      expect(chained('a')).toBe('a**');
      expect(chained('b')).toBe('b**');
      expect(chained('')).toBe('**');
    },
  );
});
