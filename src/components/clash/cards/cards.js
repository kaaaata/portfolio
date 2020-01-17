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

export const genStartingDeck = () => Array(30).fill(cards['Strike']);
export const genSampleEndgameDeck = () => [
  cards['Healing Potion'],
  cards['Healing Potion'],
  cards['Catherine the Great'],
  cards['Strike'],
  cards['Strike'],
  cards['Strike'],
  cards['Strike'],
  cards['Strike'],
  cards['Strike'],
  cards['Strike'],

  cards['Mermaid'],
  cards['Chop'],
  cards['Fire'],
  cards['Fire'],
  cards['Fire'],
  cards['Slash'],
  cards['Crush'],
  cards['Heavy Strike'],
  cards['Heavy Strike'],
  cards['Heavy Strike'],

  cards['Sunder'],
  cards['Sunder'],
  cards['Sunder'],
  cards['Healing Blade'],
  cards['Healing Blade'],
  cards['Tentacles'],
  cards['Tentacles'],
  cards['Elf'],
  cards['Mage'],
  cards['Weapons Guy'],
];
