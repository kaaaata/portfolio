import { css } from '@emotion/core';
import { layout, zIndex, colors } from '../styles';

export const xiangqiCss = css`
  position: relative;
`;

export const squareCss = (isAnythingDragged, isThisDragged) => css`
  ${layout.flexCenter};

  .piece {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
    border-radius: 50%;
    position: absolute;
    z-index: ${isAnythingDragged && !isThisDragged
    ? zIndex.mouseEventAreaBackground
    : zIndex.mouseEventAreaMiddleground};
  }

  .hitbox {
    height: 100%;
    width: 100%;
    z-index: ${isAnythingDragged && !isThisDragged
    ? zIndex.mouseEventAreaForeground
    : zIndex.mouseEventAreaMiddleground};
  }

  .highlight {
    position: absolute;
    z-index: ${zIndex.mouseEventAreaMiddleground};
    border-radius: 50%;
    background: ${colors.grey};
    opacity: 0.5;
    width: 25px;
    height: 25px;
  }
`;

export const boardCss = css`
  display: inline-grid;
  grid-template-columns: repeat(9, 60px);
  grid-auto-rows: 60px;
  grid-gap: 1px;
  border: 1px solid black;
`;
