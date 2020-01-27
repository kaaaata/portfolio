import { CardsArray } from './CardsArray';
import { cards } from '../cards/cards';
import { store } from '../../stores/store';
import { genStartOfTurnActions } from './genStartOfTurnActions';
import { genPlayCardActions } from './genPlayCardActions';
import { stateCopy, actions, logs, resetGlobalVariables } from './globalVariables';

export const playFirstCardInRound = (index) => {
  resetGlobalVariables();

  const state = {
    ...store.getState().clashBattleCards,
    ...store.getState().clashBattleStats
  };
  stateCopy.you = {
    name: state.yourName,
    deck: CardsArray(state.yourDeck, { player: 'you', location: 'deck' }),
    discard: CardsArray(state.yourDiscard, { player: 'you', location: 'discard' }),
    banish: CardsArray(state.yourBanish, { player: 'you', location: 'banish' }),
    hand: CardsArray(state.yourHand, { player: 'you', location: 'hand' }),
    shields: state.yourShields,
    temporaryStats: state.yourTemporaryStats,
    permanentStats: state.yourPermanentStats
  };
  stateCopy.enemy = {
    name: state.enemyName,
    deck: CardsArray(state.enemyDeck, { player: 'enemy', location: 'deck' }),
    discard: CardsArray(state.enemyDiscard, { player: 'enemy', location: 'discard' }),
    banish: CardsArray(state.enemyBanish, { player: 'enemy', location: 'banish' }),
    hand: CardsArray(state.enemyHand, { player: 'enemy', location: 'hand' }),
    shields: state.enemyShields,
    temporaryStats: state.yourTemporaryStats,
    permanentStats: state.yourPermanentStats
  };
  stateCopy.stack = CardsArray(state.stack.map(name => cards[name]));
  stateCopy.winner = state.winner;

  const card = stateCopy.you.hand[index];
  logs.push(`you plays ${card.name}`);
  genPlayCardActions(card, index);

  if (!stateCopy.winner) {
    genStartOfTurnActions('enemy');
    const enemyHandRandomCardIndex = ~~(Math.random() * 3);
    const enemyHandRandomCard = stateCopy.enemy.hand[enemyHandRandomCardIndex];
    // add placeholder
    stateCopy.enemy.hand[enemyHandRandomCardIndex] = {};
    logs.push(`enemy plays ${enemyHandRandomCard.name}`);
    genPlayCardActions(enemyHandRandomCard, enemyHandRandomCardIndex);
    if (!stateCopy.winner) {
      genStartOfTurnActions('you');
    }
  }

  console.log(logs.map(log => log.startsWith('you')
    ? `Player${log.slice(3)}`
    : `Enemy${log.slice(5)}`
  ));

  return actions;
};
