import { genStartingDeck, genSampleEndgameDeck } from '../clash/cards/cards';

const initialState = {
  1: {
    id: 1,
    name: 'Spear Goon',
    image: 'red_spear_guy',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genSampleEndgameDeck(),
    collection: []
  },
  2: {
    id: 2,
    name: 'Wayne',
    image: 'goblin',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genStartingDeck(),
    collection: []
  },
  3: {
    id: 3,
    name: 'Elf',
    image: 'elf',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genStartingDeck(),
    collection: []
  },
  4: {
    id: 4,
    name: 'Mage',
    image: 'mage',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genStartingDeck(),
    collection: []
  },
  5: {
    id: 5,
    name: 'Mermaid',
    image: 'mermaid',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genStartingDeck(),
    collection: []
  },
  6: {
    id: 6,
    name: 'Recruiter',
    image: 'recruiter',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genStartingDeck(),
    collection: []
  },
  7: {
    id: 7,
    name: 'Weapons Guy',
    image: 'weapons_guy',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genStartingDeck(),
    collection: []
  },
  8: {
    id: 8,
    name: 'Brawler',
    image: 'brawler',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 0,
    score: 0,
    deck: genStartingDeck(),
    collection: []
  },

  playerId: null,

  matchups: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_ID':
      return {
        ...state,
        playerId: action.payload
      };
    case 'SET_MATCHUPS':
      return {
        ...state,
        matchups: action.payload
      };
    case 'SET_PLAYER_PROPERTIES':
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload.properties
        }
      };
    default:
      return state;
  }
};
