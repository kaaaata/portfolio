// utility functions to assist with deck manipulations

const getters = {
  getTopCard: arr => arr[arr.length - 1]
};

const removers = {
  removeTopCard: arr => (
    arr.slice(0, arr.length - 1)
  )
};

const adders = {
  addCardToTop: (arr, card) => (
    arr.concat([card])
  )
};

export default {
  ...getters,
  ...removers,
  ...adders
};
