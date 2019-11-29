/**
 * Split up cube notation into sequences by parens
 * Assumes parens are correct and not nested.
 * @param {string} notation notation string (raw)
 * @returns {array} sequence array split up by parens (display)
 */
export const notationToSequences = (notation = '') => {
  const sequences = [];

  let chars = '';
  let inParens = false;
  for (let i = 0; i < notation.length; i++) {
    if (notation[i] === '(') {
      if (!inParens) {
        sequences.push(chars);
        chars = '';
      }
      inParens = true;
    }
    chars += notation[i];
    if (notation[i] === ')') {
      sequences.push(chars);
      chars = '';
      inParens = false;
    }
  }

  sequences.push(chars);

  return sequences.filter(Boolean);
};
