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
  piercesArmor: false,
  magical: false,
  isMockCard: false // "pseudo" card for discard effects, etc.
};

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties
  };

  return card;
};
