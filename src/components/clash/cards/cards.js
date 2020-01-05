import { keyBy, shuffle } from 'lodash';
import { attacks } from './attacks';
import { magic } from './magic';
import { potions } from './potions';

export const cards = {
  ...keyBy(attacks, 'name'),
  ...keyBy(magic, 'name'),
  ...keyBy(potions, 'name')
};

export const genRandomDeck = () => {
  const deck = [
    ...attacks,
    ...attacks,
    ...magic,
    ...magic,
    ...potions
    // ...potions
  ].slice(0, 60);

  return shuffle(deck);
};
