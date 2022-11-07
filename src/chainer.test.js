'use strict';

const { chainer } = require('./chainer');

describe('Chainer function:', () => {
  const testFunc1 = (n) => n + 5;
  const testFunc2 = (n) => n - 5;
  const testFunc3 = (n) => n * 5;

  it('should be declared', function() {
    expect(chainer)
      .toBeInstanceOf(Function);
  });

  it('should return a defined result', function() {
    expect(chainer([])(1))
      .toBeDefined();
  });

  it('should call all given function', function() {
    const f1 = jest.fn();
    const f2 = jest.fn();

    chainer([f1, f2])(1);

    expect(f1)
      .toHaveBeenCalled();

    expect(f2)
      .toHaveBeenCalled();
  });

  it('should call all args functions with given number', function() {
    const f1 = jest.fn(n => n);
    const f2 = jest.fn(n => n);

    chainer([f1, f2])(1);

    expect(f1)
      .toHaveBeenCalledWith(1);

    expect(f2)
      .toHaveBeenCalledWith(1);
  });

  it('should return result after first function call', function() {
    const result = chainer([testFunc1])(1);

    expect(result)
      .toBe(6);
  });

  it('should return result after multiple functions call', function() {
    const result = chainer([testFunc1, testFunc2, testFunc3])(5);

    expect(result)
      .toBe(25);
  });

  it('should work with negative numbers', function() {
    const result = chainer([testFunc1, testFunc2, testFunc3])(-5);

    expect(result)
      .toBe(-25);
  });

  it('should work with float numbers', function() {
    const result = chainer([testFunc1, testFunc2, testFunc3])(-5.37);

    expect(result)
      .toBe(-26.85);
  });

  it('should return NaN'
    + 'if functions was called with string argument', function() {
    const result = chainer([testFunc1, testFunc2, testFunc3])('qwery');

    expect(result)
      .toBeNaN();
  });

  it('should return NaN'
    + 'if functions was called without arguments', function() {
    const result = chainer([testFunc1, testFunc2, testFunc3])();

    expect(result)
      .toBeNaN();
  });
});
