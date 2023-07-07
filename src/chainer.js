'use strict';

/**
 * @param {function[]} functions
 *
 * @returns {function}
 */
function chainer(functions) {
  return (x) => {
    let result = x;

    for (const f of functions) {
      if (typeof f === 'function') {
        result = f(result);
      }
    }
    return result;
  };
}

module.exports = { chainer };
