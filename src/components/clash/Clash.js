import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
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
import { genPlayCardActions } from './gameplay/playCard';

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
      stack: []
    };

    this.interval = null; // only have one active interval, for simplicity/perf
    this.actions = [];
    this.isPlayersTurn = true;
    this.isAnimating = false;
  }

  executeRenderAction(action) {
    action.forEach(subAction => {
      this.setState({ [subAction.stateKey]: subAction.pile });
    });
  }

  handleClickCardInYourHand(card, index) {
    if (this.isAnimating || !this.isPlayersTurn) {
      return;
    }

    console.log('playing card', card);
    this.isAnimating = true;
    const t0 = performance.now();
    this.actions = genPlayCardActions(card, index, this.state);
    const t1 = performance.now();
    console.log(`genPlayCardActions took ${t1 - t0} milliseconds.`);
    console.log('actions=', this.actions);

    if (this.actions.length > 1) {
      // later, if we want to allow pausing mid-animation, this.actions should be
      // refactored to be a Stack, and it should pop every time an action is executed.

      // instantly execute the first action, which will always be "move to stack"
      this.executeRenderAction(this.actions[0]);
      let i = 1;
      this.interval = setInterval(() => {
        this.executeRenderAction(this.actions[i]);

        if (++i === this.actions.length) {
          this.isAnimating = false;
          clearInterval(this.interval);
        }
      }, 500);
    } else {
      this.isAnimating = false;
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
          onClick={(card, index) => this.handleClickCardInYourHand(card, index)}
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
