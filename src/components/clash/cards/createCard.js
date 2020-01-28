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
  dealsBanishingDamage: false,
  banishesOnPlay: false,
  customEffect: false,
  pierce: 0,
  isBuyable: true,
  playCopiesOfCards: null,
  shuffleCardCopiesIntoYourPiles: null,
  shuffleCardCopiesIntoOpponentsPiles: null,
  temporaryStatGain: null
};

const genCardDescription = ({
  heal,
  healEnemy,
  damageSelf,
  pierce,
  description,
  onDiscard,
  type
}) => description || [
  type === 'magic' && 'Damage dealt banishes.',
  heal && `Heal ${heal}.`,
  healEnemy && `Heal enemy ${healEnemy}.`,
  damageSelf && `Deal ${damageSelf} to yourself.`,
  pierce && `Pierces ${pierce} shield${pierce === 1 ? '' : 's'}.`,
  onDiscard && type !== 'potion' && `On discard: ${genCardDescription(onDiscard)}`
].filter(Boolean).join(' ');

export const createCard = (properties = {}) => {
  const card = {
    ...cardTemplate,
    ...properties,
    description: genCardDescription(properties)
  };

  return card;
};
