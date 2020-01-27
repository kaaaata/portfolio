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
    attack: 1,
    defense: 1,
    customEffect: true,
    description: 'Play a random Ally from your discard pile, then banish them.'
  },
  {
    name: 'Mermaid',
    image: 'mermaid',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    heal: 4,
    healEnemy: 2
  },
  {
    name: 'Spear Goon',
    image: 'red_spear_guy',
    rarity: 'common',
    attack: 1,
    defense: 3,
    pierce: 1,
    shuffleCardCopiesIntoDeck: ['Spear Goon'],
    description: 'Pierce: 1. Shuffle a copy of Spear Goon into your deck.'
  },
  {
    name: 'Wayne',
    image: 'goblin',
    rarity: 'common',
    attack: 2,
    defense: 0,
    shuffleCardCopiesIntoEnemyDeck: ['Bomb', 'Bomb'],
    description: 'Shuffle 2 copies of Bomb into your opponent\'s deck.'
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
    attack: 2,
    defense: 0,
    customEffect: true,
    description: 'Play 2 random Attacks from your discard pile, then banish them.'
  },
  {
    name: 'Crazy Mage',
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
    shuffleCardCopiesIntoEnemyDeck: ['Burn', 'Burn'],
    description: 'Shuffle 2 copies of Burn into your opponent\'s deck.'
  },
  {
    name: 'Minotaur',
    image: 'minotaur',
    rarity: 'rare',
    attack: 3,
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
    defense: 3,
    temporaryStatGain: {
      defense: 1
    },
    description: 'Gain +1 Defense for the rest of the battle.'
  },
  {
    name: 'Mage',
    image: 'mage',
    rarity: 'rare',
    attack: 1,
    defense: 1,
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
    defense: 6,
    playCopiesOfCards: ['Healing Blade'],
    shuffleCardCopiesIntoDeck: ['Healing Blade', 'Healing Blade'],
    description: 'Play a copy of Healing Blade. Shuffle 2 additional copies of Healing Blade into your deck.'
  },
].map(card => createCard({
  ...card,
  type: 'ally'
}));
