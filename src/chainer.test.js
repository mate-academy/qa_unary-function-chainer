'use strict';

describe('Chainer function', () => {
  const { chainer } = require('./chainer');
  const testFunction = [
    jest.fn().mockImplementation((x) => x + 1),
    jest.fn().mockImplementation((x) => x - 1),
    jest.fn().mockImplementation((x) => x * 2),
    jest.fn().mockImplementation((x) => x / 2),
    jest.fn().mockImplementation((x) => x ^ 2),
    jest.fn().mockImplementation((x) => x % 2),
  ];
  const [
    addition, subtraction, multiplication, division, exponentiation, modulo,
  ] = testFunction;

  beforeEach(() => {
    addition.mockClear();
    subtraction.mockClear();
    multiplication.mockClear();
    division.mockClear();
    exponentiation.mockClear();
    modulo.mockClear();
  });

  it(`should return another function`, () => {
    const value = chainer([addition, addition, addition]);
    const isReturnedFunction = typeof value;

    expect(isReturnedFunction)
      .toBe('function');
  });

  it(`should invoke all unary function with 'x' argument `, () => {
    chainer([addition, multiplication, multiplication])(2);
    chainer([division, division, exponentiation])(8);
    chainer([subtraction, modulo])(30);

    [addition, multiplication, multiplication].forEach((operation, i) => {
      const nthCall = [1, 1, 2];
      const xValue = [2, 3, 6];

      expect(operation)
        .toHaveBeenNthCalledWith(nthCall[i], xValue[i]);
    });

    [division, division, exponentiation].forEach((operation, i) => {
      const nthCall = [1, 2, 1];
      const xValue = [8, 4, 2];

      expect(operation)
        .toHaveBeenNthCalledWith(nthCall[i], xValue[i]);
    });

    [subtraction, modulo].forEach((operation, i) => {
      const nthCall = [1, 1];
      const xValue = [30, 29];

      expect(operation)
        .toHaveBeenNthCalledWith(nthCall[i], xValue[i]);
    });
  });

  it(`shouldn't throw error when function is called `
      + `with only one argument `, () => {
    expect(() => {
      chainer([addition])(4);
      chainer([subtraction])(8);
      chainer([division])(12);
    }).not.toThrowError();
  });

  it(`should return the end value of all operations `, () => {
    const value = [
      chainer([addition, subtraction, addition])(2),
      chainer([multiplication, multiplication, addition])(2),
      chainer([division, subtraction])(100),
    ];

    const result = [3, 9, 49, 36];

    value.forEach((reducedValue, i) => {
      expect(reducedValue)
        .toBe(result[i]);
    });
  });

  it(`shouldn't throw error when one of 'function' arguments `
      + `doesn't have any parameter`, () => {
    expect(() => {
      chainer([addition, subtraction, addition, () => 5])(2);
      chainer([multiplication, () => 12, multiplication, addition])(2);
      chainer([() => 7 % 3, division, subtraction])(100);
      chainer([() => 18 - 5])(40);
    }).not.toThrowError();
  });
});
