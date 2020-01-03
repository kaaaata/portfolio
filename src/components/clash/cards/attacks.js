import { createCard } from './utils';

export const attacks = [
  createCard({
    name: 'Strike',
    image: 'strike',
    rarity: 'common',
    attack: 2,
    defense: 1
  }),
  createCard({
    name: 'Stab',
    image: 'stab',
    rarity: 'common',
    attack: 1,
    defense: 2
  }),
  createCard({
    name: 'Super Strike',
    image: 'super_strike',
    rarity: 'common',
    attack: 3,
    defense: 1
  }),
  createCard({
    name: 'Giga Strike',
    image: 'giga_strike',
    rarity: 'rare',
    attack: 5,
    defense: 1
  }),
  createCard({
    name: 'Healing Strike',
    image: 'healing_strike',
    rarity: 'uncommon',
    attack: 3,
    defense: 1,
    heal: 3
  }),
  createCard({
    name: 'Chop',
    image: 'chop',
    rarity: 'common',
    attack: 2,
    defense: 0
  }),
  createCard({
    name: 'Invincible Chop',
    image: 'invincible_chop',
    rarity: 'rare',
    attack: 4,
    defense: 0,
    unblockable: true,
    description: 'Unblockable.'
  }),
  createCard({
    name: 'Invincible Strike',
    image: 'invincible_strike',
    rarity: 'rare',
    attack: 3,
    defense: 1,
    unblockable: true,
    description: 'Unblockable.'
  }),
  createCard({
    name: 'Cursed Blade',
    image: 'purple_attack',
    rarity: 'legendary',
    attack: 1,
    defense: 0,
    meltsArmor: true,
    description: 'Deals 2 extra damage per point of enemy\'s armor.'
  }),
  createCard({
    name: 'Necro Strike',
    image: 'necro_strike',
    rarity: 'uncommon',
    attack: 2,
    defense: 1,
    necro: 4,
    description: 'Deals 1 extra damage for every 4 cards in your discard pile.'
  }),
  createCard({
    name: 'Necro Stab',
    image: 'necro_stab',
    rarity: 'uncommon',
    attack: 1,
    defense: 3,
    necro: 4,
    description: 'Deals 1 extra damage for every 4 cards in your discard pile.'
  }),
  createCard({
    name: 'Necro Chop',
    image: 'necro_chop',
    rarity: 'uncommon',
    attack: 1,
    defense: 0,
    necro: 3,
    description: 'Deals 1 extra damage for every 3 cards in your discard pile.'
  }),
  createCard({
    name: 'Invincible Stab',
    image: 'invincible_stab',
    rarity: 'rare',
    attack: 1,
    defense: 4,
    unblockable: true,
    description: 'Unblockable.'
  }),
  createCard({
    name: 'Throwing Knife',
    image: 'throwing_knife',
    rarity: 'common',
    attack: 1,
    defense: 0
  }),
  createCard({
    name: 'Block',
    image: 'block',
    rarity: 'common',
    attack: 0,
    defense: 2
  }),
  createCard({
    name: 'Hard Block',
    image: 'strong_block',
    rarity: 'common',
    attack: 0,
    defense: 4
  }),
  createCard({
    name: 'Perfect Block',
    image: 'perfect_block',
    rarity: 'rare',
    attack: 0,
    defense: 7
  }),
  createCard({
    name: 'Fire Block',
    image: 'fire_block',
    rarity: 'rare',
    attack: 3,
    defense: 5,
    magical: true,
    description: 'Magical. (Damage dealt is unblockable and banishes. Not affected by attack bonus.)'
  }),
].map(card => (
  { ...card, type: 'attack' }
));
