import { ArrayOfCards } from '../arrayOfCards';
import { createCard } from '../cards/utils';
import { store } from '../../stores/store';

const actionKeys = {
  you: {
    deck: 'setYourDeck',
    discard: 'setYourDiscard',
    banish: 'setYourBanish',
    hand: 'setYourHand'
  },
  enemy: {
    deck: 'setEnemyDeck',
    discard: 'setEnemyDiscard',
    banish: 'setEnemyBanish',
    hand: 'setEnemyHand'
  }
};

export const genPlayCardActions = (card, index) => {
  const actions = [];
  const state = store.getState();
  const stateCopy = {
    you: {
      deck: new ArrayOfCards(state.yourDeck),
      discard: new ArrayOfCards(state.yourDiscard),
      banish: new ArrayOfCards(state.yourBanish),
      hand: new ArrayOfCards(state.yourHand)
    },
    enemy: {
      deck: new ArrayOfCards(state.enemyDeck),
      discard: new ArrayOfCards(state.enemyDiscard),
      banish: new ArrayOfCards(state.enemyBanish),
      hand: new ArrayOfCards(state.enemyHand)
    },
    stack: new ArrayOfCards(state.stack)
  };

  const addCardToStack = (card, index) => {
    if (!card.isMockCard) {
      let removeCardAction = {};

      stateCopy[card.player][card.location].removeCardAtIndex(index);

      if (card.location === 'hand') {
        // add placeholder
        stateCopy[card.player].hand.addCardAtIndex(null, index);
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

      // add "dummy action" to delay 500ms, so the player can read the card.
      actions.push([]);
    }
  };

  const removeTopCardFromStack = () => {
    if (!card.isMockCard) {
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
    }
  };

  // const drawUntilHandIsFull = () => {
  //   const yourNewHandCards = [];
  //   stateCopy.yourHand.cards.forEach(card => {
  //     yourNewHandCards.push(card === null
  //       ? stateCopy.you.deck.removeTopCard()
  //       : card);
  //   });

  //   actions.push([
  //     {
  //       pile: yourNewHandCards.map(card => ({ ...card, location: 'yourHand' })),
  //       stateKey: 'yourHand'
  //     },
  //     {
  //       pile: [...stateCopy.you.deck.cards],
  //       stateKey: 'yourDeck'
  //     }
  //   ]);
  // };

  const generateActions = (card, index) => {
    addCardToStack(card, index);

    // attack
    if (typeof card.attack === 'number') {
      let totalDamage = card.attack;
      // add strength
      if (!card.unblockble) {
        // subtract enemy armor
      }
      if (card.necro) {
        const bonusNecroDamage = Math.floor(
          stateCopy.you.discard.cards.length / card.necro
        );
        totalDamage += bonusNecroDamage;
      }
      if (card.meltsArmor) {
        // for every point of enemy armor, damage += 2
      }

      const opponent = card.player === 'you' ? 'enemy' : 'you';
      for (let i = 0; i < totalDamage; i++) {
        if (!stateCopy[opponent].deck.cards.length) {
          break;
        }

        const removedCard = stateCopy[opponent].deck.removeTopCard();
        removedCard.location = 'discard';
        stateCopy[opponent].discard.addCardToTop(removedCard);

        actions.push([
          {
            actionKey: actionKeys[opponent].deck,
            payload: [...stateCopy[opponent].deck.cards]
          },
          {
            actionKey: actionKeys[opponent].discard,
            payload: [...stateCopy[opponent].discard.cards]
          }
        ]);

        if (removedCard.onDiscard) {
          addCardToStack(removedCard, stateCopy[opponent].discard.cards.length - 1);

          const mockCard = createCard({
            ...removedCard.onDiscard,
            player: 'enemy',
            isMockCard: true
          });

          generateActions(mockCard);
        }
      }
    }

    // heal
    const { heal } = card;
    if (heal) {
      const player = card.player === 'you' ? 'you' : 'enemy';
      for (let i = 0; i < heal; i++) {
        if (!stateCopy[player].discard.cards.length) {
          break;
        }

        const healedCard = stateCopy[player].discard.removeTopCard();
        healedCard.location = 'deck';
        stateCopy[player].deck.addCardToTop(healedCard);

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

  generateActions(card, index);

  return actions;
};
