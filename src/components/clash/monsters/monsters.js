// tier 1: wave 1-4
// tier 2: wave 5-8
// tier 3: wave 9-12

const monstersTier1 = [
  {
    name: 'Minotaur',
    image: 'minotaur',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [
      'Minotaur',
      'Devastating Blow'
    ]
  },
  {
    name: 'Goblin',
    image: 'goblin',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [
      'Goblin',
      'Goblin'
    ]
  },
  {
    name: 'Slime',
    image: 'basic_slime',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: []
  },
  {
    name: 'Fire Slime',
    image: 'fire_slime',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [
      'Burn',
      'Fire',
      'Fire Spear'
    ]
  },
  {
    name: 'Tentacle Monster',
    image: 'tentacles',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [
      'Tentacles',
      'Tentacles'
    ]
  }
];

const monstersTier2 = [
  {
    name: 'Square Slime',
    image: 'slime_potion',
    stats: { attack: 0, magic: 0, defense: 1 },
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
    stats: { attack: 0, magic: 1, defense: 0 },
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
    stats: { attack: 1, magic: 0, defense: 0 },
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
    stats: { attack: 0, magic: 1, defense: 0 },
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
    stats: { attack: 0, magic: 0, defense: 1 },
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
    stats: { attack: 1, magic: 1, defense: 0 },
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
    stats: { attack: 1, magic: 0, defense: 1 },
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
    stats: { attack: 0, magic: 1, defense: 1 },
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
    stats: { attack: 2, magic: 0, defense: 0 },
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
  monstersTier1[i].type = 'wave';
}
for (let i = 0; i < monstersTier2.length; i++) {
  monstersTier2[i].tier = 2;
  monstersTier2[i].type = 'wave';
}
for (let i = 0; i < monstersTier3.length; i++) {
  monstersTier3[i].tier = 3;
  monstersTier3[i].type = 'wave';
}

export const monstersByTier = {
  1: monstersTier1,
  2: monstersTier2,
  3: monstersTier3
};
