import { createCard } from './createCard';

export const allies = [
  {
    name: 'Weapons Guy',
    image: 'weapons_guy',
    rarity: 'common',
    attack: 2,
    defense: 1,
    customEffect: true,
    description: 'Shuffle 2 random Attacks into your deck.'
  },
  {
    name: 'Recruiter',
    image: 'recruiter',
    rarity: 'common',
    attack: 0,
    defense: 1,
    customEffect: true,
    description: 'Play a random Ally from your discard pile, then banish them.'
  },
  {
    name: 'Spear Goon',
    image: 'red_spear_guy',
    rarity: 'common',
    attack: 1,
    defense: 4,
    pierces: true,
    shuffleCardCopiesIntoYourPiles: [{ card: 'Spear Goon', pile: 'deck' }],
    description: 'Damage dealt pierces shields. Shuffle a copy of Spear Goon into your deck.'
  },
  {
    name: 'Wayne',
    image: 'goblin',
    rarity: 'common',
    attack: 0,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Bomb', pile: 'deck' },
      { card: 'Bomb', pile: 'deck' },
      { card: 'Bomb', pile: 'deck' },
    ],
    description: 'Shuffle 3 copies of Bomb into your opponent\'s deck.'
  },
  {
    name: 'Cleric',
    image: 'cleric',
    rarity: 'common',
    attack: 0,
    defense: 2,
    customEffect: true,
    onDiscard: {
      customEffect: true
    },
    description: 'When played or discarded, shuffle a random Potion from your banish into your deck.'
  },
  {
    name: 'Mermaid',
    image: 'mermaid',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    heal: 4,
    healEnemy: 4
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    rarity: 'uncommon',
    attack: 1,
    defense: 0,
    playCopiesOfCards: ['Slice'],
    description: 'Play a copy of Slice.'
  },
  {
    name: 'Brawler',
    image: 'brawler',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    customEffect: true,
    description: 'Play 2 random Attacks from your discard pile, then banish them.'
  },
  {
    name: 'Warlock',
    image: 'crazy_mage',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    temporaryStatGain: {
      magic: -1
    },
    playCopiesOfCards: ['Fire', 'Fire', 'Fire'],
    description: 'Lose 1 Magic for the rest of the battle. Play 3 copies of Fire.'
  },
  {
    name: 'Fire Dragon',
    image: 'fire_dragon_head',
    rarity: 'rare',
    attack: 4,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Burn', pile: 'deck' },
      { card: 'Burn', pile: 'deck' },
    ],
    description: 'Shuffle 2 copies of Burn into your opponent\'s deck.'
  },
  {
    name: 'Minotaur',
    image: 'minotaur',
    rarity: 'rare',
    attack: 4,
    defense: 0,
    temporaryStatGain: {
      attack: 1
    },
    description: 'Gain +1 Attack for the rest of the battle.'
  },
  {
    name: 'Elf',
    image: 'elf',
    rarity: 'rare',
    attack: 0,
    defense: 4,
    temporaryStatGain: {
      defense: 1
    },
    description: 'Gain +1 Defense for the rest of the battle.'
  },
  {
    name: 'Mage',
    image: 'mage',
    rarity: 'rare',
    attack: 2,
    defense: 2,
    temporaryStatGain: {
      magic: 1
    },
    description: 'Gain +1 Magic for the rest of the battle.'
  },
  {
    name: 'Vampire',
    image: 'vampire',
    rarity: 'rare',
    attack: 4,
    defense: 2,
    damageSelf: 2,
    banishes: true,
    dealsBanishingDamage: true
  },
  {
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    rarity: 'legendary',
    attack: 4,
    defense: 4,
    playCopiesOfCards: ['Healing Blade'],
    shuffleCardCopiesIntoYourPiles: [
      { card: 'Healing Blade', pile: 'deck' },
      { card: 'Healing Blade', pile: 'deck' }
    ],
    description: 'Shuffle two copies of Healing Blade into your deck. Play an additional copy of Healing Blade.'
  },
  {
    name: 'Ice Queen',
    image: 'ice_queen',
    rarity: 'legendary',
    attack: 3,
    defense: 5,
    shuffleCardCopiesIntoYourPiles: [
      { card: 'Ice Blade', pile: 'deck', index: 'top' },
      { card: 'Ice Blade', pile: 'deck', index: 'top' }
    ],
    onDiscard: {
      shuffleCardCopiesIntoYourPiles: [
        { card: 'Ice Blade', pile: 'deck', index: 'top' },
        { card: 'Ice Blade', pile: 'deck', index: 'top' }
      ],
    },
    description: 'When played or discarded, add two copies of Ice Blade to the top of your deck.'
  }
].map(card => createCard({
  ...card,
  type: 'ally'
}));
