import { keyBy } from 'lodash';
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

const storeCardsPrices = {
  common: 25,
  uncommon: 50,
  rare: 75,
  legendary: 175
};
export const genStoreCards = () => [
  cardsArray.getRandomCardByFilter(card => card.rarity === 'legendary' && card.buyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'rare' && card.buyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'uncommon' && card.buyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'uncommon' && card.buyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.buyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.buyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.buyable),
  cardsArray.getRandomCardByFilter(card => card.rarity === 'common' && card.buyable)
].map(card => ({
  name: card.name,
  price: storeCardsPrices[card.rarity] - 10 + Math.floor(Math.random() * 21)
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
    cardsArray.getRandomCardByFilter(card => card.rarity === rarity && card.buyable).name
  ));
};

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
