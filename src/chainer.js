/**
 * @param {function[]} functions
 *
 * @returns {function}
 */
// eslint-disable-next-line strict
function chainer(functions) {
  return (x) => {
    let result = x;

    for (const f of functions) {
      result = f(result);
    }

    return result;
  };
}

module.exports = { chainer };
