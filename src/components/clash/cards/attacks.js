import { createCard } from './utils';

export const attacks = [
  createCard({
    name: 'Strike',
    image: 'strike',
    rarity: 'common',
    attack: 2,
    defense: 0
  }),
  createCard({
    name: 'Slash',
    image: 'slash',
    rarity: 'common',
    attack: 1,
    defense: 1
  }),
  createCard({
    name: 'Crush',
    image: 'crush',
    rarity: 'common',
    attack: 3,
    defense: 0
  }),
  createCard({
    name: 'Parry',
    image: 'parry',
    rarity: 'common',
    attack: 1,
    defense: 2
  }),
  createCard({
    name: 'Heavy Strike',
    image: 'heavy_strike',
    rarity: 'common',
    attack: 2,
    defense: 0,
    pierce: 1
  }),
  createCard({
    name: 'Piercing Blow',
    image: 'piercing_blow',
    rarity: 'uncommon',
    attack: 3,
    defense: 1,
    pierce: 2
  }),
  createCard({
    name: 'Chop',
    image: 'chop',
    rarity: 'uncommon',
    attack: 4,
    defense: 0
  }),
  createCard({
    name: 'Two Handed Strike',
    image: 'two_handed_strike',
    rarity: 'uncommon',
    attack: 4,
    defense: 1
  }),
  createCard({
    name: 'Sunder',
    image: 'sunder',
    rarity: 'rare',
    attack: 6,
    defense: 0,
    damageSelf: 3
  }),
  createCard({
    name: 'Healing Blade',
    image: 'fat_blue_sword',
    rarity: 'rare',
    attack: 3,
    defense: 0,
    heal: 3
  }),
  // createCard({
  //   name: 'Necro Strike',
  //   image: 'necro_strike',
  //   rarity: 'uncommon',
  //   attack: 2,
  //   defense: 1,
  //   necro: 4,
  //   description: 'Deals 1 extra damage for every 4 cards in your discard pile.'
  // }),
  // createCard({
  //   name: 'Necro Stab',
  //   image: 'necro_stab',
  //   rarity: 'uncommon',
  //   attack: 1,
  //   defense: 3,
  //   necro: 4,
  //   description: 'Deals 1 extra damage for every 4 cards in your discard pile.'
  // }),
  // createCard({
  //   name: 'Necro Chop',
  //   image: 'necro_chop',
  //   rarity: 'uncommon',
  //   attack: 1,
  //   defense: 0,
  //   necro: 3,
  //   description: 'Deals 1 extra damage for every 3 cards in your discard pile.'
  // }),
  // createCard({
  //   name: 'Invincible Stab',
  //   image: 'invincible_stab',
  //   rarity: 'rare',
  //   attack: 1,
  //   defense: 4,
  //   unblockable: true,
  //   description: 'Unblockable.'
  // }),
  // createCard({
  //   name: 'Throwing Knife',
  //   image: 'throwing_knife',
  //   rarity: 'common',
  //   attack: 1,
  //   defense: 0
  // }),
  // createCard({
  //   name: 'Block',
  //   image: 'block',
  //   rarity: 'common',
  //   attack: 0,
  //   defense: 2
  // }),
  // createCard({
  //   name: 'Hard Block',
  //   image: 'strong_block',
  //   rarity: 'common',
  //   attack: 0,
  //   defense: 4
  // }),
  // createCard({
  //   name: 'Perfect Block',
  //   image: 'perfect_block',
  //   rarity: 'rare',
  //   attack: 0,
  //   defense: 7
  // }),
  // createCard({
  //   name: 'Fire Block',
  //   image: 'fire_block',
  //   rarity: 'rare',
  //   attack: 3,
  //   defense: 5,
  //   magical: true,
  //   description: 'Magical. (Damage dealt is unblockable and banishes. Not affected by attack bonus.)'
  // }),
].map(card => (
  { ...card, type: 'attack' }
));
