import React from 'react';
import { range, cloneDeep, isEmpty } from 'lodash';
import Draggable from 'react-draggable';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts, layout, zIndex } from '../styles';
import { Title, FlexContainer, FlexItem, Image } from '../particles';
import { graphqlQuery, saveText, trackStats } from '../utils/graphql';
import BoardGridOverlay from './BoardGridOverlay';

const xiangqiCss = css`
  position: relative;
`;
const squareCss = (isAnythingDragged, isThisDragged) => css`
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
`;

const boardCss = css`
  display: inline-grid;
  grid-template-columns: repeat(9, 60px);
  grid-auto-rows: 60px;
  grid-gap: 1px;
  border: 1px solid black;
`;

const genNewXiangqiBoard = () => {
  const board = {};
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 10; y++) {
      board[`${x}-${y}`] = null;
    }
  }

  const createPiece = (name, color, x, y) => {
    board[`${x}-${y}`] = { name, color, image: `xiangqi/${color}_${name}.png` };
  };
  ['red', 'black'].forEach((color) => {
    createPiece('che', color, 0, color === 'red' ? 0 : 9);
    createPiece('che', color, 8, color === 'red' ? 0 : 9);
    createPiece('ma', color, 1, color === 'red' ? 0 : 9);
    createPiece('ma', color, 7, color === 'red' ? 0 : 9);
    createPiece('xiang', color, 2, color === 'red' ? 0 : 9);
    createPiece('xiang', color, 6, color === 'red' ? 0 : 9);
    createPiece('shi', color, 3, color === 'red' ? 0 : 9);
    createPiece('shi', color, 5, color === 'red' ? 0 : 9);
    createPiece('jiang', color, 4, color === 'red' ? 0 : 9);
    createPiece('pao', color, 1, color === 'red' ? 2 : 7);
    createPiece('pao', color, 7, color === 'red' ? 2 : 7);
    createPiece('bing', color, 0, color === 'red' ? 3 : 6);
    createPiece('bing', color, 2, color === 'red' ? 3 : 6);
    createPiece('bing', color, 4, color === 'red' ? 3 : 6);
    createPiece('bing', color, 6, color === 'red' ? 3 : 6);
    createPiece('bing', color, 8, color === 'red' ? 3 : 6);
  });

  return board;
};

class Xiangqi extends React.Component {
  constructor() {
    super();
    this.state = {
      ...genNewXiangqiBoard(),
      draggedIndex: null
    };

    this.hoveredIndex = null;
  }

  isValidMove(index, targetIndex) {
    if (typeof index === 'string' && typeof targetIndex === 'string') {
      return true;
    }
  }

  movePiece(index, targetIndex) {
    this.setState({
      [index]: null,
      [targetIndex]: this.state[index]
    });
  }

  handlePieceDragStart(index) {
    this.setState({ draggedIndex: index });
  }

  handlePieceDragEnd(index) {
    if (this.isValidMove(index, this.hoveredIndex)) {
      this.movePiece(index, this.hoveredIndex);
    }

    this.setState({ draggedIndex: null });
  }

  handleHoverSquare(index) {
    if (this.state.draggedIndex) {
      this.hoveredIndex = index;
    }
  }

  render() {
    console.log('xiangqi rerendering');

    return (
      <div css={xiangqiCss}>
        <BoardGridOverlay />
        <div className='board' css={boardCss}>
          {range(0, 10).reverse().map(y => (
            range(0, 9).map((x) => {
              const index = `${x}-${y}`;
              const piece = this.state[index];

              return (
                <div
                  key={index}
                  css={squareCss(
                    this.state.draggedIndex,
                    this.state.draggedIndex === index
                  )}
                >
                  <div
                    className='hitbox'
                    onMouseEnter={() => this.handleHoverSquare(index)}
                  />
                  {piece && (
                    <Draggable
                      onStart={() => this.handlePieceDragStart(index)}
                      onStop={() => this.handlePieceDragEnd(index)}
                      position={{ x: 0, y: 0 }}
                      bounds='.board'
                    >
                      <Image
                        src={piece.image}
                        width={50}
                        height={50}
                        className='piece'
                      />
                    </Draggable>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
    );
  }
}

export default Xiangqi;
