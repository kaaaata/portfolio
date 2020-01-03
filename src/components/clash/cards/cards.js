import { keyBy, sampleSize, shuffle } from 'lodash';
import { attacks } from './attacks';
import { potions } from './potions';

export const cards = {
  ...keyBy(attacks, 'name'),
  ...keyBy(potions, 'name')
};

export const genRandomDeck = () => {
  // make it 10% potions 90% cards or something

  const deck = shuffle([
    ...sampleSize(attacks, 10),
    ...sampleSize(attacks, 10),
    ...sampleSize(attacks, 10),
    ...sampleSize(potions, 5)
  ]);

  return deck;
};
