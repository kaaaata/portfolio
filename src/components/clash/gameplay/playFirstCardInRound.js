import { CardsArray } from './CardsArray';
import { cards } from '../cards/cards';
import { store } from '../../stores/store';
import { startTurn } from './startTurn';
import { playCard } from './playCard';
import { isThereAWinner } from './isThereAWinner';

export const playFirstCardInRound = (index) => {
  const _state = {
    clashBattleCards: store.getState().clashBattleCards,
    clashBattleStats: store.getState().clashBattleStats
  };
  const { clashBattleCards, clashBattleStats } = _state;
  const state = {
    you: {
      name: clashBattleStats.yourName,
      deck: CardsArray(clashBattleCards.yourDeck),
      discard: CardsArray(clashBattleCards.yourDiscard),
      banish: CardsArray(clashBattleCards.yourBanish),
      hand: CardsArray(clashBattleCards.yourHand),
      shields: clashBattleStats.yourShields,
      temporaryStats: clashBattleStats.yourTemporaryStats,
      permanentStats: clashBattleStats.yourPermanentStats
    },
    enemy: {
      name: clashBattleStats.enemyName,
      deck: CardsArray(clashBattleCards.enemyDeck),
      discard: CardsArray(clashBattleCards.enemyDiscard),
      banish: CardsArray(clashBattleCards.enemyBanish),
      hand: CardsArray(clashBattleCards.enemyHand),
      shields: clashBattleStats.enemyShields,
      temporaryStats: clashBattleStats.yourTemporaryStats,
      permanentStats: clashBattleStats.yourPermanentStats
    },
    stack: CardsArray(clashBattleCards.stack),
    winner: clashBattleStats.winner,
    logs: [],
    renderActions: []
  };
  const { logs, renderActions } = state;

  const card = state.you.hand[index];
  logs.push(`You played: ${card.name}`);
  // any function that uses stateCopy should put its reference as the first arg
  playCard(state, card, 'you', 'hand', index);

  if (!isThereAWinner(state, 'enemy')) {
    startTurn(state, 'enemy');
    const enemyHandRandomCardIndex = ~~(Math.random() * 3);
    const enemyHandRandomCard = state.enemy.hand[enemyHandRandomCardIndex];
    // add placeholder
    state.enemy.hand[enemyHandRandomCardIndex] = {};
    logs.push(`${state.enemy.name} plays: ${enemyHandRandomCard.name}`);
    playCard(state, enemyHandRandomCard, 'enemy', 'hand', enemyHandRandomCardIndex);

    if (!isThereAWinner(state, 'you')) {
      startTurn(state, 'you');
    }
  }

  console.log(logs.map(log => log.startsWith('you')
    ? `You${log.slice(3)}`
    : `Enemy${log.slice(5)}`
  ));

  return renderActions;
};
