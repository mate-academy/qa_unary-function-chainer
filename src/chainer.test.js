'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');
  const addOne = (x) => x + 1;
  const multiplyByTwo = (x) => x * 2;
  const subtractThree = (x) => x - 3;

  const chainedFunctions = chainer([addOne, multiplyByTwo, subtractThree]);

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return function', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it(`should correctly chain functions and return the expected result`, () => {
    expect(chainedFunctions(5)).toEqual(9);
  });

  it(`should correctly chain functions and return the expected'
  + 'result for null value`, () => {
    expect(chainedFunctions(0)).toEqual(-1);
  });

  it(`should correctly chain functions and return 
    the expected result for undefined value`, () => {
    const result = chainedFunctions(undefined);

    expect(Number.isNaN(result)).toBe(true);
  });
});
