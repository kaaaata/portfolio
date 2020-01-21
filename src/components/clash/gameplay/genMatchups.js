import { store } from '../../stores/store';

export const genMatchups = () => {
  const playerIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const matchups = {};
  const prevMatchups = store.getState().clashPlayers.matchups;

  while (playerIds.length) {
    const playerId = playerIds.pop();
    const possibilities = playerIds.filter(i => (
      i !== prevMatchups[playerId]
      && ((playerIds.length === 3 && matchups.hasOwnProperty(prevMatchups[playerId]))
        // prevent a scenario where the last two playerIds previously faced eachother.
        // hard to explain this logic; easier to draw it out.
        ? !matchups.hasOwnProperty(prevMatchups[i])
        : true)
    ));
    const opponentId = possibilities[~~(Math.random() * possibilities.length)];
    matchups[playerId] = opponentId;
    matchups[opponentId] = playerId;
    playerIds.splice(playerIds.indexOf(opponentId), 1);
  }

  return matchups;
};
