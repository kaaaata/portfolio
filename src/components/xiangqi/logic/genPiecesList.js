
// the order of these pieces determines:
// 1. iteration order for getValidMoves() (this iteration order doesn't actually matter)
// 2. display order for captured pieces in the UI
export const genPiecesList = () => ({
  notCaptured: {
    red: { pao: 2, che: 2, ma: 2, bing: 5, xiang: 2, shi: 2 },
    black: { pao: 0, che: 0, ma: 0, bing: 0, xiang: 0, shi: 0 },
  },
  captured: {
    red: { pao: 2, che: 2, ma: 2, bing: 5, xiang: 2, shi: 2 },
    black: { pao: 0, che: 0, ma: 0, bing: 0, xiang: 0, shi: 0 },
  }
});
