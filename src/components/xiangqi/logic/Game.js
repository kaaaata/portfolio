import genNewXiangqiBoard from './genNewXiangqiBoard';
import getValidMoves from './getValidMoves';

export default class Game {
  constructor() {
    this.board = genNewXiangqiBoard();
    this.turn = 'red';
  }

  getValidMoves(index) {
    return getValidMoves(this.board, index);
  }

  movePiece(index, targetIndex) {
    this.board[targetIndex] = this.board[index];
    this.board[index] = null;
    this.turn = this.turn === 'red' ? 'black' : 'red';
  }
}
