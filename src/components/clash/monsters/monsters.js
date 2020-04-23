export const monsters = [
  {
    name: 'Minotaur',
    image: 'minotaur',
    tier: 1,
    deck: [
      'Minotaur',
      'Devastating Blow'
    ]
  },
  {
    name: 'Warlock',
    image: 'crazy_mage',
    tier: 2,
    deck: [
      'Warlock',
      'Fire',
      'Fire',
      'Candy Corn'
    ]
  },
  {
    name: 'Ice Queen',
    image: 'ice_queen',
    tier: 3,
    deck: [
      'Ice Queen',
      'Ice Blade',
      'Ice Blade',
      'Ice Blade',
      'Healing Blade',
      'Healing Blade',
      'Protect',
      'Protect'
    ]
  }
];

export const monstersByTier = {
  1: monsters.filter(i => i.tier === 1),
  2: monsters.filter(i => i.tier === 2),
  3: monsters.filter(i => i.tier === 3)
};
