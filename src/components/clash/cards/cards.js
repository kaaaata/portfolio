import { keyBy } from 'lodash';
import { attacks } from './attacks';
import { magic } from './magic';
import { potions } from './potions';
import { allies } from './allies';
import { CardsArray } from '../gameplay/CardsArray';

export const cardsArray = CardsArray([
  ...attacks,
  ...magic,
  ...potions,
  ...allies
]);
export const cards = keyBy(cardsArray, 'name');
export const cardsByRarity = {
  common: cardsArray.filter(card => card.rarity === 'common' && card.isBuyable),
  uncommon: cardsArray.filter(card => card.rarity === 'uncommon' && card.isBuyable),
  rare: cardsArray.filter(card => card.rarity === 'rare' && card.isBuyable),
  legendary: cardsArray.filter(card => card.rarity === 'legendary' && card.isBuyable)
};

export const genStartingDeck = () => [
  'Strike',
  'Strike',
  'Strike',
  'Strike',
  'Strike',

  'Crush',
  'Crush',
  'Slice',
  'Fire',
  'Fire',

  'Parry',
  'Healing Potion',
  'Fire',
  'Weapons Guy',
  'Protect'
];

export const genSampleEndgameDeck = () => [
  'Healing Potion',
  'Healing Potion',
  'Catherine the Great',
  'Strike',
  'Strike',
  'Strike',
  'Strike',
  'Strike',
  'Strike',
  'Strike',

  'Mermaid',
  'Chop',
  'Fire',
  'Fire',
  'Fire',
  'Slash',
  'Crush',
  'Heavy Strike',
  'Heavy Strike',
  'Heavy Strike',

  'Sunder',
  'Sunder',
  'Sunder',
  'Healing Blade',
  'Healing Blade',
  'Tentacles',
  'Tentacles',
  'Elf',
  'Mage',
  'Weapons Guy',
];
