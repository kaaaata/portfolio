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
export const monsterCardPoolByRarity = {
  common: cardsByRarity.common.filter(card => card.type !== 'ally'),
  uncommon: cardsByRarity.uncommon.filter(card => card.type !== 'ally'),
  rare: cardsByRarity.rare.filter(card => card.type !== 'ally'),
  legendary: cardsByRarity.legendary.filter(card => card.type !== 'ally')
};

export const genStartingDeck = () => [
  'Strange Key', // testing

  'Falchion',
  'Healing Potion',
  'Spearman',
  'Fire',
  'Tentacles',
  
  'Saber',
  'Mace',
  'Mace',
  'Cutlass',
  'Cutlass',

  'Sword',
  'Sword',
  'Sword',
  'Sword',
  'Sword'
];
