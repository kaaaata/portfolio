export const genMatchups = () => {
  const playerIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const matchups = [];

  [0, 1, 2, 3].forEach(i => {
    matchups.push([
      playerIds.splice(playerIds.length * Math.random(), 1)[0],
      playerIds.splice(playerIds.length * Math.random(), 1)[0],
    ]);
  });

  return matchups;
};
