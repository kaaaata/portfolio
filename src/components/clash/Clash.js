import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../stores/actions';
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

const ClashComponent = (props) => {
  let interval = null;
  let actions = [];
  let isPlayersTurn = true;
  let isAnimating = false;

  const executeRenderAction = (action) => {
    action.forEach(subAction => {
      props[subAction.actionKey](subAction.payload);
    });
  };

  const handleClickCardInYourHand = (card, index) => {
    if (isAnimating || !isPlayersTurn) {
      return;
    }

    console.log('playing card', card);
    isAnimating = true;
    const t0 = performance.now();
    actions = genPlayCardActions(card, index);
    const t1 = performance.now();
    console.log(`genPlayCardActions took ${t1 - t0} milliseconds.`);
    console.log('actions=', actions);

    if (actions.length > 1) {
      // later, if we want to allow pausing mid-animation, actions should be
      // refactored to be a Stack, and it should pop every time an action is executed.

      // instantly execute the first action, which will always be "move to stack"
      executeRenderAction(actions[0]);
      let i = 1;
      interval = setInterval(() => {
        executeRenderAction(actions[i]);

        if (++i === actions.length) {
          isAnimating = false;
          clearInterval(interval);
        }
      }, 500);
    } else {
      isAnimating = false;
    }
  };

  return (
    <section css={clashCss}>
      <EnemyHand />
      <div className='enemy_side'>
        <EnemyDeck />
        <EnemyDiscard />
        <EnemyBanish />
      </div>

      <Stack />

      <YourHand onClick={(card, index) => handleClickCardInYourHand(card, index)} />
      <div className='your_side'>
        <YourDeck />
        <YourDiscard />
        <YourBanish />
      </div>
    </section>
  );
};

const mapDispatchToProps = dispatch => ({
  setYourDeck: payload => dispatch(actions.setYourDeck(payload)),
  setYourDiscard: payload => dispatch(actions.setYourDiscard(payload)),
  setYourBanish: payload => dispatch(actions.setYourBanish(payload)),
  setYourHand: payload => dispatch(actions.setYourHand(payload)),
  setEnemyDeck: payload => dispatch(actions.setEnemyDeck(payload)),
  setEnemyDiscard: payload => dispatch(actions.setEnemyDiscard(payload)),
  setEnemyBanish: payload => dispatch(actions.setEnemyBanish(payload)),
  setEnemyHand: payload => dispatch(actions.setEnemyHand(payload)),
  setStack: payload => dispatch(actions.setStack(payload))
});

export const Clash = connect(null, mapDispatchToProps)(ClashComponent);
