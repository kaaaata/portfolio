import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { notationToSequences } from './utils';

// assign colors to common triggers for easier memorization
// mirrors & slightly modified triggers are the same color
const triggerColors = {
  "(F R U R' U' F')": '#0CCE6B',
  "(F R U R' U')": '#0CCE6B',
  "(R U R' U')": '#DD9AC2',
  "(R' F R F')": '#4C934C',
  "(f R U R' U' f')": '#D1495B',
  "(R U R' U' f')": '#D1495B',
  "(f' L' U' L U f)": '#D1495B',
  "(R U2 R2')": '#75C9C8',
  "(R U R' U R U2 R')": '#80A4ED',
  "(L' U' L U' L' U2 L)": '#80A4ED',
  "(R U R' U' R' F R F')": '#D4CB92',
  "(R U R' U' R' F R f')": '#D4CB92',
  "(L' U' L U L F' L' f)": '#D4CB92',
  "(F R U' R' U' R U R' F')": '#D96C06'
};
const defaultTriggerColor = '#EFBC9B';
const defaultNotationColor = '#98C1D9';

/**
 * Generate the color for a notation sequence
 * @param {string} notation notation string
 * @returns {string} color hex
 */
const genNotationColor = (notation = '') => {
  const key = notation.trim();
  const isTrigger = notation.startsWith('(') && notation.endsWith(')');

  if (isTrigger) {
    return triggerColors[key] ? triggerColors[key] : defaultTriggerColor;
  } else {
    return defaultNotationColor;
  }
};

/**
 * Colorize algorithm strings
 * @param {string} algorithmString algorithm string
 * @returns {node} colorized cube notation component
 */
const CubeNotation = ({ notation = '', setSearchText }) => {
  // divide string by parentheses
  const sequences = notationToSequences(notation);

  return (
    <h4>
      {sequences.map((s, index) => (
        <span
          key={index}
          css={css`color: ${genNotationColor(s)}; cursor: pointer;`}
          index={index}
          onClick={() => setSearchText(s.replace(/[()\s]/g, ''))}
        >
          {s}
        </span>
      ))}
    </h4>
  );
};

export default CubeNotation;
