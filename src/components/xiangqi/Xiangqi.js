import React from 'react';
import { range } from 'lodash';
import Draggable from 'react-draggable';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image } from '../particles';
import BoardGridOverlay from './BoardGridOverlay';
import { genNewXiangqiBoard, getValidMoves } from './logic';
import { xiangqiCss, squareCss, highlightCss, boardCss } from './xiangqiCss';

class Xiangqi extends React.Component {
  constructor() {
    super();
    this.state = {
      ...genNewXiangqiBoard(),
      draggedIndex: null, // this needs to be in state for z-index manipulation
      highlightedIndices: []
    };

    this.hoveredIndex = null;
  }

  movePiece(index, targetIndex) {
    this.setState({
      [index]: null,
      [targetIndex]: this.state[index]
    });
  }

  handlePieceDragStart(index) {
    this.setState({
      draggedIndex: index,
      highlightedIndices: getValidMoves(this.state, index)
    });
  }

  handlePieceDragEnd(index) {
    if (typeof index === 'string' && typeof this.hoveredIndex === 'string') {
      if (this.state.highlightedIndices.includes(this.hoveredIndex)) {
        this.movePiece(index, this.hoveredIndex);
      }
    }

    this.setState({
      draggedIndex: null,
      highlightedIndices: []
    });
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
                  {this.state.highlightedIndices.includes(index) && (
                    <div
                      css={highlightCss(this.state[index], this.state[this.state.draggedIndex])}
                    />
                  )}
                  <div
                    className='hitbox'
                    onMouseEnter={() => this.handleHoverSquare(index)}
                  >
                    {index}
                  </div>
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
