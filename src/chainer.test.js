'use strict'

const { chainer } = require('./chainer');
const { expect } = require('chai');
describe('chainer', () => {
  it('Should correctly chain functions from left to right', () => {
    const functions = [
      (x) => x * 2,
      (x) => x + 4,
      (x) => x / 2
    ];

    const result = chainer(functions)(2);
    expect(result).to.equal(4);
  });

  it('Should work with different input values', () => {
    const functions = [
      (x) => x * 2,
      (x) => x + 4,
      (x) => x / 2
    ];

    const result = chainer(functions)(-2);
    expect(result).to.equal(0);
  });

  it('Should handle an empty array of functions correctly', () => {
    const result = chainer([])(10);
    expect(result).to.equal(10); 
  });
});
