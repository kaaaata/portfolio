// tier 1: wave 1-4
// tier 2: wave 5-8
// tier 3: wave 9-12

const monstersTier1 = [
  {
    name: 'Minotaur',
    image: 'minotaur',
    deck: [
      'Minotaur',
      'Devastating Blow'
    ]
  },
  {
    name: 'Goblin',
    image: 'goblin',
    deck: [
      'Goblin',
      'Goblin'
    ]
  },
  {
    name: 'Basic Slime',
    image: 'basic_slime',
    deck: []
  },
  {
    name: 'Fire Slime',
    image: 'fire_slime',
    deck: [
      'Burn',
      'Fire',
      'Fire Spear'
    ]
  },
  {
    name: 'Tentacle Monster',
    image: 'tentacles',
    deck: [
      'Tentacles',
      'Tentacles'
    ]
  }
];

const monstersTier2 = [
  {
    name: 'Green Slime',
    image: 'slime_potion',
    deck: [
      'Slime Potion',
      'Protect',
      'Protect',
      'Healing Potion'
    ]
  },
  {
    name: 'Warlock',
    image: 'crazy_mage',
    deck: [
      'Warlock',
      'Fire',
      'Fire',
      'Candy Corn'
    ]
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    deck: [
      'Hobgoblin',
      'Slice',
      'Slice',
      'Slice'
    ]
  },
  {
    name: 'Mermaid',
    image: 'mermaid',
    deck: [
      'Mermaid',
      'Mermaid',
      'Magic Scroll',
      'Magic Scroll',
      'Mage'
    ]
  },
  {
    name: 'Cleric',
    image: 'cleric',
    deck: [
      'Cleric',
      'Cleric',
      'Healing Potion',
      'Healing Potion'
    ]
  },
  {
    name: 'Cryopyromancer',
    image: 'cryopyromancer',
    deck: [
      'Cryopyromancer',
      'Fire',
      'Ice Punch',
      'Burn',
      'Freeze',
      'Fire Spear',
      'Ice Blade'
    ]
  }
];

const monstersTier3 = [
  {
    name: 'Ice Queen',
    image: 'ice_queen',
    deck: [
      'Ice Queen',
      'Ice Blade',
      'Ice Blade',
      'Healing Blade',
      'Protect'
    ]
  },
  {
    name: 'Mimic',
    image: 'mimic',
    deck: [
      'Mimic',
      'Tentacles',
      'Tentacles',
      'Candy Corn',
      'Fire',
      'Protect',
      'Protect'
    ]
  },
  {
    name: 'Ice Whelp',
    image: 'ice_whelp',
    deck: [
      'Ice Queen',
      'Ice Whelp',
      'Ice Whelp',
      'Ice Blade',
      'Protect'
    ]
  }
];

for (let i = 0; i < monstersTier1.length; i++) {
  monstersTier1[i].tier = 1;
}
for (let i = 0; i < monstersTier2.length; i++) {
  monstersTier2[i].tier = 2;
}
for (let i = 0; i < monstersTier3.length; i++) {
  monstersTier3[i].tier = 3;
}

export const monstersByTier = {
  1: monstersTier1,
  2: monstersTier2,
  3: monstersTier3
};
