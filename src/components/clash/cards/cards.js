import { keyBy } from 'lodash';
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

export const genStartingDeck = () => Array(16).fill(cards['Strike']);
