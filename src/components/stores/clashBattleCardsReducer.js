import { cards, genRandomDeck } from '../clash/cards/cards';

const sampleDeck = genRandomDeck();

const initialState = {
  yourDeck: sampleDeck.slice(0, 25)
    .map(card => ({ ...card, player: 'you', location: 'deck' })),
  yourDiscard: []
    .map(card => ({ ...card, player: 'you', location: 'discard' })),
  yourBanish: []
    .map(card => ({ ...card, player: 'you', location: 'deck' })),
  yourHand: [cards['Catherine the Great'], cards['Two Handed Strike'], cards['Sunder']]
    .map(card => ({ ...card, player: 'you', location: 'hand' })),
  enemyDeck: [
    ...Array(15).fill(cards['Parry']),
    cards['Healing Potion'],
    ...Array(2).fill(cards['Parry']),
  ]
    .map(card => ({ ...card, player: 'enemy', location: 'discard' })),
  enemyDiscard: []
    .map(card => ({ ...card, player: 'enemy', location: 'discard' })),
  enemyBanish: []
    .map(card => ({ ...card, player: 'enemy', location: 'banish' })),
  enemyHand: Array(3).fill(cards['Parry'])
    .map(card => ({ ...card, player: 'enemy', location: 'hand' })),
  stack: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_YOUR_DECK':
      return {
        ...state,
        yourDeck: action.payload
      };
    case 'SET_YOUR_DISCARD':
      return {
        ...state,
        yourDiscard: action.payload
      };
    case 'SET_YOUR_BANISH':
      return {
        ...state,
        yourBanish: action.payload
      };
    case 'SET_YOUR_HAND':
      return {
        ...state,
        yourHand: action.payload
      };
    case 'SET_ENEMY_DECK':
      return {
        ...state,
        enemyDeck: action.payload
      };
    case 'SET_ENEMY_DISCARD':
      return {
        ...state,
        enemyDiscard: action.payload
      };
    case 'SET_ENEMY_BANISH':
      return {
        ...state,
        enemyBanish: action.payload
      };
    case 'SET_ENEMY_HAND':
      return {
        ...state,
        enemyHand: action.payload
      };
    case 'SET_STACK':
      return {
        ...state,
        stack: action.payload
      };
    default:
      return state;
  }
};
