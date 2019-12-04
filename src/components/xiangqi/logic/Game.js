import { genNewXiangqiBoard } from './genNewXiangqiBoard';
import { getValidMoves } from './getValidMoves';
import { genPiecesList } from './genPiecesList';

export class Game {
  constructor() {
    this.board = genNewXiangqiBoard();
    this.turn = 'red';
    this.piecesList = genPiecesList();
  }

  getValidMoves(index) {
    return getValidMoves(this.board, index, this.piecesList);
  }

  movePiece(index, targetIndex) {
    this.board[targetIndex] = this.board[index];
    this.board[index] = null;
    this.turn = this.turn === 'red' ? 'black' : 'red';
  }
}
