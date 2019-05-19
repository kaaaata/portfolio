const flipY = index => `${index[0]}-${9 - index[2]}`;

export const mirrorMovesOverRiver = (moves) => {
  const mirroredMoves = {};

  Object.keys(moves).forEach((startIndex) => {
    mirroredMoves[flipY(startIndex)] = moves[startIndex].map(endIndex => flipY(endIndex));
  });

  return mirroredMoves;
};
