import { createMap } from '../clash/scenes/map/createMap';

const initialState = {
  map: createMap(),
  energy: 100,
  modalMonsterId: null,
  modalEventId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VISIT_MAP_NODE': {
      // action.payload like { x, y }
      const { x, y } = action.payload;
      const nodesToUpdate = [`${x}${y}`]; // `${x}${y}` so we can use [].includes

      if (x - 1 >= 0 && !state.map[y][x - 1].isVisited) nodesToUpdate.push(`${x - 1}${y}`);
      if (x + 1 <= 6 && !state.map[y][x + 1].isVisited) nodesToUpdate.push(`${x + 1}${y}`);
      if (y - 1 >= 0 && !state.map[y - 1][x].isVisited) nodesToUpdate.push(`${x}${y - 1}`);
      if (y + 1 <= 6 && !state.map[y + 1][x].isVisited) nodesToUpdate.push(`${x}${y + 1}`);

      const newMap = state.map.map((row, y) => row.map((node, x) => {
        if (nodesToUpdate.includes(`${x}${y}`)) {
          return {
            ...node,
            isRevealed: true,
            isVisited: node.isPlayerHere,
            isPlayerHere: x === action.payload.x && y === action.payload.y
          };
        } else if (state.map[y][x].isPlayerHere) {
          return {
            ...node,
            isPlayerHere: false
          };
        } else {
          return node;
        }
      }));

      return {
        ...state,
        map: newMap,
        modalMonsterId: null,
        modalEventId: null
      };
    }
    case 'SET_MAP_ENERGY':
      return {
        ...state,
        energy: action.payload
      };
    case 'OPEN_MAP_NODE_PREVIEW': {
      const { x, y } = action.payload;

      return {
        ...state,
        modalMonsterId: state.map[y][x].monsterId,
        modalEventId: state.map[y][x].eventId
      };
    }
    case 'CLOSE_MAP_NODE_PREVIEW':
      return {
        ...state,
        modalMonsterId: null,
        modalEventId: null
      };
    default:
      return state;
  }
};
