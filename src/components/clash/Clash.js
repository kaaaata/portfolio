import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { ArrayOfCards } from './arrayOfCards';
import { Spacer } from '../particles';
import { Card } from './Card';
import {
  YourDeck,
  YourDiscard,
  YourBanish,
  EnemyDeck,
  EnemyDiscard,
  EnemyBanish
} from './PileOfCards';
import { cards, createCard } from './cards';

const clashCss = css`
  width: 800px;
  height: 600px;
  position: relative;
  background: #B2967D;

  .enemy_side, .your_side {
    perspective: 1600px;
  }
`;

export class Clash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourDeck: [
        ...Array(15).fill(cards['Strike']),
        cards['Healing Potion']
      ].map(card => ({ ...card, player: 'you', location: 'deck' })),
      yourDiscard: [
        ...Array(3).fill(cards['Strike']),
      ].map(card => ({ ...card, player: 'you', location: 'discard' })),
      yourBanish: [],
      enemyDeck: [
        ...Array(13).fill(cards['Strike']),
        cards['Healing Potion'],
        ...Array(3).fill(cards['Strike'])
      ].map(card => ({ ...card, player: 'enemy', location: 'discard' })),
      enemyDiscard: [],
      enemyBanish: [],

      yourHand: [],
      stack: [],

      isPlayersTurn: true,
      isAnimating: false
    };

    this.interval = []; // only have one active interval, for simplicity/perf
  }

  componentDidMount() {
    const { yourDeck } = this.state;
    this.setState({
      yourHand: yourDeck
        .slice(yourDeck.length - 3, yourDeck.length)
        .map(card => ({ ...card, location: 'yourHand' })),
      yourDeck: yourDeck.slice(0, yourDeck.length - 3)
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

    const stateKeys = {
      you: {
        deck: 'yourDeck',
        discard: 'yourDiscard',
        banish: 'yourBanish'
      },
      enemy: {
        deck: 'enemyDeck',
        discard: 'enemyDiscard',
        banish: 'enemyBanish'
      }
    };
    const stateCopy = {
      you: {
        deck: new ArrayOfCards(this.state.yourDeck),
        discard: new ArrayOfCards(this.state.yourDiscard),
        banish: new ArrayOfCards(this.state.yourBanish)
      },
      enemy: {
        deck: new ArrayOfCards(this.state.enemyDeck),
        discard: new ArrayOfCards(this.state.enemyDiscard),
        banish: new ArrayOfCards(this.state.enemyBanish)
      },
      stack: new ArrayOfCards(this.state.stack),
      yourHand: new ArrayOfCards(this.state.yourHand)
    };

    const actions = [];
    const logs = [];

    console.log('playing card', card);
    this.setState({ isAnimating: true });

    const addCardToStack = (card, index) => {
      if (!card.isMockCard) {
        let removeCardAction = {};

        if (card.location === 'yourHand') {
          stateCopy.yourHand.removeCardAtIndex(index);
          stateCopy.yourHand.addCardAtIndex(null, index);
          removeCardAction = {
            pile: [...stateCopy.yourHand.cards],
            stateKey: 'yourHand'
          };
        } else {
          stateCopy[card.player][card.location].removeCardAtIndex(index);
          removeCardAction = {
            pile: [...stateCopy[card.player][card.location].cards],
            stateKey: stateKeys[card.player][card.location]
          };
        }
        card.location = 'stack';
        stateCopy.stack.addCardToTop(card);

        logs.push(`adding card to stack: "${card.name}"`);
        actions.push([
          {
            pile: [...stateCopy.stack.cards],
            stateKey: 'stack'
          },
          removeCardAction
        ]);
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
        actions.push([
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

    const generateActionsForCard = (card, index) => {
      // move to stack
      addCardToStack(card, index);

      // attack
      const attack = card.attack;
      if (attack) {
        const opponent = card.player === 'you' ? 'enemy' : 'you';
        for (let i = 0; i < attack; i++) {
          if (!stateCopy[opponent].deck.cards.length) {
            break;
          }

          const removedCard = stateCopy[opponent].deck.removeTopCard();
          removedCard.location = 'discard';
          stateCopy[opponent].discard.addCardToTop(removedCard);

          logs.push('hitting opponent for 1');
          actions.push([
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
          actions.push([
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
    console.log('actions=', actions);
    logs.forEach(message => {
      console.log(message);
    });

    if (actions.length) {
      let i = 0;
      this.interval = setInterval(() => {
        actions[i].forEach(action => {
          this.setState({ [action.stateKey]: action.pile });
        });

        if (++i === actions.length) {
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
      stack
    } = this.state;

    return (
      <section css={clashCss}>
        {stack.map((card, index) => (
          <Card
            key={index}
            cardProps={card}
            renderProps={{ x: 310 + index * 10, y: 5 + index * 10 }}
          />
        ))}

        <div className='enemy_side'>
          <EnemyDeck cards={enemyDeck} />
          <EnemyDiscard cards={enemyDiscard} />
          <EnemyBanish cards={enemyBanish} />
        </div>

        {yourHand.map((card, index) => (card ? (
          <Card
            key={index}
            cardProps={card}
            renderProps={{ x: 175 + 135 * index, y: 280 }}
            onClick={() => this.playCard(card, index)}
          />
        ) : null))}

        <div className='your_side'>
          <YourDeck cards={yourDeck} />
          <YourDiscard cards={yourDiscard} />
          <YourBanish cards={yourBanish} />
        </div>
      </section>
    );
  }
}
