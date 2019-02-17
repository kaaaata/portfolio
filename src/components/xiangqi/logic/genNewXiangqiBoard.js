export default function genNewXiangqiBoard() {
  const board = {};
  const createPiece = (name, color, x, y) => {
    board[`${x}-${y}`] = { name, color, image: `xiangqi/${color}_${name}.png` };
  };

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 10; y++) {
      board[`${x}-${y}`] = null;
    }
  }

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
}
