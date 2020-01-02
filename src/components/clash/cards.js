export const cards = {
  'Strike': {
    name: 'Strike',
    image: 'sword',
    rarity: 'common',
    attack: 5,
    defense: 0,
    heal: 0
  },
  'Healing Potion': {
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'common',
    attack: 0,
    defense: 0,
    heal: 3,
    onDiscard: {
      heal: 3
    }
  }
};
