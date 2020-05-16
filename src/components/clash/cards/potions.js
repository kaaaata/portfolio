import { createCard } from './createCard';

export const potions = [
  {
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'uncommon',
    heal: 3,
    onDiscard: {
      heal: 3
    }
  },
  {
    name: 'Bomb',
    image: 'bomb',
    rarity: 'common',
    isToken: true,
    damageSelf: 2,
    onDiscard: {
      damageSelf: 2
    }
  },
  {
    name: 'Burn',
    image: 'burn',
    rarity: 'common',
    isToken: true,
    damageSelf: 1,
    onDiscard: {
      damageSelf: 1
    }
  },
  {
    name: 'Freeze',
    image: 'freeze',
    rarity: 'common',
    isToken: true,
    damageSelf: 1,
    dealsBanishingDamage: true,
    onDiscard: {
      damageSelf: 1,
      dealsBanishingDamage: true
    }
  },
  {
    name: 'Explosive Potion',
    image: 'explosive_potion',
    rarity: 'common',
    attack: 3,
    onDiscard: {
      attack: 3
    },
    description: 'Deal 3 damage.'
  },
  {
    name: 'Edible Slime',
    image: 'slime_potion',
    rarity: 'uncommon',
    customEffect: true,
    onDiscard: {
      customEffect: true
    },
    description: 'Shuffle 3 random common or uncommon cards into your deck.'
  },
  {
    name: 'Attack Potion',
    image: 'attack_potion',
    rarity: 'rare',
    statBonuses: { attack: 1 },
    onDiscard: {
      statBonuses: { attack: 1 }
    },
    description: 'Gain +1 attack for the rest of the battle.'
  },
  {
    name: 'Magic Potion',
    image: 'magic_potion',
    rarity: 'rare',
    statBonuses: { magic: 1 },
    onDiscard: {
      statBonuses: { magic: 1 }
    },
    description: 'Gain +1 magic for the rest of the battle.'
  },
  {
    name: 'Defense Potion',
    image: 'defense_potion',
    rarity: 'rare',
    statBonuses: { defense: 1 },
    onDiscard: {
      statBonuses: { defense: 1 }
    },
    description: 'Gain +1 defense for the rest of the battle.'
  },
  {
    name: 'Golden Goblet',
    image: 'golden_goblet',
    rarity: 'legendary',
    customEffect: true,
    heal: 7,
    onDiscard: {
      customEffect: true,
      heal: 7
    },
    description: 'Shuffle 7 cards from your banish into your discard. Heal 7.'
  }
].map(card => createCard({
  ...card,
  type: 'potion',
  banishesOnPlay: true
}));
