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
  unblockable: false,
  playCopyOfCard: null,
  shuffleCardCopiesIntoDeck: null,
  shuffleCardCopiesIntoEnemyDeck: null
};

const genCardDescription = ({
  heal,
  healEnemy,
  damageSelf,
  pierce,
  description,
  onDiscard,
  type,
  playCopyOfCard
}) => {
  if (description) {
    return description;
  }

  const sentences = [];

  if (heal) {
    sentences.push(`Heal ${heal}.`);
  }
  if (healEnemy) {
    sentences.push(`Heal enemy ${healEnemy}.`);
  }
  if (damageSelf) {
    sentences.push(`Take ${damageSelf} damage.`);
  }
  if (pierce) {
    sentences.push(`Pierce ${2} shields.`);
  }
  if (onDiscard && type !== 'potion') {
    sentences.push(`On discard: ${genCardDescription(onDiscard)}`);
  }
  if (playCopyOfCard) {
    sentences.push(`Play a copy of ${playCopyOfCard}.`);
  }

  return sentences.join(' ');
};

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties,
    description: genCardDescription(properties)
  };

  return card;
};
