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
        ...Array(15).fill(cards['Strike']).map(card => ({ ...card, player: 'you' })),
        { ...cards['Healing Potion'], player: 'you' }
      ],
      yourDiscard: [
        ...Array(3).fill(cards['Strike']).map(card => ({ ...card, player: 'you' })),
      ],
      yourBanish: [],
      enemyDeck: [
        ...Array(13).fill(cards['Strike']),
        cards['Healing Potion'],
        ...Array(3).fill(cards['Strike'])
      ].map(card => ({ ...card, player: 'opponent' })),
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
      yourHand: yourDeck.slice(yourDeck.length - 3, yourDeck.length),
      yourDeck: yourDeck.slice(0, yourDeck.length - 3)
    });
  }

  playCard(card) {
    const {
      isAnimating,
      isPlayersTurn
    } = this.state;

    if (isAnimating || !isPlayersTurn) {
      return;
    }

    const playerStateKey = card.player === 'you' ? 'your' : 'enemy';
    const opponentStateKey = card.player === 'you' ? 'enemy' : 'your';
    const stateKeys = {
      player: {
        deck: `${playerStateKey}Deck`,
        discard: `${playerStateKey}Discard`,
        banish: `${playerStateKey}Banish`,
      },
      opponent: {
        deck: `${opponentStateKey}Deck`,
        discard: `${opponentStateKey}Discard`,
        banish: `${opponentStateKey}Banish`,
      }
    };
    const stateCopy = {
      player: {
        deck: new ArrayOfCards(this.state[stateKeys.player.deck]),
        discard: new ArrayOfCards(this.state[stateKeys.player.discard]),
        banish: new ArrayOfCards(this.state[stateKeys.player.banish])
      },
      opponent: {
        deck: new ArrayOfCards(this.state[stateKeys.opponent.deck]),
        discard: new ArrayOfCards(this.state[stateKeys.opponent.discard]),
        banish: new ArrayOfCards(this.state[stateKeys.opponent.banish])
      }
    };

    let activePlayer = card.player === 'you' ? 'player' : 'opponent';
    let activeOpponent = card.player === 'you' ? 'opponent' : 'player';

    const actions = [];
    const logs = [];

    console.log('playing card', card);
    this.setState({ isAnimating: true });

    const rotatePerspective = () => {
      const temp = activeOpponent;
      activeOpponent = activePlayer;
      activePlayer = temp;
    };

    const generateActionsForCard = (card) => {
      // attack
      const attack = card.attack;
      if (attack) {
        for (let i = 0; i < attack; i++) {
          if (!stateCopy[activeOpponent].deck.cards.length) {
            break;
          }

          const removedCard = stateCopy[activeOpponent].deck.removeTopCard();
          stateCopy[activeOpponent].discard.addCardToTop(removedCard);

          logs.push('hitting opponent for 1');
          actions.push([
            {
              pile: [...stateCopy[activeOpponent].deck.cards],
              stateKey: stateKeys[activeOpponent].deck
            },
            {
              pile: [...stateCopy[activeOpponent].discard.cards],
              stateKey: stateKeys[activeOpponent].discard
            }
          ]);

          if (removedCard.onDiscard) {
            const mockCard = createCard({
              ...removedCard.onDiscard,
              isMockCard: true
            });

            rotatePerspective();
            generateActionsForCard(mockCard);
            rotatePerspective();
          }
        }
      }

      // heal
      const { heal } = card;
      if (heal) {
        for (let i = 0; i < heal; i++) {
          if (!stateCopy[activePlayer].discard.cards.length) {
            break;
          }

          const healedCard = stateCopy[activePlayer].discard.removeTopCard();
          stateCopy[activePlayer].deck.addCardToTop(healedCard);

          logs.push('healing opponent for 1');
          actions.push([
            {
              pile: [...stateCopy[activePlayer].deck.cards],
              stateKey: stateKeys[activePlayer].deck
            },
            {
              pile: [...stateCopy[activePlayer].discard.cards],
              stateKey: stateKeys[activePlayer].discard
            }
          ]);
        }
      }
    };

    generateActionsForCard(card);
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
            renderProps={{ x: 310 + index * 5, y: 5 + index * 5 }}
          />
        ))}

        <div className='enemy_side'>
          <EnemyDeck cards={enemyDeck} />
          <EnemyDiscard cards={enemyDiscard} />
          <EnemyBanish cards={enemyBanish} />
        </div>

        {yourHand.map((card, index) => (
          <Card
            key={index}
            cardProps={card}
            renderProps={{ x: 175 + 135 * index, y: 280 }}
            onClick={() => this.playCard(card)}
          />
        ))}

        <div className='your_side'>
          <YourDeck cards={yourDeck} />
          <YourDiscard cards={yourDiscard} />
          <YourBanish cards={yourBanish} />
        </div>
      </section>
    );
  }
}
