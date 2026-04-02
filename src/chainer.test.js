'use strict';

const { chainer } = require('./chainer');

let fn1, fn2, fn3, fn4;
let args;
const callOrder = [];

beforeEach(() => {
  [fn1, fn2, fn3, fn4] = [
    jest.fn(
      (i) => {
        callOrder.push(1);

        return i + 1;
      }
    ),
    jest.fn(
      (i) => {
        callOrder.push(2);

        return i - 1;
      }
    ),
    jest.fn(
      (i) => {
        callOrder.push(3);

        return i + 2;
      }
    ),
    jest.fn(
      (i) => {
        callOrder.push(4);

        return i - 2;
      }
    ),
  ];
  args = [fn1, fn2, fn3, fn4];
});

it('should be declared', () => {
  expect(chainer).toBeInstanceOf(Function);
});

it('call all functions and have been called in order', () => {
  chainer(args)(3);

  args.forEach(fn => expect(fn).toHaveBeenCalled());
  expect(callOrder).toEqual([1, 2, 3, 4]);
});

it('each function should get consistant params', () => {
  chainer(args)(3);

  expect(fn1).toHaveBeenCalledWith(3);
  expect(fn2).toHaveBeenCalledWith(4);
  expect(fn3).toHaveBeenCalledWith(3);
  expect(fn4).toHaveBeenCalledWith(5);
});
