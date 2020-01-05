const cardTemplate = {
  name: '',
  image: '',
  rarity: '',
  attack: null,
  defense: null,
  heal: null,
  healEnemy: null,
  onDiscard: null,
  type: '',
  description: '',
  damageSelf: null,
  isMockCard: false, // "pseudo" card for discard effects, etc.
  banishes: false,
  customEffect: false,
  pierce: 0,
  buyable: true,
  unblockable: false
};

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties
  };

  return card;
};
