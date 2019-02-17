// each element has z-index equal to its index in the array.
const zIndexOrder = [
  // lowest
  'default',
  'mouseEventArea1',
  'mouseEventArea2',
  'mouseEventArea3',
  'mouseEventArea4',
  'mouseEventArea5',
  'stickyNav',
  'stickyNavFilter',
  'stickyNavContent',
  'maximum'
  // highest
];
const zIndex = {};

zIndexOrder.forEach((item) => {
  zIndex[item] = zIndexOrder.indexOf(item);
});

export default zIndex;
