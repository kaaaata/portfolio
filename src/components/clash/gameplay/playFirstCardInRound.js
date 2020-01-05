import { ArrayOfCards } from './arrayOfCards';
import { createCard } from '../cards/utils';
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
    shields: 'setYourShields'
  },
  enemy: {
    deck: 'setEnemyDeck',
    discard: 'setEnemyDiscard',
    banish: 'setEnemyBanish',
    hand: 'setEnemyHand',
    shields: 'setEnemyShields'
  }
};
let actions = [];
let stateCopy = {};

const wait = () => actions.push([]);

const addCardToStack = (card, index) => {
  if (!card.isMockCard) {
    let removeCardAction = {};

    if (card.location === 'hand') {
      stateCopy[card.player].hand.cards[index] = null;
    } else {
      stateCopy[card.player][card.location].removeCardAtIndex(index);
    }

    removeCardAction = {
      actionKey: actionKeys[card.player][card.location],
      payload: [...stateCopy[card.player][card.location].cards]
    };

    card.location = 'stack';
    stateCopy.stack.addCardToTop(card);

    actions.push([
      {
        actionKey: 'setStack',
        payload: [...stateCopy.stack.cards]
      },
      removeCardAction
    ]);

    wait();
  }
};

const removeTopCardFromStack = () => {
  const removedCard = stateCopy.stack.removeTopCard();
  removedCard.location = removedCard.type === 'potion'
    ? 'banish'
    : 'discard';

  stateCopy[removedCard.player][removedCard.location].addCardToTop(removedCard);

  actions.push([
    {
      actionKey: 'setStack',
      payload: [...stateCopy.stack.cards]
    },
    {
      actionKey: actionKeys[removedCard.player][removedCard.location],
      payload: [...stateCopy[removedCard.player][removedCard.location].cards]
    }
  ]);
};

const genPlayCardActions = (card, index) => {
  const opponent = card.player === 'you' ? 'enemy' : 'you';
  const {
    attack,
    defense,
    heal,
    damageSelf,
    player,
    necro,
    unblockable,
    banishes,
    pierce,
    type
  } = card;

  addCardToStack(card, index);

  // attack
  if (typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && type !== 'ally') {
      const bonusStatsDamage = Object.values(stateCopy[player].stats.attack).reduce(
        (a, b) => a + b
      );
      totalDamageDealt += bonusStatsDamage;
      if (!unblockable) {
        const { shields } = stateCopy[opponent];
        const enemyShieldsBlock = shields > 0
          ? Math.floor(shields - pierce, 0)
          : shields;
        totalDamageDealt -= enemyShieldsBlock;
      }
      if (necro) {
        const bonusNecroDamage = Math.floor(
          stateCopy[player].discard.cards.length / necro
        );
        totalDamageDealt += bonusNecroDamage;
      }
    }

    let totalShieldsGained = defense;
    if (defense) {
      const bonusShields = Object.values(stateCopy[player].stats.defense).reduce(
        (a, b) => a + b
      );
      totalShieldsGained += bonusShields;
      stateCopy[player].shields += totalShieldsGained;
    }

    for (let i = 0; i < totalDamageDealt; i++) {
      if (!stateCopy[opponent].deck.cards.length) {
        break;
      }

      const removedCard = stateCopy[opponent].deck.removeTopCard();
      const destination = banishes ? 'banish' : 'discard';
      removedCard.location = destination;
      stateCopy[opponent][destination].addCardToTop(removedCard);

      actions.push([
        {
          actionKey: actionKeys[opponent].deck,
          payload: [...stateCopy[opponent].deck.cards]
        },
        {
          actionKey: actionKeys[opponent][destination],
          payload: [...stateCopy[opponent][destination].cards]
        },
        {
          actionKey: actionKeys[player].shields,
          payload: totalShieldsGained
        }
      ]);

      if (removedCard.onDiscard) {
        addCardToStack(removedCard, stateCopy[opponent][destination].cards.length - 1);

        const mockCard = createCard({
          ...removedCard.onDiscard,
          player: opponent,
          isMockCard: true
        });

        genPlayCardActions(mockCard);
      }
    }
  }

  // heal
  if (heal) {
    for (let i = 0; i < heal; i++) {
      if (!stateCopy[player].discard.cards.length) {
        break;
      }

      const healedCard = stateCopy[player].discard.removeTopCard();
      healedCard.location = 'deck';
      stateCopy[player].deck.addCardAtRandomIndex(healedCard);

      actions.push([
        {
          actionKey: actionKeys[player].deck,
          payload: [...stateCopy[player].deck.cards]
        },
        {
          payload: [...stateCopy[player].discard.cards],
          actionKey: actionKeys[player].discard
        }
      ]);
    }
  }

  // damage self
  if (damageSelf) {
    for (let i = 0; i < damageSelf; i++) {
      const removedCard = stateCopy[player].deck.removeTopCard();
      removedCard.location = 'discard';
      stateCopy[player].discard.addCardToTop(removedCard);

      actions.push([
        {
          actionKey: actionKeys[player].deck,
          payload: [...stateCopy[player].deck.cards]
        },
        {
          payload: [...stateCopy[player].discard.cards],
          actionKey: actionKeys[player].discard
        }
      ]);
    }
  }

  removeTopCardFromStack();
};

const genStartOfTurnActions = (player) => {
  const startOfTurnActions = [];

  // remove shields
  startOfTurnActions.push({
    actionKey: player === 'you' ? 'setYourShields' : 'setEnemyShields',
    payload: 0
  });

  // draw
  while (stateCopy[player].hand.cards.includes(null)) {
    const cardToDraw = stateCopy[player].deck.removeTopCard();
    stateCopy[player].hand.cards[stateCopy[player].hand.cards.indexOf(null)] = (
      {
        ...cardToDraw,
        location: 'hand'
      }
    );
    startOfTurnActions.push({
      actionKey: player === 'you' ? 'setYourHand' : 'setEnemyHand',
      payload: [...stateCopy[player].hand.cards]
    });
    startOfTurnActions.push({
      actionKey: player === 'you' ? 'setYourDeck' : 'setEnemyDeck',
      payload: [...stateCopy[player].deck.cards]
    });
  }

  actions.push(startOfTurnActions);

  wait();
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
      stats: state.yourStats
    },
    enemy: {
      deck: new ArrayOfCards(state.enemyDeck),
      discard: new ArrayOfCards(state.enemyDiscard),
      banish: new ArrayOfCards(state.enemyBanish),
      hand: new ArrayOfCards(state.enemyHand),
      shields: state.enemyShields,
      stats: state.enemyStats
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
