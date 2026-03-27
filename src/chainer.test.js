'use strict';

const { chainer } = require('./chainer');

it(`should return a function`, () => {
  expect(chainer([])).toBeInstanceOf(Function);
});

it(`should return input if callbacks were not passed`, () => {
  expect(chainer([])(0)).toBe(0);
});

it(`should pass the result down the chain`, () => {
  const f1 = jest.fn().mockReturnValue(1);
  const f2 = jest.fn().mockReturnValue(2);
  const f3 = jest.fn().mockReturnValue(3);

  expect(chainer([f1, f2, f3])(0)).toBe(3);
  expect(f1).toHaveBeenCalledWith(0);
  expect(f2).toHaveBeenCalledWith(1);
  expect(f3).toHaveBeenCalledWith(2);
});
