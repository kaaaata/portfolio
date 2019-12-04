import React from 'react'; // eslint-disable-line
import { range } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { layout } from '../styles';

const boardGridOverlayBackgroundCss = css`
  ${layout.absolute('-30px', null, null, '-30px')}
  display: inline-grid;
  grid-template-columns: repeat(10, 60px);
  grid-auto-rows: 60px;
  border: 1px solid black;
  grid-gap: 1px;
  background: white;
  border-radius: 10px;
`;
const boardGridOverlayForegroundCss = css`
  ${layout.absolute('30px', null, null, '30px')}
  display: inline-grid;
  grid-template-columns: repeat(8, 60px);
  grid-auto-rows: 60px;
  border: 1px solid black;
  grid-gap: 1px;
  background: black;

  .square {
    background-color: white;

    &:nth-of-type(n+33):nth-of-type(-n+39) {
      width: 61px;
    }
  }
`;
const diagonalCss = rotation => css`
  border-top: 1px solid black;
  transform: rotate(${rotation});
  width: 172px;
  margin-left: -26px;
  margin-top: -1px;
`;

export const BoardGridOverlay = () => <>
  <div css={boardGridOverlayBackgroundCss}>
    {range(0, 11).map(y => (
      range(0, 10).map(x => (
        <div key={`${x}${y}`} />
      ))
    ))}
  </div>
  <div css={boardGridOverlayForegroundCss}>
    {range(0, 9).map(y => (
      range(0, 8).map(x => (
        <div className='square' key={`${x}${y}`}>
          {x === 3 && (y === 1 || y === 8) && <>
            <div css={diagonalCss('45deg')} />
            <div css={diagonalCss('315deg')} />
          </>}
        </div>
      ))
    ))}
  </div>
</>;
