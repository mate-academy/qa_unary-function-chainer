'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
  it('should return a function', () => {
    expect(chainer([])).toBeInstanceOf(Function);
  });

  it(
    'should throw an error'
    + 'if chainer func was called without any args',
    () => {
      const func = () => chainer()(0);

      expect(func).toThrow();
    });

  it('should return initial value on empty function array', () => {
    const VALUE = 1991;
    const result = chainer([])(VALUE);

    expect(result).toBe(VALUE);
  });

  it('Should return a x^2 of x if was passed squareFunc to "functions"', () => {
    const squareFunc = jest.fn(x => x * x);
    const result = chainer([squareFunc])(4);

    expect(result).toBe(16);
  });

  it('should handle "null" and "undefined" input values', () => {
    const result = chainer([x => x * 2, x => x + 2]);

    expect(result(null)).toBe(2);
    expect(result(undefined)).toBe(NaN);
  });

  it('should correctly concat strings', () => {
    const f1 = str => str + 'russian ';
    const f2 = str => str + 'soldier ';
    const f3 = str => str + 'will ';
    const f4 = str => str + 'die :)';

    const result = chainer([f1, f2, f3, f4])('Every ');

    expect(result).toBe('Every russian soldier will die :)');
  });
});
