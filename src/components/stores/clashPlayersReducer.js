import {
  genStartingDeck,
  genStartingCollection
} from '../clash/cards/cards';

const initialState = {
  1: {
    id: 1,
    name: 'Spear Goon',
    image: 'red_spear_guy',
    attack: 0,
    magic: 0,
    defense: 0,
    gold: 100,
    score: 0,
    deck: genStartingDeck(),
    collection: genStartingCollection()
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
    collection: genStartingCollection()
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
    collection: genStartingCollection()
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
    collection: genStartingCollection()
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
    collection: genStartingCollection()
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
    collection: genStartingCollection()
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
    collection: genStartingCollection()
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
    collection: genStartingCollection()
  },

  playerId: null,

  matchups: {}
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
    case 'SET_AI_MATCH_RESULTS':
      const newState = {};
      const idsAlreadyPlayed = [];
      Object.keys(state.matchups).forEach(id => {
        if (
          ![parseInt(id), state.matchups[id]].includes(state.playerId)
          && !idsAlreadyPlayed.includes(parseInt(id))
        ) {
          console.log(`ai playing game: ${id} vs. ${state.matchups[id]}`);
          idsAlreadyPlayed.push(parseInt(id));
          idsAlreadyPlayed.push(state.matchups[id]);
        }
      });
      return {
        ...state,
        ...newState
      };
    default:
      return state;
  }
};
