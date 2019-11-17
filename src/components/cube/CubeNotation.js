import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const cubeNotationCss = css`
  
`;
// assign colors to common triggers for easier memorization
// mirrors & slightly modified triggers are the same color
const triggerColors = {
  "(F R U R' U' F')": '#98C1D9',
  "(F R U R' U')": '#98C1D9',
  "(R U R' U')": '#DD9AC2',
  "(R' F R F')": '#9DB5B2',
  "(f R U R' U' f')": '#9D6A89',
  "(R U R' U' f')": '#9D6A89',
  "(f' L' U' L U f)": '#9D6A89',
  "(R U2 R2')": '#EFBC9B',
  "(R U R' U R U2 R')": '#80A4ED',
  "(L' U' L U' L' U2 L)": '#80A4ED',
  "(R U R' U' R' F R F')": '#D4CB92',
  "(R U R' U' R' F R f')": '#D4CB92',
  "(L' U' L U L F' L' f)": '#D4CB92',
  "(F R U' R' U' R U R' F')": '#D96C06'
};

/**
 * Colorize algorithm strings
 * @param {string} algorithmString algorithm string
 * @returns {node} colorized cube notation component
 */
const CubeNotation = ({ algorithmString = '' }) => {
  // divide string by parentheses
  const sequences = algorithmString
    .match(/[^()]+/g) // I don't really understand this regex
    .filter(i => i.replace(/\s/g, '').length) // remove whitespace sequences
    .map(i => i.trim()); // remove excess whitespace

  return (
    <h3 css={cubeNotationCss}>
      {sequences.map((s, index) => (
        <span
          css={triggerColors[s] ? css`color: ${triggerColors[s]};` : ''}
          index={index}
        >
          {s}
        </span>
      ))}
    </h3>
  );
};

export default CubeNotation;
