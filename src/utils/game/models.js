export default {
  rarities: [
    {
      rarity: 'common',
      likelihood: 10, // in percentage
      bonusCount: [0, 1],
      statModifier: 0.9
    },
    {
      rarity: 'uncommon',
      likelihood: 50,
      bonusCount: [1, 2],
      statModifier: 1,
    },
    {
      rarity: 'rare',
      likelihood: 30,
      bonusCount: [2, 3],
      statModifier: 1.1
    },
    {
      rarity: 'legendary',
      likelihood: 10,
      bonusCount: [3, 4],
      statModifier: 1.25
    }
  ],
  bonusBaseStat: 5,
  itemBonuses: [
    {
      name: 'Health Regen',
      prefix: 'Soothing',
      suffix: 'Soothing'
    },
    {
      name: 'Mana Regen',
      prefix: 'Vibrant',
      suffix: 'Vigor'
    },
    {
      name: 'Bonus Damage',
      prefix: 'Lethal',
      suffix: 'Lethality'
    },
    {
      name: 'Lifesteal',
      prefix: 'Living',
      suffix: 'Leeching'
    },
    {
      name: 'Bonus Armor',
      prefix: 'Hardened',
      suffix: 'Steel'
    },
    {
      name: 'Cleave Damage',
      prefix: 'Monstrous',
      suffix: 'Monstrousness'
    },
    {
      name: 'Armor Piercing Damage',
      prefix: 'Desolating',
      suffix: 'Desolation'
    },
    {
      name: 'Poison',
      prefix: 'Poisoned',
      suffix: 'Poison'
    }
  ],
  itemData: [
    {
      type: 'Sword',
      sprite: {
        common: 'sword_01',
        uncommon: 'sword_01',
        rare: 'sword_02',
        legendary: 'sword_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['weapon', 'offhand'],
      baseStat: 50
    },
    {
      type: 'Staff',
      sprite: {
        common: 'staff_01',
        uncommon: 'staff_01',
        rare: 'staff_02',
        legendary: 'staff_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['weapon'],
      baseStat: 50
    },
    {
      type: 'Bow',
      sprite: {
        common: 'bow_01',
        uncommon: 'bow_01',
        rare: 'bow_02',
        legendary: 'bow_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['weapon'],
      baseStat: 50
    },
    {
      type: 'Dart',
      sprite: {
        common: 'arrow_01',
        uncommon: 'arrow_01',
        rare: 'arrow_02',
        legendary: 'arrow_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['weapon', 'offhand'],
      baseStat: 50
    },
    {
      type: 'Shield',
      sprite: {
        common: 'shield_01',
        uncommon: 'shield_01',
        rare: 'shield_02',
        legendary: 'shield_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['offhand'],
      baseStat: 20
    },
    {
      type: 'Tome',
      sprite: {
        common: 'spellbook_01',
        uncommon: 'spellbook_01',
        rare: 'spellbook_02',
        legendary: 'spellbook_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['offhand'],
      baseStat: 5
    },
    {
      type: 'Ring',
      sprite: {
        common: 'ring_01',
        uncommon: 'ring_01',
        rare: 'ring_02',
        legendary: 'ring_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['ring1', 'ring2'],
      baseStat: 5
    },
    {
      type: 'Amulet',
      sprite: {
        common: 'necklace_01',
        uncommon: 'necklace_01',
        rare: 'necklace_02',
        legendary: 'necklace_03',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['amulet'],
      baseStat: 5
    },
    {
      type: 'Poison',
      sprite: {
        common: 'potion_01',
        uncommon: 'potion_01',
        rare: 'potion_02',
        legendary: 'potion_03',
        variants: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
      },
      slots: ['offhand'],
      baseStat: 5
    },
    {
      type: 'Helmet',
      sprite: {
        common: 'helmet_01',
        uncommon: 'helmet_01',
        rare: 'helmet_02',
        legendary: 'helmet_02',
        variants: ['a', 'b', 'c', 'd', 'e']
      },
      slots: ['helm'],
      baseStat: 15
    },
    {
      type: 'Bauble',
      sprite: {
        common: 'gem_01',
        uncommon: 'gem_01',
        rare: 'crystal_01',
        legendary: 'crystal_01',
        variants: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      },
      slots: ['bauble'],
      baseStat: 5
    },
  ],
  itemSlots: {
    helm: 'Helmet',
    neck: 'Amulet',
    ring1: 'Ring',
    ring2: 'Ring',
    weapon: 'Weapon',
    offhand: 'Offhand',
    bauble: 'Bauble',
  },
  charTypes: [
    'fighter', // weapon: sword, offhand: shield or sword
    'ranger', // weapon: bow, offhand: poison
    'mage', // weapon: staff, offhand: shield or tome
    'assassin' // weapon: dart, offhand: shield or dart
  ]
};
