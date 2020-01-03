import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { ArrayOfCards } from './arrayOfCards';
import {
  YourDeck,
  YourDiscard,
  YourBanish,
  EnemyDeck,
  EnemyDiscard,
  EnemyBanish,
  YourHand,
  EnemyHand,
  Stack
} from './PileOfCards';
import { genRandomDeck } from './cards/cards';
import { createCard } from './cards/utils';

const clashCss = css`
  flex-shrink: 0;
  width: 1000px;
  height: 600px;
  position: relative;
  background: #B2967D;

  .enemy_side, .your_side {
    perspective: 2000px;
  }
`;

const sampleDeck = genRandomDeck();

export class Clash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourDeck: sampleDeck
        .map(card => ({ ...card, player: 'you', location: 'deck' })),
      yourDiscard: sampleDeck
        .map(card => ({ ...card, player: 'you', location: 'discard' })),
      yourBanish: sampleDeck
        .map(card => ({ ...card, player: 'you', location: 'deck' })),
      enemyDeck: sampleDeck
        .map(card => ({ ...card, player: 'enemy', location: 'discard' })),
      enemyDiscard: sampleDeck
        .map(card => ({ ...card, player: 'enemy', location: 'discard' })),
      enemyBanish: sampleDeck
        .map(card => ({ ...card, player: 'enemy', location: 'banish' })),

      yourHand: sampleDeck.slice(0, 3)
        .map(card => ({ ...card, player: 'you', location: 'hand' })),
      enemyHand: sampleDeck.slice(0, 3)
        .map(card => ({ ...card, player: 'enemy', location: 'hand' })),
      stack: [],

      isPlayersTurn: true,
      isAnimating: false
    };

    this.interval = null; // only have one active interval, for simplicity/perf
    this.actions = [];
  }

  executeRenderAction(action) {
    action.forEach(subAction => {
      this.setState({ [subAction.stateKey]: subAction.pile });
    });
  }

  playCard(card, index) {
    const {
      isAnimating,
      isPlayersTurn
    } = this.state;

    if (isAnimating || !isPlayersTurn) {
      return;
    }

    this.actions = [];

    const stateKeys = {
      you: {
        deck: 'yourDeck',
        discard: 'yourDiscard',
        banish: 'yourBanish',
        hand: 'yourHand'
      },
      enemy: {
        deck: 'enemyDeck',
        discard: 'enemyDiscard',
        banish: 'enemyBanish',
        hand: 'enemyHand'
      }
    };
    const stateCopy = {
      you: {
        deck: new ArrayOfCards(this.state.yourDeck),
        discard: new ArrayOfCards(this.state.yourDiscard),
        banish: new ArrayOfCards(this.state.yourBanish),
        hand: new ArrayOfCards(this.state.yourHand)
      },
      enemy: {
        deck: new ArrayOfCards(this.state.enemyDeck),
        discard: new ArrayOfCards(this.state.enemyDiscard),
        banish: new ArrayOfCards(this.state.enemyBanish),
        hand: new ArrayOfCards(this.state.enemyHand)
      },
      stack: new ArrayOfCards(this.state.stack)
    };

    const logs = [];

    console.log('playing card', card);
    this.setState({ isAnimating: true });

    const addCardToStack = (card, index) => {
      if (!card.isMockCard) {
        let removeCardAction = {};

        stateCopy[card.player][card.location].removeCardAtIndex(index);

        if (card.location === 'hand') {
          // add placeholder
          stateCopy[card.player].hand.addCardAtIndex(null, index);
        }

        removeCardAction = {
          pile: [...stateCopy[card.player][card.location].cards],
          stateKey: stateKeys[card.player][card.location]
        };

        card.location = 'stack';
        stateCopy.stack.addCardToTop(card);

        logs.push(`adding card to stack: "${card.name}"`);
        this.actions.push([
          {
            pile: [...stateCopy.stack.cards],
            stateKey: 'stack'
          },
          removeCardAction
        ]);

        // add "dummy action" to delay 500ms, so the player can read the card.
        this.actions.push([]);
      }
    };

    const removeTopCardFromStack = () => {
      if (!card.isMockCard) {
        const removedCard = stateCopy.stack.removeTopCard();
        removedCard.location = removedCard.type === 'potion'
          ? 'banish'
          : 'discard';

        stateCopy[removedCard.player][removedCard.location].addCardToTop(removedCard);

        logs.push(`removing card from stack: "${removedCard.name}"`);
        this.actions.push([
          {
            pile: [...stateCopy.stack.cards],
            stateKey: 'stack'
          },
          {
            pile: [...stateCopy[removedCard.player][removedCard.location].cards],
            stateKey: stateKeys[removedCard.player][removedCard.location]
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

    //   this.actions.push([
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

    const generateActionsForCard = (card, index) => {
      // move to stack
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

          logs.push('hitting opponent for 1');
          this.actions.push([
            {
              pile: [...stateCopy[opponent].deck.cards],
              stateKey: stateKeys[opponent].deck
            },
            {
              pile: [...stateCopy[opponent].discard.cards],
              stateKey: stateKeys[opponent].discard
            }
          ]);

          if (removedCard.onDiscard) {
            addCardToStack(removedCard, stateCopy[opponent].discard.cards.length - 1);

            const mockCard = createCard({
              ...removedCard.onDiscard,
              player: 'enemy',
              isMockCard: true
            });

            generateActionsForCard(mockCard);
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

          logs.push('healing opponent for 1');
          this.actions.push([
            {
              pile: [...stateCopy[player].deck.cards],
              stateKey: stateKeys[player].deck
            },
            {
              pile: [...stateCopy[player].discard.cards],
              stateKey: stateKeys[player].discard
            }
          ]);
        }
      }

      removeTopCardFromStack();
    };

    generateActionsForCard(card, index);
    this.actions.push([]); // 500ms delay before drawing

    console.log('actions=', this.actions);
    logs.forEach(message => {
      console.log(message);
    });

    if (this.actions.length > 1) {
      // later, if we want to allow pausing mid-animation, this.actions should be
      // refactored to be a Stack, and it should pop every time an action is executed.

      // instantly execute the first action, which will always be "move to stack"
      this.executeRenderAction(this.actions[0]);
      let i = 1;
      this.interval = setInterval(() => {
        this.executeRenderAction(this.actions[i]);

        if (++i === this.actions.length) {
          this.setState({ isAnimating: false });
          clearInterval(this.interval);
        }
      }, 500);
    } else {
      this.setState({ isAnimating: false });
    }
  }

  render() {
    const {
      yourDeck,
      yourDiscard,
      yourBanish,
      enemyDeck,
      enemyDiscard,
      enemyBanish,
      yourHand,
      enemyHand,
      stack
    } = this.state;

    return (
      <section css={clashCss}>
        <EnemyHand cards={enemyHand} />
        <div className='enemy_side'>
          <EnemyDeck cards={enemyDeck} />
          <EnemyDiscard cards={enemyDiscard} />
          <EnemyBanish cards={enemyBanish} />
        </div>

        <Stack cards={stack} />

        <YourHand
          cards={yourHand}
          onClick={(card, index) => this.playCard(card, index)}
        />
        <div className='your_side'>
          <YourDeck cards={yourDeck} />
          <YourDiscard cards={yourDiscard} />
          <YourBanish cards={yourBanish} />
        </div>
      </section>
    );
  }
}
