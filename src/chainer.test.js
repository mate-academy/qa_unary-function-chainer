'use strict'

const { chainer } = require('./chainer');
it('should apply all functions in order', () => {
  const f1 = x => x * 2;          // 0 * 2 = 0
  const f2 = x => x + 2;          // 0 + 2 = 2
  const f3 = x => x * x;          // 2 * 2 = 4

  const chained = chainer([f1, f2, f3]);

  expect(chained(0)).toBe(4);
});
it('should apply all functions in order', () => {
  const f1 = x => x * 2;          // 0 * 2 = 0
 

  const chained = chainer([f1]);

  expect(chained(0)).toBe(0);
});
it('should apply all functions in order', () => {
  const f2 = x => x + 2;          // 0 * 2 = 0
 

  const chained = chainer([f2]);

  expect(chained(2)).toBe(4);
});
it('should apply all functions in order', () => {
  const f2 = x => x + 2; 
  const f3 = x => x * x;         // 0 * 2 = 0
 

  const chained = chainer([f2, f3]);

  expect(chained(0)).toBe(4);
});