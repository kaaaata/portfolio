import { keyBy, uniq } from 'lodash';
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

export const commons = cardsArray.filter(card => card.rarity === 'common');
export const uncommons = cardsArray.filter(card => card.rarity === 'uncommon');
export const rares = cardsArray.filter(card => card.rarity === 'rare');
export const legendaries = cardsArray.filter(card => card.rarity === 'legendary');

const shopCardsCosts = {
  common: 25,
  uncommon: 50,
  rare: 75,
  legendary: 175
};
export const genShopCards = () => [
  cardsArray.getRandomCardByFilter(card => card.rarity === 'legendary' && card.isBuyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'rare' && card.isBuyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'uncommon' && card.isBuyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'uncommon' && card.isBuyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.isBuyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.isBuyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.isBuyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.isBuyable)
].map(card => ({
  name: card.name,
  cost: shopCardsCosts[card.rarity] - 10 + ~~(Math.random() * 21)
}));

export const genPackCards = () => {
  const cardRarities = ['rare', 'uncommon', 'common', 'common', 'common'];

  for (let i = 0; i < 5; i++) {
    let rarity = cardRarities[i];

    while (rarity !== 'legendary') {
      if (Math.random() < 0.1) {
        rarity = rarity === 'common'
          ? 'uncommon'
          : rarity === 'uncommon'
            ? 'rare'
            : 'legendary'
      } else {
        break;
      }
    }

    cardRarities[i] = rarity;
  }

  return cardRarities.map(rarity => (
    cardsArray.getRandomCardByFilter(card => card.rarity === rarity && card.isBuyable).name
  ));
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

export const genStartingCollection = () => {
  const collection = {};

  uniq(genStartingDeck()).forEach(key => {
    collection[key] = 0;
  });

  return collection;
};

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
