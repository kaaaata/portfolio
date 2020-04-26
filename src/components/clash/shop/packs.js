export const packs = {
  bronze: {
    name: 'Bronze Pack',
    cards: {
      legendary: 0,
      rare: 0,
      uncommon: 0,
      common: 5
    },
    description: [
      '5 commons'
    ],
    rarityCap: 'common',
    cost: 5,
    image: 'bronze_bar'
  },
  silver: {
    name: 'Silver Pack',
    cards: {
      legendary: 0,
      rare: 0,
      uncommon: 1,
      common: 4
    },
    description: [
      '2 uncommons',
      '3 commons'
    ],
    rarityCap: 'uncommon',
    cost: 10,
    image: 'silver_bar'
  },
  gold: {
    name: 'Gold Pack',
    cards: {
      legendary: 0,
      rare: 1,
      uncommon: 1,
      common: 3
    },
    description: [
      '1 rare',
      '1 uncommon',
      '3 commons'
    ],
    rarityCap: 'rare',
    cost: 15,
    image: 'gold_bar'
  },
  platinum: {
    name: 'Platinum Pack',
    cards: {
      legendary: 1,
      rare: 1,
      uncommon: 1,
      common: 2
    },
    description: [
      '1 legendary',
      '1 rare',
      '1 uncommon',
      '2 commons'
    ],
    rarityCap: 'legendary',
    cost: 20,
    image: 'platinum'
  },
  diamond: {
    name: 'Diamond Pack',
    cards: {
      legendary: 2,
      rare: 3,
      uncommon: 0,
      common: 0
    },
    description: [
      '2 legendaries',
      '3 rares'
    ],
    rarityCap: 'legendary',
    cost: 25,
    image: 'ruby'
  }
};
