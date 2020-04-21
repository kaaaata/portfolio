import { createMap } from '../clash/scenes/map/createMap';

const initialState = {
  map: createMap(),
  energy: 10,
  previewMonsterId: null,
  previewEventId: null,
  previewX: null,
  previewY: null
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
        previewMonsterId: null,
        previewEventId: null
      };
    }
    case 'ADJUST_MAP_ENERGY':
      return {
        ...state,
        energy: state.energy + action.payload
      };
    case 'OPEN_MAP_NODE_PREVIEW': {
      const { x, y } = action.payload;
      console.log('openmapnodepreview', { x,y });
      return {
        ...state,
        previewMonsterId: state.map[y][x].monsterId,
        previewEventId: state.map[y][x].eventId,
        previewX: x,
        previewY: y
      };
    }
    case 'CLOSE_MAP_NODE_PREVIEW':
      return {
        ...state,
        previewMonsterId: null,
        previewEventId: null
      };
    default:
      return state;
  }
};
