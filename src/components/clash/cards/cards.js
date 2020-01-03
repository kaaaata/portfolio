import { keyBy, shuffle } from 'lodash';
import { attacks } from './attacks';
import { potions } from './potions';

export const cards = {
  ...keyBy(attacks, 'name'),
  ...keyBy(potions, 'name')
};

export const genRandomDeck = () => {
  const deck = [
    ...attacks,
    ...attacks,
    ...attacks,
    ...potions
  ].slice(0, 60);

  return shuffle(deck);
};
