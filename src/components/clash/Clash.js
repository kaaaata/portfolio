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
import { Image, Filter } from '../particles';
import { YourPortrait, EnemyPortrait } from './Portrait';
import { playFirstCardInRound } from './gameplay/playFirstCardInRound';
import { colors } from '../styles';

const ClashComponent = (props) => {
  let interval = null;
  let actions = [];
  let isAnimating = false;

  const executeRenderAction = (action) => {
    if (action) {
      action.forEach(subAction => {
        if (subAction) {
          props[subAction.actionKey](subAction.payload);
        }
      });
    }
  };

  const handleClickCardInYourHand = (card, index) => {
    if (isAnimating) {
      return;
    }

    console.log(`playing ${card.name}`);
    isAnimating = true;
    const t0 = performance.now();
    actions = playFirstCardInRound(card, index);
    const t1 = performance.now();
    console.log(`playCard took ${t1 - t0} milliseconds.`);

    if (actions.length > 1) {
      // later, if we want to allow pausing mid-animation, actions should be
      // refactored to be a Stack, and it should pop every time an action is executed.

      // instantly execute the first action, which will always be "move to stack"
      executeRenderAction(actions[0]);
      let i = 1;
      interval = setInterval(() => {
        executeRenderAction(actions[i]);

        if (++i === actions.length) {
          clearInterval(interval);
          isAnimating = false;
        }
      }, 500);
    } else {
      isAnimating = false;
    }
  };

  return (
    <Image
      src='/clash/landscape.png'
      width={1000}
      height={600}
      _css={css`
        flex-shrink: 0;
        position: relative;
      `}
    >
      <Filter opacity={0.3} color={colors.white} />

      <EnemyPortrait />
      <EnemyHand onClick={(card, index) => handleClickCardInYourHand(card, index)} />
      <div css={css`perspective: 2000px;`}>
        <EnemyDeck />
        <EnemyDiscard />
        <EnemyBanish />
      </div>

      <Stack />

      <YourPortrait />
      <YourHand onClick={(card, index) => handleClickCardInYourHand(card, index)} />
      <div css={css`perspective: 2000px;`}>
        <YourDeck />
        <YourDiscard />
        <YourBanish />
      </div>
    </Image>
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
  setStack: payload => dispatch(actions.setStack(payload)),
  setYourShields: payload => dispatch(actions.setYourShields(payload)),
  setEnemyShields: payload => dispatch(actions.setEnemyShields(payload))
});

export const Clash = connect(null, mapDispatchToProps)(ClashComponent);
