'use strict';

const { chainer } = require('./chainer');

it(`should be declared`, () => {
    expect(chainer).toBeInstanceOf(Function);
});

it(`should return a function`, () => {
     const result = chainer([]);
    expect(result).toBeInstanceOf(Function);
  });

it(`should chaining together a list of unary functions`, () => {
  const f1 = jest.fn((x) => {return x * 2});
  const f2 = jest.fn((x) => {return x + 2});
  const f3 = jest.fn((x) => { return Math.pow(x, 2) });
  const result = chainer([f1, f2, f3])(0);
  expect(result).toEqual(4);

  expect(f1).toHaveBeenCalledWith(0);
  expect(f2).toHaveBeenCalledWith(0);
  expect(f3).toHaveBeenCalledWith(2);
  });


  it(`should return input if no functions provided`, () => {
  const result = chainer([])(5);
  expect(result).toBe(5);
});

it(`should work with single function`, () => {
  const f = x => x + 10;
  const result = chainer([f])(5);

  expect(result).toBe(15);
});
