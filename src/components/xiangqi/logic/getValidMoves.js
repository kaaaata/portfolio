import { mapValues } from 'lodash';
import { isKingInCheck } from './isKingInCheck';
import * as utils from './utils';

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

const precalculatedValidMoves = {
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
precalculatedValidMoves.black = mapValues(
  precalculatedValidMoves.red,
  moves => utils.mirrorMovesOverRiver(moves)
);

const isIndexUnderAttack = (index, friendlyColor) => {
  return false;
};

export const getValidMoves = (board, index, piecesList) => {
  const piece = board[index];
  const validations = {
    isTargetOutOfBounds: (x, y) => isIndexOutOfBounds(x, y),
    targetHasFriendly: move => board[move] && board[move].color === piece.color
  };
  let validMoves = [];

  if (isKingInCheck(board, piece.color, piecesList) && piece.name !== 'jiang') {
    return [];
  } else if (piece.name === 'shi') {
    validMoves = precalculatedValidMoves[piece.color].shi[index];
  } else if (piece.name === 'jiang') {
    validMoves = precalculatedValidMoves[piece.color].jiang[index];
    validations.isTargetUnderAttack = isIndexUnderAttack(index, piece.color);
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
    validations.isTargetOutOfBounds = null;
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
    validations.isTargetOutOfBounds = null;
    validations.targetHasFriendly = null;
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
    validations.isTargetOutOfBounds = null;
    validations.targetHasFriendly = null;
  } else if (piece.name === 'ma') {
    const x = parseInt(index[0], 10), y = parseInt(index[2], 10);
    const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
    const moves = [];
    directions.forEach((direction) => {
      const isBlocked = board[`${x + direction.x}-${y + direction.y}`];
      if (!isBlocked) {
        if (direction.x === 0) {
          moves.push({ x: x + 1, y: y + direction.y * 2 });
          moves.push({ x: x - 1, y: y + direction.y * 2 });
        } else if (direction.y === 0) {
          moves.push({ x: x + direction.x * 2, y: y - 1 });
          moves.push({ x: x + direction.x * 2, y: y + 1 });
        }
      }
    });
    moves.forEach((move) => {
      if (!isIndexOutOfBounds(move.x, move.y)) {
        validMoves.push(`${move.x}-${move.y}`);
      }
    });
    validations.isTargetOutOfBounds = null;
  }

  return validMoves.filter(move => !(
    (validations.isTargetOutOfBounds && validations.isTargetOutOfBounds(move[0], move[2]))
    || (validations.targetHasFriendly && validations.targetHasFriendly(move))
    || (validations.targetInCheck && validations.isKingInCheck(move))
    || (validations.isTargetUnderAttack && validations.isTargetUnderAttack(move, piece.color))
  ));
};
