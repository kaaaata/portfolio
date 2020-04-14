import { createMap } from '../clash/scenes/map/createMap';

const initialState = {
  map: createMap(),
  energy: 100
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VISIT_MAP_TILE':
      // action.payload like { x, y }
      const { x, y } = action.payload;
      const tilesToUpdate = [`${x}${y}`]; // `${x}${y}` so we can use [].includes

      if (x - 1 >= 0 && !state.map[y][x - 1].isVisited) tilesToUpdate.push(`${x - 1}${y}`);
      if (x + 1 <= 6 && !state.map[y][x + 1].isVisited) tilesToUpdate.push(`${x + 1}${y}`);
      if (y - 1 >= 0 && !state.map[y - 1][x].isVisited) tilesToUpdate.push(`${x}${y - 1}`);
      if (y + 1 <= 6 && !state.map[y + 1][x].isVisited) tilesToUpdate.push(`${x}${y + 1}`);

      const newMap = state.map.map((row, y) => row.map((node, x) => (
        tilesToUpdate.includes(`${x}${y}`) ? {
          ...node,
          isRevealed: true,
          isVisited: node.isPlayerHere,
          isPlayerHere: x === action.payload.x && y === action.payload.y
        } : node
      )));

      return {
        ...state,
        map: newMap,
        energy: state.energy - (state.map[y][x].monsterId ? 10 : 0)
      };
    case 'SET_MAP_ENERGY':
      return {
        ...state,
        energy: action.payload
      }
    default:
      return state;
  }
};
