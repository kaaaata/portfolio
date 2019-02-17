import { mapValues } from 'lodash';

const flipY = index => `${index[0]}-${9 - index[2]}`;

const isIndexOutOfBounds = (x, y, color, isXiang) => {
  // "x" and "y" are arguments instead of "index" here to allow
  // indices to be evaluated before this function is called
  // which results in more efficient code.
  const xOutOfBounds = x < 0 || x > 8;

  if (xOutOfBounds) {
    return true;
  } else {
    const yOutOfBounds = isXiang
      ? color === 'red' ? y < 0 && y > 4 : y < 5 && y > 9
      : y < 0 || y > 9;
    return yOutOfBounds;
  }
};

const mirrorMovesOverRiver = (moves) => {
  const mirroredMoves = {};

  Object.keys(moves).forEach((startIndex) => {
    mirroredMoves[flipY(startIndex)] = moves[startIndex].map(endIndex => flipY(endIndex));
  });

  return mirroredMoves;
};

const precalculatedMoves = {
  red: {
    shi: {
      '3-0': ['4-1'],
      '3-2': ['4-1'],
      '5-2': ['4-1'],
      '5-0': ['4-1'],
      '4-1': ['3-0', '3-2', '5-2', '5-0']
    },
    jiang: {
      '3-0': ['4-0', '3-1'],
      '3-1': ['3-0', '4-1', '3-2'],
      '3-2': ['3-1', '4-2'],
      '4-0': ['3-0', '4-1', '5-0'],
      '4-1': ['3-1', '4-2', '5-1', '4-0'],
      '4-2': ['3-2', '5-2', '4-1'],
      '5-0': ['4-0', '5-1'],
      '5-1': ['5-0', '4-1', '5-2'],
      '5-2': ['4-2', '5-1']
    }
  },

};
precalculatedMoves.black = mapValues(
  precalculatedMoves.red,
  moves => mirrorMovesOverRiver(moves)
);

export default {
  genNewXiangqiBoard: () => {
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
  },
  getValidMoves(board, index) {
    const piece = board[index];
    let validMoves = [];

    if (piece.name === 'shi') {
      validMoves = precalculatedMoves[piece.color].shi[index];
    } else if (piece.name === 'jiang') {
      validMoves = precalculatedMoves[piece.color].jiang[index];
    } else if (piece.name === 'bing') {
      const x = index[0], y = index[2];
      const hasCrossedRiver = piece.color === 'red'
        ? y >= 5
        : y <= 4;
      validMoves.push(`${x}-${parseInt(y, 10) + (piece.color === 'red' ? 1 : -1)}`);
      if (hasCrossedRiver) {
        validMoves.push(`${parseInt(x, 10) + 1}-${y}`);
        validMoves.push(`${parseInt(x, 10) - 1}-${y}`);
      }
    } else if (piece.name === 'xiang') {
      const x = parseInt(index[0], 10), y = parseInt(index[2], 10);
      const directions = [{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 1 }];
      directions.forEach((direction) => {
        const isBlocked = board[`${x + direction.x}-${y + direction.y}`];
        if (!isBlocked) {
          const targetOutOfBounds = isIndexOutOfBounds(
            x + direction.x * 2, y + direction.y * 2, piece.color, true
          );
          if (!targetOutOfBounds) {
            validMoves.push(`${x + direction.x * 2}-${y + direction.y * 2}`);
          }
        }
      });
    } else if (piece.name === 'che') {
      const x = parseInt(index[0], 10), y = parseInt(index[2], 10);
      const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
      directions.forEach((direction) => {
        let i = 1;
        while (i < 10) {
          const targetX = parseInt(x, 10) + direction.x * i, targetY = parseInt(y, 10) + direction.y * i;
          const targetIndex = `${targetX}-${targetY}`;
          const targetOutOfBounds = isIndexOutOfBounds(targetX, targetY);
          const targetHasFriendly = board[targetIndex] && board[targetIndex].color === piece.color;
          if (targetOutOfBounds || targetHasFriendly) {
            return;
          }
          validMoves.push(targetIndex);
          i++;
        }
      });
    } else if (piece.name === 'pao') {
      const x = parseInt(index[0], 10), y = parseInt(index[2], 10);
      const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
      directions.forEach((direction) => {
        let i = 1, hasJumped;
        while (i < 10) {
          const targetX = parseInt(x, 10) + direction.x * i, targetY = parseInt(y, 10) + direction.y * i;
          const targetIndex = `${targetX}-${targetY}`;
          const targetOutOfBounds = isIndexOutOfBounds(targetX, targetY);
          const targetHasPiece = board[targetIndex];
          if (targetOutOfBounds) {
            return;
          } else if (hasJumped) {
            const targetHasEnemy = targetHasPiece && targetHasPiece.color !== piece.color;
            if (targetHasEnemy) {
              validMoves.push(targetIndex);
              return;
            }
          } else if (targetHasPiece) {
            hasJumped = true;
          } else {
            validMoves.push(targetIndex);
          }
          i++;
        }
      });
    }

    return validMoves.filter((move) => {
      const x = move[0], y = move[2];
      const targetOutOfBounds = isIndexOutOfBounds(`${x}-${y}`);
      const targetHasFriendly = board[move] && board[move].color === piece.color;
      const targetInCheck = false;

      return !(targetHasFriendly || targetInCheck || targetOutOfBounds);
    });
  }
};
