'use strict';

/**
 * Chains together unary functions left-to-right.
 * @param {Function[]} fns - List of unary functions.
 * @returns {Function}
 */
function chainer(fns) {
  return function(input) {
    return fns.reduce((acc, fn) => fn(acc), input);
  };
}

module.exports = { chainer };
