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
    name: 'Edible Slime',
    image: 'slime_potion',
    rarity: 'uncommon',
    customEffect: true,
    onDiscard: {
      customEffect: true
    },
    description: 'Shuffle 3 random non-legendary cards into your deck.'
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
