import { cards } from '../clash/cards/cards';

const initialState = {
  yourDeck: [],
  yourDiscard: [
    ...Array(16).fill(cards['Strike'])
  ]
    .map(card => ({ ...card, player: 'you', location: 'discard' })),
  yourBanish: []
    .map(card => ({ ...card, player: 'you', location: 'deck' })),
  yourHand: [
    cards['Recruiter'],
    cards['Sunder'],
    cards['Slice']
  ]
    .map(card => ({ ...card, player: 'you', location: 'hand' })),
  enemyDeck: [
    ...Array(2).fill(cards['Strike'])
  ]
    .map(card => ({ ...card, player: 'enemy', location: 'discard' })),
  enemyDiscard: []
    .map(card => ({ ...card, player: 'enemy', location: 'discard' })),
  enemyBanish: []
    .map(card => ({ ...card, player: 'enemy', location: 'banish' })),
  enemyHand: Array(3).fill(cards['Fire'])
    .map(card => ({ ...card, player: 'enemy', location: 'hand' })),
  stack: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_YOUR_DECK':
      return {
        ...state,
        yourDeck: action.payload.map(card => ({ ...card, player: 'you', location: 'deck' }))
      };
    case 'SET_YOUR_DISCARD':
      return {
        ...state,
        yourDiscard: action.payload.map(card => ({ ...card, player: 'you', location: 'discard' }))
      };
    case 'SET_YOUR_BANISH':
      return {
        ...state,
        yourBanish: action.payload.map(card => ({ ...card, player: 'you', location: 'banish' }))
      };
    case 'SET_YOUR_HAND':
      return {
        ...state,
        yourHand: action.payload.map(card => ({ ...card, player: 'you', location: 'hand' }))
      };
    case 'SET_ENEMY_DECK':
      return {
        ...state,
        enemyDeck: action.payload.map(card => ({ ...card, player: 'enemy', location: 'deck' }))
      };
    case 'SET_ENEMY_DISCARD':
      return {
        ...state,
        enemyDiscard: action.payload.map(card => ({ ...card, player: 'enemy', location: 'discard' }))
      };
    case 'SET_ENEMY_BANISH':
      return {
        ...state,
        enemyBanish: action.payload.map(card => ({ ...card, player: 'enemy', location: 'banish' }))
      };
    case 'SET_ENEMY_HAND':
      return {
        ...state,
        enemyHand: action.payload.map(card => ({ ...card, player: 'enemy', location: 'hand' }))
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
