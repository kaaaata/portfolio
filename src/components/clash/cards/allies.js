import { createCard } from './createCard';

export const allies = [
  {
    name: 'Swordsman',
    image: 'soldier',
    rarity: 'common',
    attack: 3,
    defense: 1
  },
  {
    name: 'Spearman',
    image: 'red_spear_guy',
    rarity: 'common',
    attack: 2,
    defense: 2
  },
  {
    name: 'Recruiter',
    image: 'shop_girl',
    rarity: 'common',
    attack: 0,
    defense: 2,
    customEffect: true,
    description: 'Play a random ally from your discard pile, then banish it.'
  },
  {
    name: 'Goblin Bomber',
    image: 'goblin',
    rarity: 'common',
    attack: 1,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Bomb', pile: 'deck' }
    ],
    description: 'Shuffle a copy of Bomb into your opponent\'s deck.'
  },
  {
    name: 'Cleric',
    image: 'cleric',
    rarity: 'common',
    attack: 0,
    defense: 3,
    customEffect: true,
    onDiscard: {
      customEffect: true
    },
    description: 'When played or discarded, shuffle a random potion from your banish into your deck.'
  },
  {
    name: 'Paladin',
    image: 'paladin',
    rarity: 'common',
    attack: 2,
    defense: 1,
    shuffleCardCopiesIntoYourPiles: [{ card: 'Healing Blade', pile: 'deck' }],
    description: 'Shuffle a copy of Healing Blade into your deck.'
  },
  {
    name: 'Mermaid',
    image: 'mermaid',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    heal: 5,
    healEnemy: 1
  },
  {
    name: 'Ice Whelp',
    image: 'ice_whelp',
    rarity: 'uncommon',
    attack: 3,
    defense: 1,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Freeze', pile: 'deck' },
      { card: 'Freeze', pile: 'deck' }
    ],
    description: 'Shuffle 2 copies of Freeze into your opponent\'s deck.'
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    rarity: 'uncommon',
    attack: 2,
    defense: 0,
    playCopiesOfCards: ['Slice'],
    description: 'Play a copy of Slice.'
  },
  {
    name: 'Brawler',
    image: 'brawler',
    rarity: 'uncommon',
    attack: 3,
    defense: 2,
    customEffect: true,
    description: 'Shuffle a copy of a random non-legendary attack into your deck.'
  },
  {
    name: 'Warlock',
    image: 'crazy_mage',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Fire', 'Fire'],
    description: 'Play 2 copies of Fire.'
  },
  {
    name: 'Mimic',
    image: 'mimic',
    rarity: 'uncommon',
    attack: 2,
    defense: 2,
    playCopiesOfCards: ['Tentacles', 'Tentacles'],
    description: 'Play 2 copies of Tentacles'
  },
  {
    name: 'Minotaur',
    image: 'minotaur',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    description: 'Play 2 random attacks from your discard, then banish them.'
  },
  {
    name: 'Mage',
    image: 'mage',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    description: 'Gain 2 random magic attacks from your discard, then banish them.'
  },
  {
    name: 'Vampire',
    image: 'vampire',
    rarity: 'rare',
    attack: 4,
    defense: 1,
    damageSelf: 1,
    banishes: true,
    dealsBanishingDamage: true
  },
  {
    name: 'Cryopyromancer',
    image: 'cryopyromancer',
    rarity: 'rare',
    attack: 3,
    defense: 3,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Burn', pile: 'deck' },
      { card: 'Freeze', pile: 'deck' }
    ],
    description: 'Shuffle a copy of Burn and a copy of Freeze into your opponent\'s deck.'
  },
  {
    name: 'Fire Dragon',
    image: 'fire_dragon',
    rarity: 'legendary',
    attack: 8,
    defense: 0,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Burn', pile: 'deck' },
      { card: 'Burn', pile: 'deck' },
      { card: 'Burn', pile: 'deck' },
    ],
    onDiscard: {
      shuffleCardCopiesIntoOpponentsPiles: [
        { card: 'Burn', pile: 'deck' },
        { card: 'Burn', pile: 'deck' },
        { card: 'Burn', pile: 'deck' },
      ],
    },
    description: 'When played or discarded, shuffle 3 copies of Burn into your opponent\'s deck.'
  },
  {
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    rarity: 'legendary',
    attack: 4,
    defense: 4,
    playCopiesOfCards: ['Healing Blade', 'Healing Blade'],
    onDiscard: {
      playCopiesOfCards: ['Healing Blade', 'Healing Blade'],
    },
    description: 'When played or discarded, play 2 copies of Healing Blade.'
  },
  {
    name: 'Ice Queen',
    image: 'ice_queen',
    rarity: 'legendary',
    attack: 2,
    defense: 6,
    shuffleCardCopiesIntoYourPiles: [
      { card: 'Ice Blade', pile: 'deck', index: 'top' },
      { card: 'Ice Blade', pile: 'deck', index: 'top' },
      { card: 'Ice Blade', pile: 'deck', index: 'top' },
    ],
    onDiscard: {
      shuffleCardCopiesIntoYourPiles: [
        { card: 'Ice Blade', pile: 'deck', index: 'top' },
        { card: 'Ice Blade', pile: 'deck', index: 'top' },
        { card: 'Ice Blade', pile: 'deck', index: 'top' }
      ],
    },
    description: 'When played or discarded, add 3 copies of Ice Blade to the top of your deck.'
  }
].map(card => createCard({
  ...card,
  type: 'ally'
}));
