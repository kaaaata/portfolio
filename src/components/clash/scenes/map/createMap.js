import { sample, sampleSize, range, shuffle } from 'lodash';
import { monsters } from '../../monsters/monsters';

const mapNode = {
  isRevealed: false,
  isVisited: false,
  isPlayerHere: false,
  monsterId: null,
  eventId: null
};

const testMonsterIds = range(0, monsters.length);
const testEventIds = range(0, 40);

export const createMap = () => {
  const map = Array.from(Array(7)).map(i => Array(7));
  const mapEventIds = sampleSize(testEventIds, 6);

  // generate the rest of the map
  // 1st ring: 8 tiles, 1 event
  // 2nd ring: 16 tiles, 2 events
  // 3rd ring: 24 tiles, 3 events
  const innerRingNodes = shuffle([
    { ...mapNode, eventId: mapEventIds.pop() },
    ...range(3).map(i => ({ ...mapNode, monsterId: sample(testMonsterIds) }))
  ]);
  const middleRingNodes = shuffle([
    { ...mapNode, eventId: mapEventIds.pop() },
    { ...mapNode, eventId: mapEventIds.pop() },
    ...range(14).map(i => ({ ...mapNode, monsterId: sample(testMonsterIds) }))
  ]);
  const outerRingNodes = shuffle([
    { ...mapNode, eventId: mapEventIds.pop() },
    { ...mapNode, eventId: mapEventIds.pop() },
    { ...mapNode, eventId: mapEventIds.pop() },
    ...range(21).map(i => ({ ...mapNode, monsterId: sample(testMonsterIds) }))
  ]);

  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 7; y++) {
      if (x === 3 && y === 3) {
        // place the player
        map[y][x] = {
          ...mapNode,
          isRevealed: true,
          isPlayerHere: true
        };
      } else if (
        (x === 2 && y === 3)
        || (x === 4 && y === 3)
        || (x === 3 && y === 2)
        || (x === 3 && y === 4)
      ) {
        // place the 4 initial monsters
        map[y][x] = {
          ...mapNode,
          isRevealed: true,
          monsterId: sample(testMonsterIds)
        };
      } else if (
        (x === 2 && y === 2)
        || (x === 2 && y === 4)
        || (x === 4 && y === 2)
        || (x === 4 && y === 4)
      ) {
        // create the inner ring
        map[y][x] = innerRingNodes.pop();
      } else if (
        ([1, 5].includes(x) && y >= 1 && y <= 5)
        || ([1, 5].includes(y) && x >= 1 && x <= 5)
      ) {
        // create the middle ring
        map[y][x] = middleRingNodes.pop();
      } else {
        // create the outer ring
        map[y][x] = outerRingNodes.pop();
      }
    }
  }

  return map;
};
