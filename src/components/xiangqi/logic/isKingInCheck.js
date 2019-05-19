const possibleKingIndices = {
  red: ['3-0', '3-1', '3-2', '4-0', '4-1', '4-2', '5-0', '5-1', '5-2'],
  black: ['3-7', '3-8', '3-9', '4-7', '4-8', '4-9', '5-7', '5-8', '5-9']
};

export default function isKingInCheck(board, color, piecesList) {
  // find the index occupied by active player's king
  let x, y;
  possibleKingIndices[color].forEach((index) => {
    if (
      board[index]
      && board[index].name === 'jiang'
      && board[index].color === color
    ) {
      x = parseInt(index[0], 10);
      y = parseInt(index[2], 10);
    }
  });

  // starting at the king index, iterate thru all opponent's pieces
  // and see if one of them is in a square that can attack the king.
  const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

  // const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
  // // directions.forEach((direction) => {
  // //   let i = 1;
  // //   while (i < 10) {
  // //     const targetX = parseInt(x, 10) + direction.x * i, targetY = parseInt(y, 10) + direction.y * i;
  // //     const targetIndex = `${targetX}-${targetY}`;
  // //     const targetOutOfBounds = isIndexOutOfBounds(targetX, targetY);
  // //     const targetHasFriendly = board[targetIndex] && board[targetIndex].color === piece.color;
  // //     if (targetOutOfBounds || targetHasFriendly) {
  // //       return;
  // //     }
  // //     validMoves.push(targetIndex);
  // //     i++;
  // //   }
  // // });
  // // validations.isTargetOutOfBounds = null;
  // // validations.targetHasFriendly = null;
  return false;
}
