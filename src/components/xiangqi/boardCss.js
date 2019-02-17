import { css } from '@emotion/core';
import { layout, zIndex, colors } from '../styles';

export const boardCss = css`
  position: relative;
`;

export const squareCss = (isAnythingDragged, isThisDragged) => css`
  ${layout.flexCenter};
  margin: -1px 0 0 -1px;

  .piece {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    z-index: ${isAnythingDragged && !isThisDragged
    ? zIndex.mouseEventArea1
    : zIndex.mouseEventArea3};
  }

  .hitbox {
    height: 100%;
    width: 100%;
    z-index: ${isAnythingDragged && !isThisDragged
    ? zIndex.mouseEventArea5
    : zIndex.mouseEventArea3};
  }
`;

export const highlightCss = (piece, draggedPiece) => css`
  position: absolute;
  z-index: ${zIndex.mouseEventArea2};
  border-radius: 50%;
  background: ${colors.grey};
  opacity: 0.75;
  width: 25px;
  height: 25px;

  ${piece && piece.color !== (draggedPiece && draggedPiece.color)
    ? `background: ${colors.yellow};`
    : ''}
`;

export const boardGridCss = css`
  display: inline-grid;
  grid-template-columns: repeat(9, 60px);
  grid-auto-rows: 60px;
  grid-gap: 1px;
  border: 1px solid black;
`;

export const lastMoveHighlightCss = css`
  position: absolute;
  height: 60px;
  width: 60px;
  z-index: ${zIndex.mouseEventArea2};
  border: 3px dashed ${colors.yellow};
  border-radius: 25%;
  opacity: 0.5;
`;
