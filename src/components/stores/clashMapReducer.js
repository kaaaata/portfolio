import { shuffle } from 'lodash';
import { monstersByTier } from '../clash/monsters/monsters';
import { sample } from 'lodash';
import { genMonsterDeck } from '../clash/monsters/genMonsterDeck';;

// 1st ring: 8 tiles: 1 event, 7 monsters
// 2nd ring: 16 tiles: 2 events, 13 monsters, 1 blank
// 3rd ring: 24 tiles, 4 events, 17 monsters, 3 blanks
const createRings = () => ({
  1: shuffle([
    'event',
    ...Array(3).fill('monster')
  ]),
  2: shuffle([
    ...Array(2).fill('event'),
    ...Array(13).fill('monster'),
    'blank'
  ]),
  3: shuffle([
    ...Array(4).fill('event'),
    ...Array(17).fill('monster'),
    ...Array(3).fill('blank')
  ])
});
let rings = createRings();

const node = {
  isVisited: false,
  monster: null,
  event: null
};

const genInitialState = () => {
  const startingMonsters = [
    sample(monstersByTier[1], 1),
    sample(monstersByTier[1], 1),
    sample(monstersByTier[1], 1),
    sample(monstersByTier[1], 1),
  ];

  return {
    nodes: { // { `${x}${y}`: { ...node } }
      '33': {
        ...node,
        isVisited: true
      },
      '23': {
        ...node,
        monster: { ...startingMonsters[0], deck: genMonsterDeck(1, startingMonsters[0].deck) }
      },
      '43': {
        ...node,
        monster: { ...startingMonsters[1], deck: genMonsterDeck(1, startingMonsters[1].deck) }
      },
      '32': {
        ...node,
        monster: { ...startingMonsters[2], deck: genMonsterDeck(1, startingMonsters[2].deck) }
      },
      '34': {
        ...node,
        monster: { ...startingMonsters[3], deck: genMonsterDeck(1, startingMonsters[3].deck) }
      }
    },
    playerNode: '33',
    previewNode: null,
    activeNode: null,
    energy: 50
  };
};

export default (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_MAP_PREVIEW_NODE':
      return {
        ...state,
        previewNode: action.payload
      };
    case 'SET_MAP_ACTIVE_NODE':
      return {
        ...state,
        activeNode: action.payload
      };
    case 'VISIT_MAP_NODE': {
      const x = parseInt(action.payload[0]);
      const y = parseInt(action.payload[1]);
      const nodesToAdd = []; // [{ x, y }]

      if (x - 1 >= 0 && !state.nodes.hasOwnProperty(`${x - 1}${y}`)) nodesToAdd.push({ x: x - 1, y });
      if (x + 1 <= 6 && !state.nodes.hasOwnProperty(`${x + 1}${y}`)) nodesToAdd.push({ x: x + 1, y });
      if (y - 1 >= 0 && !state.nodes.hasOwnProperty(`${x}${y - 1}`)) nodesToAdd.push({ x, y: y - 1 });
      if (y + 1 <= 6 && !state.nodes.hasOwnProperty(`${x}${y + 1}`)) nodesToAdd.push({ x, y: y + 1 });

      const newNodes = {};
      nodesToAdd.forEach(({ x, y }) => {
        let tier;
        if ( // inner ring
          (x === 2 && y === 2)
          || (x === 2 && y === 4)
          || (x === 4 && y === 2)
          || (x === 4 && y === 4)
        ) {
          tier = 1;
        } else if ( // middle ring
          ([1, 5].includes(x) && y >= 1 && y <= 5)
          || ([1, 5].includes(y) && x >= 1 && x <= 5)
        ) {
          tier = 2;
        } else { // outer ring
          tier = 3;
        }

        const newNode = { ...node };
        switch (rings[tier].pop()) {
          case 'monster':
            const monster = sample(monstersByTier[tier], 1);
            newNode.monster = { ...monster, deck: genMonsterDeck(tier, monster.deck) };
            break;
          case 'event':
            const event = 'test_event';
            newNode.event = event;
            break;
          default:
            break;
        }

        newNodes[`${x}${y}`] = newNode;
      });

      return {
        ...state,
        playerNode: action.payload,
        nodes: {
          ...state.nodes,
          ...newNodes
        }
      };
    }
    case 'ADJUST_MAP_ENERGY':
      return {
        ...state,
        energy: state.energy + action.payload
      };
    default:
      return state;
  }
};
