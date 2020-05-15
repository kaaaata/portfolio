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
  common: cardsArray.filter(card => card.rarity === 'common' && !card.isToken),
  uncommon: cardsArray.filter(card => card.rarity === 'uncommon' && !card.isToken),
  rare: cardsArray.filter(card => card.rarity === 'rare' && !card.isToken),
  legendary: cardsArray.filter(card => card.rarity === 'legendary' && !card.isToken)
};

export const genStartingDeck = () => [
  'Strike',
  'Strike',
  'Strike',
  'Strike',
  'Strike',

  'Crush',
  'Crush',
  'Parry',
  'Fire',
  'Fire',

  'Healing Potion',
  'Paladin',
  'Slice',
  'Slice',
  'Tentacles'
];
