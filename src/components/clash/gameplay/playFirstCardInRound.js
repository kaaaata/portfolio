import { ArrayOfCards } from './arrayOfCards';
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

export const playFirstCardInRound = (card, index) => {
  const actions = [];
  const state = store.getState().clashBattleCards;
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

  const genPlayCardActions = (card, index) => {
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

          genPlayCardActions(mockCard);
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

  const genDrawToFullActions = (player) => {
    if (player === 'you') {
      console.log('asdf', stateCopy[player].hand.cards);
    }
    while (stateCopy[player].hand.cards.includes(null)) {
      const cardToDraw = stateCopy[player].deck.removeTopCard();
      stateCopy[player].hand.cards[stateCopy[player].hand.cards.indexOf(null)] = (
        {
          ...cardToDraw,
          location: 'hand'
        }
      );
      actions.push([
        {
          actionKey: player === 'you' ? 'setYourHand' : 'setEnemyHand',
          payload: [...stateCopy[player].hand.cards]
        },
        {
          actionKey: player === 'you' ? 'setYourDeck' : 'setEnemyDeck',
          payload: [...stateCopy[player].deck.cards]
        }
      ]);
    }

    wait();
  };

  genPlayCardActions(card, index);
  genDrawToFullActions('enemy');
  const enemyHandRandomCardIndex = Math.floor(Math.random() * 3);
  const enemyHandRandomCard = stateCopy.enemy.hand.getCardAtIndex(enemyHandRandomCardIndex);
  // add placeholder
  stateCopy.enemy.hand.cards[enemyHandRandomCardIndex] = null;
  genPlayCardActions(enemyHandRandomCard, enemyHandRandomCardIndex);
  genDrawToFullActions('you');

  return actions;
};
