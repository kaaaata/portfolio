import { keyBy, sampleSize } from 'lodash';
import { attacks } from './attacks';
import { magic } from './magic';
import { potions } from './potions';
import { allies } from './allies';
import { ArrayOfCards } from '../gameplay/arrayOfCards';

export const cardsArray = new ArrayOfCards([
  ...attacks,
  ...magic,
  ...potions,
  ...allies
]);

export const cards = keyBy(cardsArray.cards, 'name');

export const genStoreCards = () => sampleSize(cardsArray.cards, 8).map(card => card.name);

export const genStartingDeck = () => Array(30).fill('Strike');

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
