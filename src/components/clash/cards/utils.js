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
  damageSelf: null,
  isMockCard: false, // "pseudo" card for discard effects, etc.
  banishes: false,
  customEffect: false
};

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties
  };

  return card;
};
