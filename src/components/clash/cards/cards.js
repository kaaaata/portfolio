import { keyBy, shuffle } from 'lodash';
import { attacks } from './attacks';
import { magic } from './magic';
import { potions } from './potions';
import { allies } from './allies';

export const cards = {
  ...keyBy(attacks, 'name'),
  ...keyBy(magic, 'name'),
  ...keyBy(potions, 'name'),
  ...keyBy(allies, 'name')
};

export const genRandomDeck = () => {
  const deck = [
    ...allies,
    ...attacks,
    ...potions,
    ...magic,
  ].slice(0, 60);

  // return shuffle(deck);
  return deck;
};
