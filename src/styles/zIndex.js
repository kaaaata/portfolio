// each element has z-index equal to its index in the array.
const zIndexOrder = [
  // lowest
  'default',
  'stickyNav',
  'stickyNavFilter',
  'stickyNavContent'
  // highest
];
const zIndex = {};

zIndexOrder.forEach((item) => {
  zIndex[item] = zIndexOrder.indexOf(item);
});

export default zIndex;
