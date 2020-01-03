import { keyBy } from 'lodash';

const cardTemplate = {
  name: '',
  image: '',
  rarity: '',
  attack: null,
  defense: null,
  heal: null,
  onDiscard: null,
  type: '',
  description: '',
  isMockCard: false // "pseudo" card for discard effects, etc.
};

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties
  };

  return card;
};

const attacks = [
  createCard({
    name: 'Strike',
    image: 'strike',
    rarity: 'common',
    attack: 5,
    defense: 0
  })
].map(card => (
  { ...card, type: 'attack' }
));

const potions = [
  createCard({
    name: 'Healing Potion',
    image: 'healing_potion',
    rarity: 'common',
    heal: 3,
    onDiscard: {
      heal: 3
    },
    description: 'Heal 3.'
  })
].map(card => (
  { ...card, type: 'potion' }
));

export const cards = {
  ...keyBy(attacks, 'name'),
  ...keyBy(potions, 'name')
};
