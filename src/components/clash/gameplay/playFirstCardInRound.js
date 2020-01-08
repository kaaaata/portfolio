import { ArrayOfCards } from './arrayOfCards';
import { createCard } from '../cards/createCard';
import { cards } from '../cards/cards';
import { attacks } from '../cards/attacks';
import { magic } from '../cards/magic';
import { potions } from '../cards/potions';
import { allies } from '../cards/allies';
import { store } from '../../stores/store';

const masterCardList = {
  attacks: new ArrayOfCards(attacks),
  magic: new ArrayOfCards(magic),
  potions: new ArrayOfCards(potions),
  allies: new ArrayOfCards(allies),
};
const actionKeys = {
  you: {
    deck: 'setYourDeck',
    discard: 'setYourDiscard',
    banish: 'setYourBanish',
    hand: 'setYourHand',
    shields: 'setYourShields',
    temporaryStats: 'setYourTemporaryStats'
  },
  enemy: {
    deck: 'setEnemyDeck',
    discard: 'setEnemyDiscard',
    banish: 'setEnemyBanish',
    hand: 'setEnemyHand',
    shields: 'setEnemyShields',
    temporaryStats: 'setEnemyTemporaryStats'
  }
};
let actions = [];
let stateCopy = {};

const actionGenerators = {
  // these functions mutate stateCopy and return actions.
  // "card" and "payload" values must be new objects, not references.
  addCardToStack: (card) => {
    const newCard = { ...card, location: 'stack' };
    stateCopy.stack.addCardToTop(newCard);
    return {
      actionKey: 'setStack',
      payload: [...stateCopy.stack.cards]
    };
  },
  removeTopCardFromStack: () => {
    stateCopy.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: [...stateCopy.stack.cards]
    };
  },
  addCard: (card, player, location, index) => {
    // index = number|'top'|'random'
    const newCard = {
      ...card,
      player,
      location
    };
    if (location === 'hand') {
      stateCopy[player][location].cards[index] = newCard;
    } else if (index === 'top') {
      stateCopy[player][location].addCardToTop(newCard);
    } else if (index === 'random') {
      stateCopy[player][location].addCardAtRandomIndex(newCard);
    }
    return {
      actionKey: actionKeys[player][location],
      payload: [...stateCopy[player][location].cards]
    };
  },
  removeCard: (player, location, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return;
    } else if (location === 'hand') {
      stateCopy[player][location].cards[index] = null;
    } else if (index === 'top') {
      stateCopy[player][location].removeTopCard();
    }
    return {
      actionKey: actionKeys[player][location],
      payload: [...stateCopy[player][location].cards]
    };
  },
  setShields: (player, value) => {
    stateCopy[player].shields = value;
    return {
      actionKey: actionKeys[player].shields,
      payload: value
    };
  },
  setTemporaryStats: (player, temporaryStatGain) => {
    // temporaryStatGain like { attack: 1, defense: 1 }
    Object.keys(temporaryStatGain).forEach(stat => {
      stateCopy[player].temporaryStats[stat] += temporaryStatGain[stat];
    });
    return {
      actionKey: actionKeys[player].temporaryStats,
      payload: stateCopy[player].temporaryStats
    };
  }
};

const shuffleCardsIntoDeck = (cards, player) => {
  cards.forEach(card => {
    actions.push([actionGenerators.addCardToStack(card)]);
  });

  actions.push([]);

  cards.forEach(card => {
    actions.push([
      actionGenerators.removeTopCardFromStack(),
      actionGenerators.addCard(card, player, 'deck', 'random')
    ]);
  });
};

const customCardEffects = {
  'Weapons Guy': (card) => {
    // Shuffle 3 random attacks into your draw pile.
    const threeRandomAttacks = [
      masterCardList.attacks.getRandomCard(),
      masterCardList.attacks.getRandomCard(),
      masterCardList.attacks.getRandomCard()
    ];
    shuffleCardsIntoDeck(threeRandomAttacks, card.player);
  },
};

