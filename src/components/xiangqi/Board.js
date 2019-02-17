import React from 'react';
import { range } from 'lodash';
import Draggable from 'react-draggable';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image } from '../particles';
import BoardGridOverlay from './BoardGridOverlay';
import { genNewXiangqiBoard, Game } from './logic';
import {
  boardCss,
  squareCss,
  highlightCss,
  boardGridCss,
  lastMoveHighlightCss
} from './boardCss';

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      ...genNewXiangqiBoard(),
      draggedIndex: null, // this needs to be in state for z-index manipulation
      highlightedIndices: [],
      lastMoveStart: null,
      lastMoveEnd: null
    };

    this.Game = new Game();
    this.turn = 'red';
    this.hoveredIndex = null;
  }

  movePiece(index, targetIndex) {
    this.Game.movePiece(index, targetIndex);
    this.setState({
      [targetIndex]: this.state[index],
      [index]: null,
      lastMoveStart: index,
      lastMoveEnd: targetIndex
    });
    this.turn = this.turn === 'red' ? 'black' : 'red';
  }

  handlePieceDragStart(index) {
    this.setState({
      draggedIndex: index,
      highlightedIndices: this.Game.getValidMoves(index)
    });
  }

  handlePieceDragEnd(index) {
    if (this.state.highlightedIndices.includes(this.hoveredIndex)) {
      this.movePiece(index, this.hoveredIndex);
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
    console.log('board rerendering');

    return (
      <div css={boardCss}>
        <BoardGridOverlay />
        <div
          className='board'
          css={boardGridCss}
          onMouseLeave={() => this.setState({ hoveredIndex: null })}
        >
          {range(0, 10).reverse().map(y => (
            range(0, 9).map((x) => {
              const index = `${x}-${y}`;
              const piece = this.state[index] && (
                <Draggable
                  onStart={() => this.handlePieceDragStart(index)}
                  onStop={() => this.handlePieceDragEnd(index)}
                  position={{ x: 0, y: 0 }}
                  bounds='.board'
                >
                  <Image
                    src={this.state[index].image}
                    width={50}
                    height={50}
                    className='piece'
                  />
                </Draggable>
              );
              const hitbox = (
                <div
                  className='hitbox'
                  onMouseEnter={() => this.handleHoverSquare(index)}
                />
              );
              const highlight = this.state.highlightedIndices.includes(index) && (
                <div css={highlightCss(this.state[index], this.state[this.state.draggedIndex])} />
              );
              const lastMoveHighlight = (
                index === this.state.lastMoveStart || index === this.state.lastMoveEnd
              ) && (
                <div css={lastMoveHighlightCss} />
              );

              return (
                <div
                  key={index}
                  css={squareCss(
                    this.state.draggedIndex,
                    this.state.draggedIndex === index
                  )}
                >
                  {lastMoveHighlight}
                  {highlight}
                  {hitbox}
                  {piece}
                </div>
              );
            })
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