const genPlayCardActions = (card, index) => {
  const opponent = card.player === 'you' ? 'enemy' : 'you';
  const {
    name,
    attack,
    defense,
    heal,
    healEnemy,
    damageSelf,
    player,
    unblockable,
    banishes,
    pierce,
    type,
    isMockCard,
    customEffect,
    playCopyOfCard,
    shuffleCardCopiesIntoDeck,
    shuffleCardCopiesIntoEnemyDeck,
    temporaryStatGain
  } = card;

  const triggerDiscardEffect = (player) => {
    const discardedCard = stateCopy[player].discard.getTopCard();

    actions.push([
      actionGenerators.removeCard(player, 'discard', 'top'),
      actionGenerators.addCardToStack(discardedCard)
    ]);

    const mockCard = createCard({
      ...discardedCard.onDiscard,
      player: discardedCard.player,
      isMockCard: true
    });

    genPlayCardActions(mockCard);
  };

  if (!isMockCard) {
    actions.push([
      actionGenerators.addCardToStack(card),
      actionGenerators.removeCard(player, 'hand', index)
    ]);
  }

  actions.push([]);

  if (temporaryStatGain) {
    actions.push([actionGenerators.setTemporaryStats(player, temporaryStatGain)]);
  }

  if (typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && ['attack', 'magic'].includes(type)) {
      const bonusStatsDamage = stateCopy[player].temporaryStats[type]
        + stateCopy[player].permanentStats[type];
      totalDamageDealt += bonusStatsDamage;
    }
    if (!unblockable) {
      totalDamageDealt -= stateCopy[opponent].shields;
      if (totalDamageDealt < 0) {
        totalDamageDealt = 0;
      }
    }
    const bonusPierceDamage = pierce > stateCopy[opponent].shields
      ? stateCopy[opponent].shields
      : pierce;
    totalDamageDealt += bonusPierceDamage;

    let totalShieldsGained = defense;
    if (defense) {
      if (type !== 'ally') {
        const bonusShields = stateCopy[player].temporaryStats.defense
          + stateCopy[player].permanentStats.defense;
        totalShieldsGained += bonusShields;
      }
      stateCopy[player].shields = Math.max(totalShieldsGained, 0);
      if (totalDamageDealt === 0) {
        actions.push([actionGenerators.setShields(
          player,
          stateCopy[player].shields
        )]);
      }
    }

    for (let i = 0; i < totalDamageDealt; i++) {
      if (!stateCopy[opponent].deck.cards.length) {
        break;
      }

      const removedCard = stateCopy[opponent].deck.getTopCard();
      const destination = banishes ? 'banish' : 'discard';
      const damageAction = [
        actionGenerators.removeCard(opponent, 'deck', 'top'),
        actionGenerators.addCard(
          removedCard,
          opponent,
          destination,
          'top'
        )
      ];
      if (i === 0) {
        damageAction.push(actionGenerators.setShields(
          player,
          stateCopy[player].shields
        ));
      }
      actions.push(damageAction);

      if (destination === 'discard' && removedCard.onDiscard) {
        triggerDiscardEffect(opponent);
      }
    }
  }

  if (heal) {
    for (let i = 0; i < heal; i++) {
      if (!stateCopy[player].discard.cards.length) {
        break;
      }

      const healedCard = stateCopy[player].discard.getTopCard();
      actions.push([
        actionGenerators.removeCard(player, 'discard', 'top'),
        actionGenerators.addCard(
          healedCard,
          player,
          'deck',
          'random'
        )
      ]);
    }
  }

  if (healEnemy) {
    for (let i = 0; i < healEnemy; i++) {
      if (!stateCopy[opponent].discard.cards.length) {
        break;
      }

      const healedCard = stateCopy[opponent].discard.getTopCard();
      actions.push([
        actionGenerators.removeCard(opponent, 'discard', 'top'),
        actionGenerators.addCard(
          healedCard,
          opponent,
          'deck',
          'random'
        )
      ]);
    }
  }

  if (damageSelf) {
    for (let i = 0; i < damageSelf; i++) {
      const removedCard = stateCopy[player].deck.getTopCard();
      actions.push([
        actionGenerators.removeCard(player, 'deck', 'top'),
        actionGenerators.addCard(
          removedCard,
          player,
          'discard',
          'top'
        )
      ]);

      if (removedCard.onDiscard) {
        triggerDiscardEffect(player);
      }
    }
  }

  if (playCopyOfCard) {
    genPlayCardActions({
      ...cards[playCopyOfCard],
      player: card.player
    });
  }

  if (shuffleCardCopiesIntoEnemyDeck) {
    shuffleCardsIntoDeck(
      shuffleCardCopiesIntoEnemyDeck.map(cardName => cards[cardName]),
      opponent
    );
  }

  if (shuffleCardCopiesIntoDeck) {
    shuffleCardsIntoDeck(
      shuffleCardCopiesIntoDeck.map(cardName => cards[cardName]),
      player
    );
  }

  if (customEffect) {
    customCardEffects[name](card);
  }

  const playedCard = isMockCard
    ? stateCopy.stack.getTopCard()
    : card;

  actions.push([
    actionGenerators.removeTopCardFromStack(),
    actionGenerators.addCard(
      playedCard,
      playedCard.player,
      playedCard.type === 'potion' ? 'banish' : 'discard',
      'top'
    )
  ]);
};

const genStartOfTurnActions = (player) => {
  const startOfTurnActions = [actionGenerators.setShields(player, 0)];

  while (stateCopy[player].hand.cards.includes(null)) {
    const cardToDraw = stateCopy[player].deck.getTopCard();
    startOfTurnActions.push(actionGenerators.removeCard(
      player,
      'deck',
      'top'
    ));
    startOfTurnActions.push(actionGenerators.addCard(
      cardToDraw,
      player,
      'hand',
      stateCopy[player].hand.cards.indexOf(null)
    ));
  }

  actions.push(startOfTurnActions);
  actions.push([]);
};

export const playFirstCardInRound = (card, index) => {
  actions = [];
  const state = {
    ...store.getState().clashBattleCards,
    ...store.getState().clashBattleStats
  };
  stateCopy = {
    you: {
      deck: new ArrayOfCards(state.yourDeck),
      discard: new ArrayOfCards(state.yourDiscard),
      banish: new ArrayOfCards(state.yourBanish),
      hand: new ArrayOfCards(state.yourHand),
      shields: state.yourShields,
      temporaryStats: state.yourTemporaryStats,
      permanentStats: state.yourPermanentStats
    },
    enemy: {
      deck: new ArrayOfCards(state.enemyDeck),
      discard: new ArrayOfCards(state.enemyDiscard),
      banish: new ArrayOfCards(state.enemyBanish),
      hand: new ArrayOfCards(state.enemyHand),
      shields: state.enemyShields,
      temporaryStats: state.yourTemporaryStats,
      permanentStats: state.yourPermanentStats
    },
    stack: new ArrayOfCards(state.stack)
  };

  genPlayCardActions(card, index);
  genStartOfTurnActions('enemy');
  const enemyHandRandomCardIndex = Math.floor(Math.random() * 3);
  const enemyHandRandomCard = stateCopy.enemy.hand.getCardAtIndex(enemyHandRandomCardIndex);
  // add placeholder
  stateCopy.enemy.hand.cards[enemyHandRandomCardIndex] = null;
  genPlayCardActions(enemyHandRandomCard, enemyHandRandomCardIndex);
  genStartOfTurnActions('you');

  return actions;
};
